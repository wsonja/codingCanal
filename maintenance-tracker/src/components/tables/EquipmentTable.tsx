import { Equipment } from '@/types/equipment';
import React, { useState } from 'react';

const EquipmentTable = ({ data, onUpdateStatus }: { data: any[]; onUpdateStatus: (id: string, newStatus: Equipment['status']) => Promise<void> }) => {
  const [statusFilter, setStatusFilter] = useState('All');

  // Filtering data based on the selected status
  const filteredData = statusFilter === 'All' 
    ? data 
    : data.filter(equipment => equipment.status === statusFilter);

  const handleStatusChange = (id: string, newStatus: Equipment['status']) => {
    onUpdateStatus(id, newStatus); 
  };

  return (
    <div className="overflow-x-auto">
      {/* Status Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-semibold">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="All">All</option>
          <option value="Operational">Operational</option>
          <option value="Out of Service">Out of Service</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      {/* Equipment Table */}
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
          {filteredData.map((equipment) => (
            <tr key={equipment.id}>
              <td className="px-4 py-2 border-b">{equipment.id}</td>
              <td className="px-4 py-2 border-b">{equipment.name}</td>
              <td className="px-4 py-2 border-b">{equipment.location}</td>
              <td className="px-4 py-2 border-b">{equipment.department}</td>
              <td className="px-4 py-2 border-b">
                {/* Editable Dropdown for Status */}
                <select
                  value={equipment.status}
                  onChange={(e) => handleStatusChange(equipment.id, e.target.value as Equipment['status'])}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Operational">Operational</option>
                  <option value="Out of Service">Out of Service</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
