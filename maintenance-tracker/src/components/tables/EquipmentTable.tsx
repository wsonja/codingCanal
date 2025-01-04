import { Equipment } from '@/types/equipment';
import React, { useState } from 'react';

const EquipmentTable = ({ data, onUpdateStatus }: { data: Equipment[]; onUpdateStatus: (id: string, newStatus: Equipment['status']) => Promise<void> }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [localStatuses, setLocalStatuses] = useState<Record<string, Equipment['status']>>(
    data.reduce((acc, equipment) => ({ ...acc, [equipment.id]: equipment.status }), {})
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<Equipment['status']>('Operational');

  const filteredData = statusFilter === 'All' 
    ? data 
    : data.filter(equipment => equipment.status === statusFilter);

  const handleStatusChange = async (id: string, newStatus: Equipment['status']) => {
    setLocalStatuses((prev) => ({ ...prev, [id]: newStatus }));
    await onUpdateStatus(id, newStatus);
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = async () => {
    const updates = selectedRows.map(id => onUpdateStatus(id, bulkStatus));
    await Promise.all(updates);
    setSelectedRows([]);
    setLocalStatuses((prev) =>
      selectedRows.reduce((acc, id) => ({ ...acc, [id]: bulkStatus }), prev)
    );
  };

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'Operational': return 'bg-green-100 border-green-400 text-green-700';
      case 'Down': return 'bg-red-100 border-red-400 text-red-700';
      case 'Maintenance': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'Retired': return 'bg-gray-200 border-gray-400 text-gray-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Status Filter and Bulk Update Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="statusFilter" className="mr-2 font-semibold">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="All">All</option>
            <option value="Operational">Operational</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        {/* Bulk Update Dropdown and Button */}
        <div className="flex space-x-2">
          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value as Equipment['status'])}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="Operational">Operational</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
          <button
            onClick={handleBulkStatusChange}
            className="px-4 py-2 bg-secondary text-white rounded"
            disabled={selectedRows.length === 0}
          >
            Apply Bulk Update
          </button>
        </div>
      </div>

      {/* Equipment Table with Row Selection */}
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b w-12">Select</th>
            <th className="text-left px-4 py-2 border-b">ID</th>
            <th className="text-left px-4 py-2 border-b">Name</th>
            <th className="text-left px-4 py-2 border-b">Location</th>
            <th className="text-left px-4 py-2 border-b">Department</th>
            <th className="text-left px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((equipment) => (
            <tr key={equipment.id} className={getStatusColor(localStatuses[equipment.id])}>
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(equipment.id)}
                  onChange={() => handleRowSelect(equipment.id)}
                />
              </td>
              <td className="px-4 py-2 border-b">{equipment.id}</td>
              <td className="px-4 py-2 border-b">{equipment.name}</td>
              <td className="px-4 py-2 border-b">{equipment.location}</td>
              <td className="px-4 py-2 border-b">{equipment.department}</td>
              <td className="px-4 py-2 border-b">
                <select
                  value={localStatuses[equipment.id]}
                  onChange={(e) => handleStatusChange(equipment.id, e.target.value as Equipment['status'])}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Operational">Operational</option>
                  <option value="Down">Down</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Retired">Retired</option>
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
