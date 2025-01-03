import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const equipmentSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  location: z.string().nonempty('Location is required'),
  department: z.enum(['Machining', 'Assembly', 'Packaging', 'Shipping']),
  model: z.string().nonempty('Model is required'),
  serialNumber: z.string().regex(/^[a-zA-Z0-9]+$/, 'Must be alphanumeric'),
  installDate: z.date().refine((date) => date < new Date(), 'Must be a past date'),
  status: z.enum(['Operational', 'Down', 'Maintenance', 'Retired']),
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

const EquipmentForm = ({ onSubmit }: { onSubmit: (data: EquipmentFormValues) => void }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      location: '',
      department: 'Machining',
      model: '',
      serialNumber: '',
      installDate: new Date(),
      status: 'Operational',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="block  font-bold mb-2 ">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
        />
        {errors.name && <p className="text-red-500 mb-4 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block  font-bold mb-2 ">Location</label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
        />
        {errors.location && <p className="text-red-500 mb-4 text-sm">{errors.location.message}</p>}
      </div>
      <div>
        <label className="block  font-bold mb-2 ">Department</label>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border border-gray-300 rounded">
              <option value="Machining">Machining</option>
              <option value="Assembly">Assembly</option>
              <option value="Packaging">Packaging</option>
              <option value="Shipping">Shipping</option>
            </select>
          )}
        />
      </div>
      <div>
        <label className="block  font-bold mb-2 ">Model</label>
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
        />
        {errors.model && <p className="text-red-500 mb-4 text-sm">{errors.model.message}</p>}
      </div>
      <div>
        <label className="block  font-bold mb-2 ">Serial Number</label>
        <Controller
          name="serialNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
        />
        {errors.serialNumber && <p className="text-red-500 mb-4 text-sm">{errors.serialNumber.message}</p>}
      </div>
      <div>
        <label className="block  font-bold mb-2 ">Install Date</label>
        <Controller
            name="installDate"
            control={control}
            render={({ field }) => (
                <input
                {...field}
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={field.value ? field.value.toISOString().split('T')[0] : ''} // Format Date to YYYY-MM-DD
                onChange={(e) => field.onChange(new Date(e.target.value))} // Convert back to Date
                />
            )}
        />
        {errors.installDate && <p className="text-red-500 mb-4 text-sm">{errors.installDate.message}</p>}
      </div>
      <div>
        <label className="block  font-bold mb-2 ">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border border-gray-300 rounded mb-2">
              <option value="Operational">Operational</option>
              <option value="Down">Down</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Retired">Retired</option>
            </select>
          )}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white  font-bold mb-2 py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default EquipmentForm;
