// StepTwo.js
import React from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, FormHelperText, FormLabel, FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  wheels: yup.string().required('Please select number of wheels'),
});

const StepTwo = ({ next, data, setData }) => {
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
      <FormControl component="fieldset" error={!!errors.wheels}>
        <FormLabel>Number of Wheels</FormLabel>
        <RadioGroup row {...register('wheels')}>
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
        </RadioGroup>
        <FormHelperText>{errors.wheels?.message}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained">Next</Button>
    </form>
  );
};

export default StepTwo;
