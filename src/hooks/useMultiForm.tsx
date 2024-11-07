import { useState } from "react";

export const useMultiForm = (steps: number) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextPage = () => {
    setCurrentStep((index) => {
      if (index > steps) {
        return index;
      }
      return index + 1;
    });
  };
  const prevPage = () => {
    setCurrentStep((index) => {
      if (index <= 1) {
        return index;
      }
      return index - 1;
    });
  };
  const setPage = (index: number) => {
    setCurrentStep(index);
  };

  return {
    prevPage,
    nextPage,
    setPage,
    currentStep,
    steps,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === steps,
  };
};
