// StepFive.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';

const schema = yup.object({
  startDate: yup.date().required('Start date required'),
  endDate: yup
    .date()
    .required('End date required')
    .min(yup.ref('startDate'), 'End date must be after start date'),
});

const StepFive = ({ next, data, setData }) => {
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
    setData({ ...data, ...formData });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Select Booking Dates</Typography>
      <Box display="flex" gap={2} mt={2}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              {...field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              {...field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              )}
            />
          )}
        />
      </Box>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>Submit</Button>
    </form>
  );
};

export default StepFive;
