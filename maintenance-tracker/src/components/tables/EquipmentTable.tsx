import React from 'react';

const EquipmentTable = ({ data }: { data: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">ID</th>
            <th className="text-left px-4 py-2 border-b">Name</th>
            <th className="text-left px-4 py-2 border-b">Location</th>
            <th className="text-left px-4 py-2 border-b">Department</th>
            <th className="text-left px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((equipment) => (
            <tr key={equipment.id}>
              <td className="px-4 py-2 border-b">{equipment.id}</td>
              <td className="px-4 py-2 border-b">{equipment.name}</td>
              <td className="px-4 py-2 border-b">{equipment.location}</td>
              <td className="px-4 py-2 border-b">{equipment.department}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-2 py-1 rounded ${
                    equipment.status === 'Operational' ? 'bg-green-200' : 'bg-red-200'
                  }`}
                >
                  {equipment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
