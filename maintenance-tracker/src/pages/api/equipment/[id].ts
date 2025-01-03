import { prisma } from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { status } = req.body;
            
            if (!id || typeof status !== 'string') {
                return res.status(400).json({ error: 'Invalid request data' });
            }

            const updatedEquipment = await prisma.equipment.update({
                where: { id: String(id) },  
                data: { status },
            });
            res.status(200).json(updatedEquipment);
        } catch (error) {
            console.error('Error updating equipment status:', error);
            res.status(500).json({ error: 'Failed to update equipment status' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
