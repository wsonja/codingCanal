import React, { useState, useEffect } from 'react';
import { Equipment } from '../../types/equipment'; // Import the Equipment type
import EquipmentTable from '@/components/tables/EquipmentTable';
import BackButton from '@/components/BackButton';

const EquipmentList = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]); // Type the state
  const [loading, setLoading] = useState(true); // Loading state for API call

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch('/api/equipment'); // Call your API
        if (response.ok) {
          const data: Equipment[] = await response.json(); // Parse and type the response
          setEquipmentList(data); // Set the equipment list
        } else {
          console.error('Failed to fetch equipment list');
        }
      } catch (error) {
        console.error('Error fetching equipment:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEquipment(); // Call the function on component mount
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (equipmentList.length === 0) {
    return <p>No equipment found.</p>; // Handle empty data
  }

  return (
    <div className="p-6 relative">
      <BackButton />
      <h1 className="font-title font-bold text-2xl mb-4">Equipment List</h1>
      <EquipmentTable data={equipmentList} />
    </div>
    
  );
};

export default EquipmentList;
