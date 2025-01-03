import React, { useState, useEffect } from 'react';
import { Equipment } from '../../types/equipment';
import EquipmentTable from '@/components/tables/EquipmentTable';
import BackButton from '@/components/BackButton';

const updateEquipmentStatus = async (id: string, newStatus: Equipment['status']) => {
  const response = await fetch(`/api/equipment/${id}`, {  
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
  });
  
  if (!response.ok) {
      throw new Error('Failed to update equipment status');
  }
  
};

const EquipmentList = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch('/api/equipment');
        if (response.ok) {
          const data: Equipment[] = await response.json();
          setEquipmentList(data);
        } else {
          console.error('Failed to fetch equipment list');
        }
      } catch (error) {
        console.error('Error fetching equipment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Equipment['status']) => {
    await updateEquipmentStatus(id, newStatus);
    alert(`Status successfully updated to: ${newStatus}`);

    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (equipmentList.length === 0) {
    return <p>No equipment found.</p>;
  }

  return (
    <div className="p-6 relative">
      <BackButton />
      <h1 className="font-title font-bold text-2xl mb-4">Equipment List</h1>
      <EquipmentTable data={equipmentList} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default EquipmentList;
