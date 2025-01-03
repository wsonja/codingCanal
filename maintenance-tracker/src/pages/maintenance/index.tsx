import React, { useState, useEffect } from 'react';
import MaintenanceRecordsTable from '../../components/tables/MaintenanceRecordsTable';
import BackButton from '@/components/BackButton';

const MaintenanceRecordsList = () => {
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState('all'); 
    const [selectedEquipmentType, setSelectedEquipmentType] = useState('all'); 

    const fetchMaintenanceRecords = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (selectedRange !== 'all') queryParams.append('dateRange', selectedRange);
            if (selectedEquipmentType !== 'all') queryParams.append('equipmentType', selectedEquipmentType);

            const response = await fetch(`/api/maintenance?${queryParams.toString()}`);
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

    useEffect(() => {
        fetchMaintenanceRecords();
    }, [selectedRange, selectedEquipmentType]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6 relative">
            <BackButton />
            <h1 className="font-title font-bold text-2xl mb-4">Maintenance Records</h1>

            <div className="flex space-x-4 mb-6">
                <div>
                    <label className="block font-semibold mb-2">Filter by Equipment Type</label>
                    <select
                        value={selectedEquipmentType}
                        onChange={(e) => setSelectedEquipmentType(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="all">All Types</option>
                        <option value="Machining">Machining</option>
                        <option value="Assembly">Assembly</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Shipping">Shipping</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Filter by Date Range</label>
                    <select
                        value={selectedRange}
                        onChange={(e) => setSelectedRange(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="all">All Records</option>
                        <option value="24hours">Last 24 Hours</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>
            </div>

            <MaintenanceRecordsTable data={maintenanceData} />
        </div>
    );
};

export default MaintenanceRecordsList;
