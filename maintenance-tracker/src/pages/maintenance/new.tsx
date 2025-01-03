import React from 'react';
import MaintenanceRecordForm from '../../components/forms/MaintenanceRecordForm';
import BackButton from '@/components/BackButton';

const NewMaintenanceRecord = () => {
  const handleFormSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(),  
        hoursSpent: Number(data.hoursSpent),
        partsReplaced: Array.isArray(data.partsReplaced) 
            ? data.partsReplaced 
            : data.partsReplaced ? data.partsReplaced.split(',').map((part: string) => part.trim()) : []
    };

    const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
    });

      if (response.ok) {
        const newRecord = await response.json();
        console.log('New Maintenance Record Added:', newRecord);
        alert('Maintenance record added successfully!');
      } else {
        const error = await response.json();
        console.error('Error adding maintenance record:', error);
        alert('Failed to add maintenance record.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="relative max-w-5xl w-full bg-white rounded-lg shadow-md p-8">
        <BackButton />
            <h1 className="font-title font-bold text-3xl text-secondary mb-6">Add Maintenance Record</h1>
            <MaintenanceRecordForm onSubmit={handleFormSubmit} />
        </div>
    </div>
  )
};

export default NewMaintenanceRecord;
