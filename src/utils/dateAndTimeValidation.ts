export const DateAndTimeValidation = (data: {
  pickUpDate?: Date | null;
  pickUpDateRangeStart?: string;
  pickUpDateRangeEnd?: string;
  deliveryDate?: Date | null;
  deliveryDateRangeStart?: string;
  deliveryDateRangeEnd?: string;
  pickUpTime?: string;
  pickUpTimeRangeStart?: string;
  pickUpTimeRangeEnd?: string;
  deliveryTime?: string;
  deliveryTimeRangeStart?: string;
  deliveryTimeRangeEnd?: string;
}): boolean => {
  const {
    pickUpDate,
    pickUpDateRangeStart,
    pickUpDateRangeEnd,
    deliveryDate,
    deliveryDateRangeStart,
    deliveryDateRangeEnd,
    pickUpTime,
    pickUpTimeRangeStart,
    pickUpTimeRangeEnd,
    deliveryTime,
    deliveryTimeRangeStart,
    deliveryTimeRangeEnd,
  } = data;

  return !!(
    (pickUpDate || pickUpDateRangeStart || pickUpDateRangeEnd) &&
    (deliveryDate || deliveryDateRangeStart || deliveryDateRangeEnd) &&
    (pickUpTime || pickUpTimeRangeStart || pickUpTimeRangeEnd) &&
    (deliveryTime || deliveryTimeRangeStart || deliveryTimeRangeEnd)
  );
};
