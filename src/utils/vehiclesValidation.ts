export const VehicleValidation = (
  vehicle: any,
  currentYear: number,
  currentVehicleIndex: number
): boolean => {
  return !!(
    vehicle[currentVehicleIndex]?.vehicleMaker &&
    vehicle[currentVehicleIndex]?.vehicleModel &&
    vehicle[currentVehicleIndex]?.vehicleYear &&
    /^\d{4}$/.test(vehicle[currentVehicleIndex]?.vehicleYear) &&
    vehicle[currentVehicleIndex]?.vehicleYear >= 1900 &&
    vehicle[currentVehicleIndex]?.vehicleYear <= currentYear &&
    vehicle[currentVehicleIndex]?.isDrivable !== null &&
    vehicle[currentVehicleIndex]?.type &&
    vehicle[currentVehicleIndex]?.category
  );
};
