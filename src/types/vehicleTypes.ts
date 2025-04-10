export type Vehicle = {
  vehicleId: string;
  vehicleMaker: string;
  vehicleModel: string;
  vehicleYear: string;
  isDrivable: boolean | null;
  type: string;
  category: string;
};

export type Errors = {
  vehicleMaker: string;
  vehicleModel: string;
  vehicleYear: string;
  isDrivable: string;
  type: string;
  category: string;
};

export interface StepTwoProps {
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  vehicles: Vehicle[];
  currentVehicleIndex: number;
  setCurrentVehicleIndex: React.Dispatch<React.SetStateAction<number>>;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  isNextEnabled: boolean;
}
