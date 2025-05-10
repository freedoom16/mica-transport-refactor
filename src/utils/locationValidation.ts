import React, { useEffect } from "react";

export const LocationValidation = (
  location: any[],
  sameLocation: boolean | null,
  vehicles: any,
  setLocation: React.Dispatch<React.SetStateAction<any[]>>
): boolean => {
  useEffect(() => {
    if (!sameLocation && vehicles.length > 0) {
      setLocation(
        Array.from({ length: vehicles.length }, () => ({
          pickupLocation: "",
          deliveryLocation: "",
          addressTypeForPickup: "",
          addressTypeForDeliver: "",
          isPickupContact: undefined,
          pickupContactName: "",
          pickupContactPhone: "",
          isDropoffContact: undefined,
          dropoffContactName: "",
          dropoffContactPhone: "",
        }))
      );
    }
  }, [sameLocation, vehicles.length]);

  if (sameLocation || location.length === 0) {
    const loc = location?.[0];
    return (
      loc?.pickupLocation &&
      loc?.deliveryLocation &&
      loc?.addressTypeForPickup &&
      loc?.addressTypeForDeliver &&
      (loc?.isPickupContact === true ||
        (loc?.pickupContactName && loc?.pickupContactPhone)) &&
      (loc?.isDropoffContact === true ||
        (loc?.dropoffContactName && loc?.dropoffContactPhone))
    );
  } else {
    return (
      vehicles.length > 0 &&
      location.every(
        (loc: any) =>
          loc &&
          loc.pickupLocation &&
          loc.deliveryLocation &&
          loc.addressTypeForPickup &&
          loc.addressTypeForDeliver &&
          (loc.isPickupContact === true ||
            (loc.pickupContactName && loc.pickupContactPhone)) &&
          (loc.isDropoffContact === true ||
            (loc.dropoffContactName && loc.dropoffContactPhone))
      )
    );
  }
};
