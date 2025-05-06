// src/components/FormWizard.js
import React, { useState, useEffect } from 'react';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import StepFour from '../components/StepFour';
import StepFive from '../components/StepFive';
import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import { getVehicleTypes, getVehicles, bookVehicle } from '../utils/api';

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

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    'Name',
    'Wheels',
    'Vehicle Type',
    'Vehicle Model',
    'Booking Dates'
  ];

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      if (formData.wheels) {
        const types = await getVehicleTypes(formData.wheels);
        setVehicleTypes(types);
      }
    };
    fetchVehicleTypes();
  }, [formData.wheels]);

  const handleVehicleTypeSubmit = async (vehicleTypeId) => {
    const models = await getVehicles(vehicleTypeId);
    setVehicleModels(models);
    nextStep();
  };

  const bookVehicleHandler = async (bookingData) => {
    try {
      const response = await bookVehicle(bookingData);
      setBookingSuccess(response);
      console.log('Booking successful:', response);
    } catch (error) {
      setBookingError(error.message);
      console.error('Booking failed:', error);
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <StepOne next={nextStep} data={formData} setData={setFormData} />;
      case 1:
        return <StepTwo next={nextStep} prev={prevStep} data={formData} setData={setFormData} />;
      case 2:
        return <StepThree next={handleVehicleTypeSubmit} prev={prevStep} data={formData} setData={setFormData} vehicleTypes={vehicleTypes} />;
      case 3:
        return <StepFour next={nextStep} prev={prevStep} data={formData} setData={setFormData} vehicleModels={vehicleModels} />;
      case 4:
        return <StepFive prev={prevStep} data={formData} setData={setFormData} onBook={bookVehicleHandler} />;
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
        {bookingError && <div style={{ color: 'red' }}>{bookingError}</div>}
        {bookingSuccess && <div style={{ color: 'green' }}>Booking successful!</div>}
      </Box>
    </Container>
  );
};

export default FormWizard;
