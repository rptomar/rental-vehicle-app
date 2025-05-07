// StepFive.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  startDate: yup.date().required('Start date required'),
  endDate: yup
    .date()
    .required('End date required')
    .min(yup.ref('startDate'), 'End date must be after start date'),
});

const StepFive = ({ next, data, setData, onBook }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: data.startDate || null,
      endDate: data.endDate || null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    // Check for validation errors
    if (Object.keys(errors).length > 0) {
      return; // Prevent submission if there are errors
    }
    
    setData({ ...data, ...formData });
    onBook({ ...data, ...formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Select Booking Dates</Typography>
      <Box display="flex" gap={2} mt={2}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Start Date"
                dateFormat="yyyy/MM/dd"
                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
              />
              {errors.startDate && (
                <Typography color="error">{errors.startDate.message}</Typography>
              )}
            </>
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="End Date"
                dateFormat="yyyy/MM/dd"
                className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
              />
              {errors.endDate && (
                <Typography color="error">{errors.endDate.message}</Typography>
              )}
            </>
          )}
        />
      </Box>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>Submit</Button>
    </form>
  );
};

export default StepFive;
