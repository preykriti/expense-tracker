import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import styles from "./CategoryPieChart.module.css";
import { useTransactionContext } from "../../../context/TransactionContext";
import { useMemo, useState } from "react";

// const COLORS = [
//   '#FF6384',
//   '#36A2EB',
//   '#FFCE56',
//   '#4BC0C0',
//   '#9966FF',
//   '#FF9F40',
//   '#FF6384',
//   '#C9CBCF'
// ];

const COLORS = [
  "#5B8FF9",
  "#FF6384",
  "#4BC0C0",
  "#F6BD16",
  "#7262FD",
  "#78D3F8",
  "#F6903D",
  "#817BFF",
];

type TimeFilter = "month" | "year" | "all";

const CategoryPieChart = () => {
  const { transactions } = useTransactionContext();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>("month");

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const currentYear = new Date().getFullYear();
    return transactions
      .filter((t) => t.type === "expense")
      .filter((t) => {
        const date = new Date(t.date);
        switch (timeFilter) {
          case "month":
            return (
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            );

          case "year":
            return date.getFullYear() === currentYear;

          case "all":
            return true;

          default:
            return true;
        }
      });
  }, [transactions, timeFilter]);

  const chartData = useMemo(() => {
    const categoryData = filteredTransactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryData)
      .map(([name, value]) => ({
        name,
        value: Number(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const content =
    chartData.length === 0 ? (
      <div className={styles.noData}>
        <p>No expense data available</p>
        <p className={styles.noDataSubtext}>
          Start adding expenses to see the breakdown
        </p>
      </div>
    ) : (
      <div className={styles.pieChartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius="70%"
              innerRadius="45%"
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => `Rs ${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );

  return (
    <div className={styles.chartContainer}>
      <div className={styles.titleRow}>
        <p className={styles.chartTitle}>Expenses Overview</p>

        <select
          className={styles.filterSelect}
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
        >
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {content}
    </div>
  );
};

export default CategoryPieChart;
