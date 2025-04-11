import { Vehicle } from "@/types/vehicleTypes";

export const generateQuoteData = (
  vehicles: Vehicle[],
  location: any[],
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  isDealer: boolean | null,
  dealerCompanName: string | undefined,
  note: string | undefined,
  pickUpDateOption: string,
  pickUpDate: Date | null,
  pickUpTimeOption: string,
  pickUpTime: string,
  pickUpDateRangeStart: Date | null,
  pickUpDateRangeEnd: Date | null,
  pickUpTimeRangeStart: string,
  pickUpTimeRangeEnd: string,
  deliveryDateOption: string,
  deliveryDate: Date | null,
  deliveryTimeOption: string,
  deliveryTime: string,
  deliveryDateRangeStart: Date | null,
  deliveryDateRangeEnd: Date | null,
  deliveryTimeRangeStart: string,
  deliveryTimeRangeEnd: string
) => {
  return {
    vehicleInfo: vehicles.map((vehicle) => ({
      vehicleYear: vehicle.vehicleYear || null,
      vehicleMaker: vehicle.vehicleMaker || "",
      vehicleModel: vehicle.vehicleModel || "",
      vehicleCatagory: vehicle.category || "",
      vehicleType: vehicle.type || "",
      isDrivable: vehicle.isDrivable || false,
      vehicleId: vehicle.vehicleId,
    })),

    locations: location.map((loc, index) => ({
      vehicleId: vehicles[index]?.vehicleId,
      pickup: {
        pickupLocation: loc.pickupLocation || "",
        isPickupContact: loc.isPickupContact || false,
        pickupContactName: loc.pickupContactName || "",
        pickupContactPhone: loc.pickupContactPhone || "",
        addressTypeForPickup: loc.addressTypeForPickup || "",
      },
      delivery: {
        deliveryLocation: loc.deliveryLocation || "",
        isDropoffContact: loc.isDropoffContact || false,
        dropoffContactName: loc.dropoffContactName || "",
        dropoffContactPhone: loc.dropoffContactPhone || "",
        addressTypeForDeliver: loc.addressTypeForDeliver || "",
      },
    })),

    pickUpTime: {
      pickUpDateOption: pickUpDateOption,
      pickUpDate: pickUpDate?.toISOString() || null,
      pickUpTimeOption: pickUpTimeOption,
      pickUpTime: pickUpTime,
      pickUpDateRangeStart: pickUpDateRangeStart?.toISOString() || null,
      pickUpDateRangeEnd: pickUpDateRangeEnd?.toISOString() || null,
      pickUpTimeRangeStart: pickUpTimeRangeStart,
      pickUpTimeRangeEnd: pickUpTimeRangeEnd,
    },

    deliveryTime: {
      deliveryDateOption: deliveryDateOption,
      deliveryDate: deliveryDate?.toISOString() || null,
      deliveryTimeOption: deliveryTimeOption,
      deliveryTime: deliveryTime,
      deliveryDateRangeStart: deliveryDateRangeStart?.toISOString() || null,
      deliveryDateRangeEnd: deliveryDateRangeEnd?.toISOString() || null,
      deliveryTimeRangeStart: deliveryTimeRangeStart,
      deliveryTimeRangeEnd: deliveryTimeRangeEnd,
    },

    client: {
      fullName: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      areYouDealer: isDealer || false,
      dealerName: dealerCompanName,
      note: note,
    },

    status: {
      type: Object,
      fullName: "String",
      email: "String",
      phone: "String",
    },
  };
};
