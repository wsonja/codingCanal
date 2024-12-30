import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

const StatusChart = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch('/api/equipment');
        const equipmentList: { status: string }[] = await response.json();

        const statusCounts = equipmentList.reduce<Record<string, number>>((acc, equipment) => {
          acc[equipment.status] = (acc[equipment.status] || 0) + 1;
          return acc;
        }, {});

        const chartData: ChartData[] = Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value,
        }));

        if (chartData.length === 1) {
          chartData.push({ name: 'Other', value: 0 });
        }

        setData(chartData);
      } catch (error) {
        console.error('Error fetching equipment status data:', error);
      }
    };

    fetchStatusData();
  }, []);

  // Custom label function
  const renderCustomLabel = (entry: any) => {
    const RADIAN = Math.PI / 180;
    const radius = 100 + 30; // Adjust based on outerRadius
    const x = Math.cos(-entry.midAngle * RADIAN) * radius + 120; // Center position is half of width (250/2)
    const y = Math.sin(-entry.midAngle * RADIAN) * radius + 150;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > 50 ? 'start' : 'end'} // Adjust alignment based on center
        dominantBaseline="central"
        style={{ fontSize: 14 }} // Smaller font size for smaller chart
      >
        {`${entry.name}`}
      </text>
    );
  };

  return (
    <div className="bg-light rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Equipment Status</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100} // Reduced outerRadius to fit smaller size
          fill="#004aad"
          label={renderCustomLabel}
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default StatusChart;
