import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  equipmentId: z.string().nonempty('Equipment ID is required'),
  date: z.string().nonempty('Date is required'),
  type: z.enum(['Preventive', 'Repair', 'Emergency'], { required_error: 'Type is required' }),
  technician: z.string().min(2, 'Technician name must be at least 2 characters long'),
  hoursSpent: z
    .union([z.string().transform(Number), z.number()])
    .refine((val) => val > 0 && val <= 24, {
      message: 'Hours spent must be a positive number and cannot exceed 24',
    }),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  partsReplaced: z.string().optional(),
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
        formState: { errors, isSubmitted },
    } = useForm<MaintenanceRecordFormValues>({
        resolver: zodResolver(schema),
        mode: 'onBlur', 
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-lg shadow ">
            <label className="block font-bold mb-2">Equipment ID</label>
            <input
                {...register('equipmentId')}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter Equipment ID"
            />
            {errors.equipmentId && <p className="text-red-500 mb-4">{errors.equipmentId.message}</p>}

            <label className="block font-bold mb-2">Date</label>
            <Controller
                name="date"
                control={control}
                render={({ field }) => (
                    <input {...field} type="date" className="w-full p-2 border border-gray-300 rounded mb-4" />
                )}
            />
            {errors.date && <p className="text-red-500 mb-4">{errors.date.message}</p>}

            <label className="block font-bold mb-2">Type</label>
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded mb-4">
                        <option value="Preventive">Preventive</option>
                        <option value="Repair">Repair</option>
                        <option value="Emergency">Emergency</option>
                    </select>
                )}
            />
            {errors.type && <p className="text-red-500 mb-4">{errors.type.message}</p>}

            <label className="block font-bold mb-2">Technician</label>
            <input
                {...register('technician')}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter Technician Name"
            />
            {errors.technician && <p className="text-red-500 mb-4">{errors.technician.message}</p>}

            <label className="block font-bold mb-2">Hours Spent</label>
            <input
                {...register('hoursSpent')}
                type="number"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter Hours Spent"
            />
            {errors.hoursSpent && <p className="text-red-500 mb-4">{errors.hoursSpent.message}</p>}

            <label className="block font-bold mb-2">Description</label>
            <textarea
                {...register('description')}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Enter Description"
            />
            {errors.description && <p className="text-red-500 mb-4">{errors.description.message}</p>}

            <label className="block font-bold mb-2">Priority</label>
            <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded mb-5">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                )}
            />
            {errors.priority && <p className="text-red-500 mb-4">{errors.priority.message}</p>}

            <label className="block font-bold mb-2">Completion Status</label>
            <Controller
                name="completionStatus"
                control={control}
                render={({ field }) => (
                    <select {...field} className="w-full p-2 border border-gray-300 rounded mb-5">
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Pending Parts">Pending Parts</option>
                    </select>
                )}
            />
            {errors.completionStatus && <p className="text-red-500 mb-4">{errors.completionStatus.message}</p>}

            <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Submit
            </button>
        </form>
    );
};

export default MaintenanceRecordForm;
