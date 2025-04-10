import { Dispatch, SetStateAction } from "react";

export const resetFormFields = (
  setVehicles: Dispatch<SetStateAction<any[]>>,
  setLocation: Dispatch<SetStateAction<any[]>>,
  setFirstName: Dispatch<SetStateAction<string>>,
  setLastName: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  setPhone: Dispatch<SetStateAction<string>>,
  setIsDealer: Dispatch<SetStateAction<boolean>>,
  setDealerCompanName: Dispatch<SetStateAction<string>>,
  setNote: Dispatch<SetStateAction<string>>,
  setPickUpDateOption: Dispatch<SetStateAction<string>>,
  setPickUpDate: Dispatch<SetStateAction<Date | null>>,
  setPickUpTimeOption: Dispatch<SetStateAction<string>>,
  setPickUpTime: Dispatch<SetStateAction<string>>,
  setPickUpDateRangeStart: Dispatch<SetStateAction<Date | null>>,
  setPickUpDateRangeEnd: Dispatch<SetStateAction<Date | null>>,
  setPickUpTimeRangeStart: Dispatch<SetStateAction<string>>,
  setPickUpTimeRangeEnd: Dispatch<SetStateAction<string>>,
  setDeliveryDateOption: Dispatch<SetStateAction<string>>,
  setDeliveryDate: Dispatch<SetStateAction<Date | null>>,
  setDeliveryTimeOption: Dispatch<SetStateAction<string>>,
  setDeliveryTime: Dispatch<SetStateAction<string>>,
  setDeliveryDateRangeStart: Dispatch<SetStateAction<Date | null>>,
  setDeliveryDateRangeEnd: Dispatch<SetStateAction<Date | null>>,
  setDeliveryTimeRangeStart: Dispatch<SetStateAction<string>>,
  setDeliveryTimeRangeEnd: Dispatch<SetStateAction<string>>
) => {
  setVehicles([]);
  setLocation([]);
  setFirstName("");
  setLastName("");
  setEmail("");
  setPhone("");
  setIsDealer(false);
  setDealerCompanName("");
  setNote("");

  setPickUpDateOption("");
  setPickUpDate(null);
  setPickUpTimeOption("");
  setPickUpTime("");
  setPickUpDateRangeStart(null);
  setPickUpDateRangeEnd(null);
  setPickUpTimeRangeStart("");
  setPickUpTimeRangeEnd("");

  setDeliveryDateOption("");
  setDeliveryDate(null);
  setDeliveryTimeOption("");
  setDeliveryTime("");
  setDeliveryDateRangeStart(null);
  setDeliveryDateRangeEnd(null);
  setDeliveryTimeRangeStart("");
  setDeliveryTimeRangeEnd("");
};
