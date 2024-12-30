import { useEffect, useState } from 'react';
import { format } from 'date-fns';

// MaintenanceActivity interface
interface MaintenanceActivity {
  id: string;
  equipmentId: string;
  date: string;
  type: 'Preventive' | 'Repair' | 'Emergency';
  technician: string;
  hoursSpent: number;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completionStatus: 'Complete' | 'Incomplete' | 'Pending Parts';
  equipment: {
    id: string;
    name: string;
    location: string;
    department: string;
    model: string;
    serialNumber: string;
    installDate: string;
    status: 'Operational' | 'Down' | 'Maintenance' | 'Retired';
  };
}

const Recent = () => {
  const [activities, setActivities] = useState<MaintenanceActivity[]>([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await fetch('/api/maintenance'); 
        const data: MaintenanceActivity[] = await response.json();
        // Sort by date (descending) and take the most recent 5 activities
        const sortedActivities = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setActivities(sortedActivities.slice(0, 5));
      } catch (error) {
        console.error('Error fetching maintenance records:', error);
      }
    };

    fetchRecentActivities();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Recent Maintenance Activities</h2>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="py-2">
            <p className="font-medium">{activity.equipment.name}</p>
            <p className="text-sm text-gray-600">
              {format(new Date(activity.date), 'MMM d, yyyy')}
            </p>
            <p className="text-sm">{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recent;
