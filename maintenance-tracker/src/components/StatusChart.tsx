import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

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

        // if (chartData.length === 1) {
        //   chartData.push({ name: 'Other', value: 0 });
        // }

        setData(chartData);
      } catch (error) {
        console.error('Error fetching equipment status data:', error);
      }
    };

    fetchStatusData();
  }, []);

  const COLORS = ['#004aad', '#336ebd', '#6692ce', '#99b7de'];

  const renderCustomLabel = (entry: any) => {
    const RADIAN = Math.PI / 180;
    const radius = entry.outerRadius + 45;
    const x = Math.cos(-entry.midAngle * RADIAN) * radius + 185;
    const y = Math.sin(-entry.midAngle * RADIAN) * radius + 140;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 12 }}
      >
        {entry.name}
      </text>
    );
  };

  return (
    <div className="bg-light rounded-lg shadow p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-left">Equipment Status</h2>
      <div className="flex justify-center">
        <PieChart width={400} height={280}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={renderCustomLabel}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default StatusChart;
