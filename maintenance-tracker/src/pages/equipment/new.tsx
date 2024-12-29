import React, { useState } from 'react';
import EquipmentForm from '../../components/forms/EquipmentForm'; 
import { Equipment } from '../../types/equipment';
import { v4 as uuidv4 } from 'uuid';
import BackButton from '@/components/BackButton';

const EquipmentManagementPage = () => {
  const handleFormSubmit = async (data: any) => {
    const response = await fetch('/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Equipment added successfully!');
      } else {
        alert('Failed to add equipment.');
      }
  
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="relative max-w-5xl w-full bg-white rounded-lg shadow-md p-8">
            <BackButton />
            <h1 className="font-title font-bold text-3xl text-secondary mb-6">Equipment Management</h1>
            <EquipmentForm onSubmit={handleFormSubmit} />
        </div>
    </div>
  );
};

export default EquipmentManagementPage;
