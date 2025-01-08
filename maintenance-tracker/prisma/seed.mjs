import { prisma } from '../src/lib/prisma.js';

async function seed() {
  console.log('Seeding database...');

  // Seed Equipment First
  await prisma.equipment.createMany({
    data: [
      {
        id: '1',
        name: 'Lathe Machine',
        location: 'Workshop A',
        department: 'Engineering',
        model: 'LMX-200',
        serialNumber: 'LM123456',
        installDate: new Date('2022-05-10'),
        status: 'Operational',
      },
      {
        id: '2',
        name: 'CNC Machine',
        location: 'Workshop B',
        department: 'Manufacturing',
        model: 'CNC-5000',
        serialNumber: 'CNC7890',
        installDate: new Date('2021-03-15'),
        status: 'Operational',
      },
    ],
  });

  console.log('Equipment added.');

  // Now Seed Maintenance Records
  await prisma.maintenanceRecord.createMany({
    data: [
      {
        equipmentId: '1', // Matches the existing equipment ID
        date: new Date('2023-01-15'),
        type: 'Preventive',
        technician: 'John Doe',
        hoursSpent: 2,
        description: 'Routine check-up for Lathe Machine',
        priority: 'Low',
        completionStatus: 'Complete',
      },
      {
        equipmentId: '2', // Matches the existing equipment ID
        date: new Date('2023-02-20'),
        type: 'Repair',
        technician: 'Jane Smith',
        hoursSpent: 4,
        description: 'Replaced CNC motor belt',
        priority: 'High',
        completionStatus: 'Incomplete',
      },
    ],
  });

  console.log('Maintenance records added.');

  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
