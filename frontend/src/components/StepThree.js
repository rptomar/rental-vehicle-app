// StepThree.js
import React from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, FormHelperText, FormLabel, FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  vehicleType: yup.string().required('Please select a vehicle type'),
});

const StepThree = ({ next, data, setData, vehicleTypes }) => {
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
      <FormControl component="fieldset" error={!!errors.vehicleType}>
        <FormLabel>Vehicle Type</FormLabel>
        <RadioGroup {...register('vehicleType')}>
          {vehicleTypes.map((type) => (
            <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.name} />
          ))}
        </RadioGroup>
        <FormHelperText>{errors.vehicleType?.message}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained">Next</Button>
    </form>
  );
};

export default StepThree;
