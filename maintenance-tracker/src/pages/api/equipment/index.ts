import { prisma } from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all equipment
    try {
      const equipment = await prisma.equipment.findMany({
        include: { maintenanceRecords: true },
      });
      res.status(200).json(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      res.status(500).json({ error: 'Failed to fetch equipment' });
    }
  } 
  
  else if (req.method === 'POST') {
    // Create new equipment
    try {
      const data = req.body; 
      const newEquipment = await prisma.equipment.create({
        data,
      });
      res.status(201).json(newEquipment);
    } catch (error) {
      console.error('Error creating equipment:', error);
      res.status(500).json({ error: 'Failed to create equipment' });
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
