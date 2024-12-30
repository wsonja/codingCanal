import { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const StatusChart = dynamic(() => import('../components/StatusChart'), { ssr: false });
const HoursChart = dynamic(() => import('../components/HoursChart'), { ssr: false });
const Recent = dynamic(() => import('../components/Recent'), { ssr: false });

const Dashboard = () => {
  const [totalEquipment, setTotalEquipment] = useState(0);
  const [maintenanceHours, setMaintenanceHours] = useState(0);
  const [operationalRate, setOperationalRate] = useState('0%');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch equipment data from the API
        const equipmentResponse = await fetch('/api/equipment');
        const equipmentData = await equipmentResponse.json();

        // Fetch maintenance records from the API
        const maintenanceResponse = await fetch('/api/maintenance');
        const maintenanceData = await maintenanceResponse.json();

        // Calculate total equipment
        setTotalEquipment(equipmentData.length);

        // Calculate total maintenance hours
        const totalHours = maintenanceData.reduce(
          (sum: any, record: { hoursSpent: any }) => sum + record.hoursSpent,
          0
        );
        setMaintenanceHours(totalHours);

        // Calculate operational rate
        const operationalCount = equipmentData.filter(
          (equipment: { status: string }) => equipment.status === 'Operational'
        ).length;
        const operationalRate = ((operationalCount / equipmentData.length) * 100).toFixed(2);
        setOperationalRate(`${operationalRate}%`);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Header with Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-title font-bold text-3xl text-secondary">Dashboard</h1>
          <div className="flex space-x-4">
            <Link href="/equipment/new" passHref>
              <button className="bg-primary text-secondary px-4 py-2 rounded border-secondary border-2 hover:bg-secondary hover:text-primary">
                + Equipment
              </button>
            </Link>
            <Link href="/maintenance/new" passHref>
              <button className="bg-primary text-secondary px-4 py-2 rounded border-secondary border-2 hover:bg-secondary hover:text-primary">
                + Maintenance Record
              </button>
            </Link>
            <Link href="/equipment" passHref>
              <button className="bg-primary text-secondary px-4 py-2 rounded border-secondary border-2 hover:bg-secondary hover:text-primary">
                View Equipment
              </button>
            </Link>
            <Link href="/maintenance" passHref>
              <button className="bg-primary text-secondary px-4 py-2 rounded border-secondary border-2 hover:bg-secondary hover:text-primary">
                View Maintenance Records
              </button>
            </Link>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <DashboardCard title="Total Equipment" value={totalEquipment} />
          <DashboardCard title="Maintenance Hours" value={maintenanceHours} />
          <DashboardCard title="Operational Rate" value={operationalRate} />
        </div>

        {/* Charts and Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusChart />
          <HoursChart />
          <Recent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
