import React, { useState, useEffect } from 'react';
import MaintenanceRecordsTable from '../../components/tables/MaintenanceRecordsTable';
import BackButton from '@/components/BackButton';

const MaintenanceRecordsList = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceRecords = async () => {
      try {
        const response = await fetch('/api/maintenance');
        if (response.ok) {
          const data = await response.json();
          setMaintenanceData(data);
        } else {
          console.error('Failed to fetch maintenance records');
        }
      } catch (error) {
        console.error('Error fetching maintenance records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRecords();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 relative">
        <BackButton />
      <h1 className="font-title font-bold text-2xl mb-4">Maintenance Records</h1>
      <MaintenanceRecordsTable data={maintenanceData} />
    </div>
  );
};

export default MaintenanceRecordsList;
