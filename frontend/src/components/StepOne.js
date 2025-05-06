// StepOne.js
import React from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
});

const StepOne = ({ next, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    setData({ ...data, ...formData });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="First Name" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth margin="normal" />
      <TextField label="Last Name" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth margin="normal" />
      <Button type="submit" variant="contained">Next</Button>
    </form>
  );
};

export default StepOne;
