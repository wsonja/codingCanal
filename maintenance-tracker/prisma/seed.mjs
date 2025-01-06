import { prisma } from '../src/lib/prisma.js';

async function seed() {
  console.log('Seeding database...');

  // Create Maintenance Records
  await prisma.maintenanceRecord.createMany({
    data: [
      {
        id: '1',
        equipmentId: '1', // Ensure this matches an existing equipment ID
        date: new Date('2023-01-15'),
        type: 'Preventive',
        technician: 'John Doe',
        hoursSpent: 2,
        description: 'Routine check-up for Lathe Machine',
        priority: 'Low',
        completionStatus: 'Complete',
      },
      {
        id: '2',
        equipmentId: '2', // Ensure this matches an existing equipment ID
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

  // Create Parts for Maintenance Records
  await prisma.part.createMany({
    data: [
      {
        id: '1',
        name: 'Motor Belt',
        maintenanceRecordId: '2', // Ensure this matches an existing maintenanceRecord ID
      },
      {
        id: '2',
        name: 'Air Filter',
        maintenanceRecordId: '1', // Ensure this matches an existing maintenanceRecord ID
      },
    ],
  });

  console.log('Parts added.');
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
