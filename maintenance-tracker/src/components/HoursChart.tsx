import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HoursChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGroupedData = async () => {
        try {
            const response = await fetch('/api/maintenance?type=grouped');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error fetching grouped data:', error);
          }
    };
    fetchGroupedData();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Maintenance Hours by Department</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoursChart;