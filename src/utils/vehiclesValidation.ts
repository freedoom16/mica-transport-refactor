export const VehicleValidation = (
  vehicle: any,
  currentYear: number
): boolean => {
  return !!(
    vehicle?.vehicleMaker &&
    vehicle?.vehicleModel &&
    vehicle?.vehicleYear &&
    /^\d{4}$/.test(vehicle?.vehicleYear) &&
    Number(vehicle.vehicleYear) >= 1900 &&
    Number(vehicle.vehicleYear) <= currentYear &&
    vehicle?.isDrivable !== null &&
    vehicle?.type &&
    vehicle?.category
  );
};
