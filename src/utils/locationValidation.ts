export const LocationValidation = (
  location: any[],
  sameLocation: boolean | null,
  vehiclesLength: number
): boolean => {
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
      vehiclesLength > 0 &&
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
