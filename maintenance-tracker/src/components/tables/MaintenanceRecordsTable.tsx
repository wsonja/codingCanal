import React from 'react';

const MaintenanceRecordsTable = ({ data }: { data: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">Date</th>
            <th className="text-left px-4 py-2 border-b">Equipment Name</th>
            <th className="text-left px-4 py-2 border-b">Type</th>
            <th className="text-left px-4 py-2 border-b">Technician</th>
            <th className="text-left px-4 py-2 border-b">Hours Spent</th>
            <th className="text-left px-4 py-2 border-b">Description</th>
            <th className="text-left px-4 py-2 border-b">Priority</th>
            <th className="text-left px-4 py-2 border-b">Completion Status</th>
            <th className="text-left px-4 py-2 border-b">Parts Replaced</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-2 border-b">{new Date(record.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 border-b">{record.equipment?.name || 'N/A'}</td> 
              <td className="px-4 py-2 border-b">{record.type}</td>
              <td className="px-4 py-2 border-b">{record.technician}</td>
              <td className="px-4 py-2 border-b">{record.hoursSpent ?? 'N/A'}</td> 
              <td className="px-4 py-2 border-b">{record.description}</td>
              <td className="px-4 py-2 border-b">{record.priority}</td>
              <td className="px-4 py-2 border-b">{record.completionStatus}</td>
              <td className="px-4 py-2 border-b">
                {Array.isArray(record.partsReplaced) && record.partsReplaced.length > 0
                  ? record.partsReplaced.map((part: any) => part.name).join(', ')
                  : 'None'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceRecordsTable;
