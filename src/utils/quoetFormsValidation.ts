import { Vehicle } from "@/types/vehicleTypes";

export interface Location {
  // Existing properties of Location
  pickupLocation?: string; // Add this property if it is missing
  deliveryLocation?: string; // Add this property if needed
  addressTypeForPickup?: string; // Add this property if needed
  addressTypeForDeliver?: string; // Add this property if needed
  pickupContactName?: string; // Add this property if needed
  pickupContactPhone?: string; // Add this property if needed
  dropoffContactName?: string; // Add this property if needed
  dropoffContactPhone?: string; // Add this property if needed
  isPickupContact?: boolean; // Add this property if needed
  isDropoffContact?: boolean; // Add this property if needed
}

const currentYear = new Date().getFullYear();

export const validateVehicleDetails = (vehicle: Vehicle) => {
  const errors: any = {};

  if (!vehicle.vehicleMaker) errors.vehicleMaker = "Vehicle maker is required.";
  if (!vehicle.vehicleModel) errors.vehicleModel = "Vehicle model is required.";
  if (!vehicle.vehicleYear) {
    errors.vehicleYear = "Vehicle year is required.";
  } else if (!/^\d{4}$/.test(vehicle.vehicleYear.toString())) {
    errors.vehicleYear = "Enter a valid year (4 digits).";
  } else if (vehicle.vehicleYear < 1900 || vehicle.vehicleYear > currentYear) {
    errors.vehicleYear = `Enter a valid year between 1900 and ${currentYear}`;
  }

  if (vehicle.isDrivable === null)
    errors.isDrivable = "Drivable status is required.";
  if (!vehicle.type) errors.type = "This field is required.";
  if (!vehicle.category) errors.category = "Vehicle Category is required.";

  return errors;
};

export const validatePickupAndDelivery = (
  pickUpDate?: Date | null,
  pickUpDateRangeStart?: Date | null,
  pickUpDateRangeEnd?: Date | null,
  deliveryDate?: Date | null,
  deliveryDateRangeStart?: Date | null,
  deliveryDateRangeEnd?: Date | null,
  pickUpTime?: string,
  pickUpTimeRangeStart?: string,
  pickUpTimeRangeEnd?: string,
  deliveryTime?: string,
  deliveryTimeRangeStart?: string,
  deliveryTimeRangeEnd?: string
) => {
  const errors: any = {};

  if (!(pickUpDate || pickUpDateRangeStart || pickUpDateRangeEnd))
    errors.pickUpDate = "Pickup date is required.";
  if (!(deliveryDate || deliveryDateRangeStart || deliveryDateRangeEnd))
    errors.deliveryDate = "Delivery date is required.";
  if (!(pickUpTime || pickUpTimeRangeStart || pickUpTimeRangeEnd))
    errors.pickUpTime = "Pickup Time is required.";
  if (!(deliveryTime || deliveryTimeRangeStart || deliveryTimeRangeEnd))
    errors.deliveryTime = "Delivery Time is required.";

  return errors;
};

export const validateContactInfo = (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  isDealer: boolean | null,
  dealerCompanName?: string,
  isClientNote?: boolean | undefined | null,
  note?: string
) => {
  const errors: any = {};

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (phone.replace(/\D/g, "").length !== 10)
    errors.phone = "Phone number must be 10 digits.";
  else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone))
    errors.phone = "Phone number format is incorrect.";

  if (
    !email ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (isDealer === null || isDealer === undefined) {
    errors.isDealer = "Please select if you are a dealer or business.";
  } else if (isDealer && !dealerCompanName?.trim()) {
    errors.dealerCompanName = "Company name is required.";
  }

  if (isClientNote === null || isClientNote === undefined) {
    errors.isClientNote = "Please indicate if you have a note.";
  } else if (isClientNote) {
    if (!(note ?? "").trim()) errors.note = "Note cannot be empty.";
    else if ((note ?? "").trim().split(/\s+/).length > 50)
      errors.note = "Note cannot exceed 50 words.";
  }

  return errors;
};

export const validateLocation = (
  location: Location[],
  errorsLocation: any[],
  vehicles: Vehicle[]
) => {
  let isValid = true;

  // Initialize missing location and error entries
  const updatedLocation = [...location];
  const newErrors = [...errorsLocation];

  vehicles.forEach((_, index) => {
    if (!updatedLocation[index]) {
      updatedLocation[index] = {
        pickupLocation: "",
        deliveryLocation: "",
        addressTypeForPickup: "",
        addressTypeForDeliver: "",
        isPickupContact: true,
        isDropoffContact: true,
        pickupContactName: "",
        pickupContactPhone: "",
        dropoffContactName: "",
        dropoffContactPhone: "",
      };
    }

    if (!newErrors[index]) {
      newErrors[index] = {
        pickupLocation: "",
        deliveryLocation: "",
        addressTypeForPickup: "",
        addressTypeForDeliver: "",
        pickupContactName: "",
        pickupContactPhone: "",
        dropoffContactName: "",
        dropoffContactPhone: "",
      };
    }

    const loc = updatedLocation[index];

    if (!loc.pickupLocation)
      newErrors[index].pickupLocation = "Pickup location is required.";
    if (!loc.deliveryLocation)
      newErrors[index].deliveryLocation = "Delivery location is required.";
    if (!loc.addressTypeForPickup)
      newErrors[index].addressTypeForPickup =
        "Pickup address type is required.";
    if (!loc.addressTypeForDeliver)
      newErrors[index].addressTypeForDeliver =
        "Delivery address type is required.";

    if (loc.isPickupContact === false) {
      if (!loc.pickupContactName)
        newErrors[index].pickupContactName = "Pickup contact name is required.";
      if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(loc.pickupContactPhone ?? "")) {
        newErrors[index].pickupContactPhone =
          "Enter a valid 10-digit phone number for pickup contact.";
      }
    }

    if (loc.isDropoffContact === false) {
      if (!loc.dropoffContactName)
        newErrors[index].dropoffContactName =
          "Dropoff contact name is required.";
      if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(loc.dropoffContactPhone ?? "")) {
        newErrors[index].dropoffContactPhone =
          "Enter a valid 10-digit phone number for dropoff contact.";
      }
    }

    if (Object.values(newErrors[index]).some((val) => val !== ""))
      isValid = false;
  });

  return { newErrors, isValid };
};
