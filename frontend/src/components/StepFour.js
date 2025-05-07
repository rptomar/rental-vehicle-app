// StepFour.js
import React from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, FormHelperText, FormLabel, FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  modelId: yup.string().required('Please select a vehicle model'),
});

const StepFour = ({ next, data, setData, vehicleModels }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    setData({ ...data, vehicleId: formData.modelId });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl component="fieldset" error={!!errors.modelId}>
        <FormLabel>Vehicle Model</FormLabel>
        <RadioGroup>
          {vehicleModels?.map((model) => (
            <FormControlLabel
              key={model.id}
              value={model.id}
              control={<Radio {...register('modelId')} />}
              label={model.model}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{errors.modelId?.message}</FormHelperText>
      </FormControl>
      <div>
      <Button type="submit" variant="contained">Next</Button>
      </div>
    </form>
  );
};

export default StepFour;
