import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import styles from "./CategoryPieChart.module.css";
import { useTransactionContext } from '../../../context/TransactionContext';

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
  '#4BC0C0',
  "#F6BD16",
  "#7262FD",
  "#78D3F8",
  "#F6903D",
  "#817BFF",
];


const CategoryPieChart = () => {
  const { transactions } = useTransactionContext();

  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  // array format for recharts
  const chartData = Object.entries(categoryData)
    .map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2))
    }))
    .sort((a, b) => b.value - a.value);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (chartData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>Expenses by Category</h2>
        <div className={styles.noData}>
          <p>No expense data available</p>
          <p className={styles.noDataSubtext}>Start adding expenses to see the breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Expenses by Category</h2>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              innerRadius={70}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => `${value}: $${entry.payload.value.toFixed(2)}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;