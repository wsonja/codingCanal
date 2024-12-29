import { prisma } from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { type } = req.query;
    
        try {
          if (type === 'grouped') {
            // Aggregate maintenance hours by department
            const groupedData = await prisma.$queryRaw`
              SELECT Equipment.department, SUM(MaintenanceRecord.hoursSpent) AS hours
              FROM MaintenanceRecord
              JOIN Equipment ON MaintenanceRecord.equipmentId = Equipment.id
              GROUP BY Equipment.department
            `;
            res.status(200).json(groupedData);
          } else {
            // Return all maintenance records
            const maintenanceRecords = await prisma.maintenanceRecord.findMany({
              include: {
                equipment: true,
              },
            });
            res.status(200).json(maintenanceRecords);
          }
        } catch (error) {
          console.error('Error fetching maintenance records:', error);
          res.status(500).json({ error: 'Failed to fetch maintenance records' });
        }
    } else if (req.method === 'POST') {
    try {
      const {
        equipmentId,
        date,
        type,
        technician,
        hoursSpent,
        description,
        partsReplaced,
        priority,
        completionStatus,
      } = req.body;

      // Create a new maintenance record
      const newRecord = await prisma.maintenanceRecord.create({
        data: {
          equipmentId,
          date: new Date(date), // Ensure the date is properly formatted
          type,
          technician,
          hoursSpent,
          description,
          priority,
          completionStatus,
          partsReplaced: {
            create: partsReplaced.map((part: string) => ({ name: part })), // Create related parts
          },
        },
      });

      res.status(201).json(newRecord);
    } catch (error) {
      console.error('Error creating maintenance record:', error);
      res.status(500).json({ error: 'Failed to create maintenance record' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
