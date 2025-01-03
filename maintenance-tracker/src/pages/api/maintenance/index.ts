import { prisma } from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { type, dateRange, equipmentType } = req.query;
    let startDate: Date | undefined;

    if (dateRange && dateRange !== 'all') {
        if (dateRange === '24hours') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
        } else if (dateRange === 'week') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (dateRange === 'month') {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
        } else if (dateRange === '3months') {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 3);
        } else if (dateRange === '6months') {
            startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6);
        } else if (dateRange === 'year') {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);
        }
    }

    try {
        if (type === 'groupedByType') {
            const groupedByTypeData = await prisma.$queryRaw`
                SELECT Equipment.type, SUM(MaintenanceRecord.hoursSpent) AS hours
                FROM MaintenanceRecord
                JOIN Equipment ON MaintenanceRecord.equipmentId = Equipment.id
                GROUP BY Equipment.type
            `;
            res.status(200).json(groupedByTypeData);
        } 

        else if (type === 'grouped') {
          const groupedData = await prisma.$queryRaw`
              SELECT Equipment.department, SUM(MaintenanceRecord.hoursSpent) AS hours
              FROM MaintenanceRecord
              JOIN Equipment ON MaintenanceRecord.equipmentId = Equipment.id
              GROUP BY Equipment.department
          `;

          res.status(200).json(groupedData);
        }
        
        else {
            const maintenanceRecords = await prisma.maintenanceRecord.findMany({
                where: {
                    date: startDate ? { gte: startDate } : undefined,
                    equipment: equipmentType && equipmentType !== 'all'
                        ? { department: equipmentType.toString() }
                        : undefined,
                },
                include: {
                    equipment: {
                        select: { name: true, department: true },
                    }
                }
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

      const formattedDate = new Date(date);
      const partsArray = Array.isArray(partsReplaced)
                ? partsReplaced.map((part: string) => ({ name: part.trim() }))
                : partsReplaced
                ? partsReplaced.split(',').map((part: string) => ({ name: part.trim() }))
                : [];

      const newRecord = await prisma.maintenanceRecord.create({
        data: {
          equipmentId: equipmentId,  
          date: formattedDate,
          type,
          technician,
          hoursSpent: Number(hoursSpent),
          description,
          priority,
          completionStatus,
          partsReplaced: {
            create: partsArray.length > 0 ? partsArray : [], 
          },
        },
      });

      res.status(201).json(newRecord);
    } catch (error) {
      console.error('Error creating maintenance record:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create record' });

    }
  }  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
