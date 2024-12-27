import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for form validation
const schema = z.object({
  equipmentId: z.string().nonempty('Equipment ID is required'),
  date: z.string().nonempty('Date is required'), // Will be transformed into a Date object
  type: z.enum(['Preventive', 'Repair', 'Emergency'], { required_error: 'Type is required' }),
  technician: z.string().min(2, 'Technician name must be at least 2 characters long'),
  hoursSpent: z
    .number()
    .positive('Hours spent must be a positive number')
    .max(24, 'Hours spent cannot exceed 24'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(['Low', 'Medium', 'High'], { required_error: 'Priority is required' }),
  completionStatus: z.enum(['Complete', 'Incomplete', 'Pending Parts'], {
    required_error: 'Completion status is required',
  }),
});

type MaintenanceRecordFormValues = z.infer<typeof schema>;

const MaintenanceRecordForm = ({ onSubmit }: { onSubmit: (data: MaintenanceRecordFormValues) => void }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MaintenanceRecordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      equipmentId: '',
      date: '',
      type: 'Preventive',
      technician: '',
      hoursSpent: undefined,
      description: '',
      partsReplaced: [],
      priority: 'Low',
      completionStatus: 'Complete',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-bold">Equipment ID</label>
        <input
          {...register('equipmentId')}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Equipment ID"
        />
        {errors.equipmentId && <p className="text-red-500">{errors.equipmentId.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Date</label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Type</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border border-gray-300 rounded">
              <option value="Preventive">Preventive</option>
              <option value="Repair">Repair</option>
              <option value="Emergency">Emergency</option>
            </select>
          )}
        />
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Technician</label>
        <input
          {...register('technician')}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Technician Name"
        />
        {errors.technician && <p className="text-red-500">{errors.technician.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Hours Spent</label>
        <input
          {...register('hoursSpent', { valueAsNumber: true })}
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Hours Spent"
        />
        {errors.hoursSpent && <p className="text-red-500">{errors.hoursSpent.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Description</label>
        <textarea
          {...register('description')}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Description"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Parts Replaced</label>
        <input
          {...register('partsReplaced')}
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Parts (comma-separated)"
        />
      </div>
      <div>
        <label className="block font-bold">Priority</label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border border-gray-300 rounded">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          )}
        />
        {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
      </div>
      <div>
        <label className="block font-bold">Completion Status</label>
        <Controller
          name="completionStatus"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border border-gray-300 rounded">
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Pending Parts">Pending Parts</option>
            </select>
          )}
        />
        {errors.completionStatus && <p className="text-red-500">{errors.completionStatus.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default MaintenanceRecordForm;
