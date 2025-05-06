// src/components/FormWizard.js
import React, { useState } from 'react';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import StepFour from '../components/StepFour';
import StepFive from '../components/StepFive';
import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';

const FormWizard = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: null,
    vehicleType: '',
    vehicleId: '',
    startDate: '',
    endDate: '',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    'Name',
    'Wheels',
    'Vehicle Type',
    'Vehicle Model',
    'Booking Dates'
  ];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <StepOne next={nextStep} data={formData} setData={setFormData} />;
      case 1:
        return <StepTwo next={nextStep} prev={prevStep} data={formData} setData={setFormData} />;
      case 2:
        return <StepThree next={nextStep} prev={prevStep} data={formData} setData={setFormData} />;
      case 3:
        return <StepFour next={nextStep} prev={prevStep} data={formData} setData={setFormData} />;
      case 4:
        return <StepFive prev={prevStep} data={formData} setData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4}>
          {getStepContent(step)}
        </Box>
      </Box>
    </Container>
  );
};

export default FormWizard;
