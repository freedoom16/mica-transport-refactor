"use client";
import React, { useState, useEffect } from "react";
import { useGetQuoetsByIDQuery } from "../../../src/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import DIsplayFormSkeleton from "./displayFormSkeleton";
import { after } from "node:test";

const QuoteFormDisplayOne: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<string | null>(null);

  const [option, setOption] = useState<string | null>(null);
  const [pickupDateOption, setPickupDateOption] = useState<string | null>(null);
  const [deliveryDateOption, setDeliveryDateOption] = useState<string | null>(
    null
  );
  const [pickupTimeOption, setPickupTimeOption] = useState<string | null>(null);
  const [deliveryTimeOption, setDeliveryTimeOption] = useState<string | null>(
    null
  );

  const [pickupLocationName, setPickupLocationName] = useState("");
  const [pickupLocationPhone, setPickupLocationPhone] = useState("");
  const [deliveryLocationName, setdeliveryLocationName] = useState("");
  const [deliveryLocationPhone, setdeliveryLocationPhone] = useState("");

  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  // Get the quote ID from the router query
  const searchParams: any = useSearchParams();
  const quoteId = searchParams.get("id");

  // Fetch the quote data using `useGetQuotesQuery`
  const {
    data: data,
    isLoading,
    isError,
    error,
  } = useGetQuoetsByIDQuery(quoteId);

  const Error: any = error;

  const quoteData = data?.data;
  console.log(quoteData);
  // console.log(quoteData.client?.fullName);
  // {
  //   pickupLocation: "123 Main St, Cityville, NY",
  //   pickupLocationName: "test test",
  //   pickupLocationPhone: "+12345678998",
  //   deliveryLocation: "456 Elm St, Townsville, TX",
  //   deliveryLocationName: "freedom m",
  //   deliveryLocationPhone: "+12345678998",
  //   shipmentDate: "03-15-2025",
  //   vehicleYear: "2020",
  //   vehicleModel: "Toyota Camry",
  //   vehicleType: "open",
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "johndoe@example.com",
  //   phone: "+1 (555) 123-4567",
  //   paymentMethod: "down_time",
  //   paymentLink: "https://payment.link/your-payment-url",
  //   pickupDate: "03-14-2025",
  //   deliveryDate: "03-16-2025",
  //   pickupTime: "10:00 AM",
  //   deliveryTime: "2:00 PM",
  //   option: "Before",
  //   pickupDateOption: "On", // Set as "on"
  //   deliveryDateOption: "Before", // Set as "before"
  //   pickupTimeOption: "Between", // Set as "between"
  //   deliveryTimeOption: "On", // Set as "on"
  // };

  // Check if the quote data has loaded
  useEffect(() => {
    if (quoteData) {
      // Setting pickup and delivery locations
      setPickupLocation(quoteData.locations?.[0]?.pickup?.pickupLocation || "");
      setDeliveryLocation(
        quoteData.locations?.[0]?.delivery?.deliveryLocation || ""
      );

      // Setting pickup and delivery contact details
      setPickupLocationName(
        quoteData.locations?.[0]?.pickup?.pickupContactName || ""
      );
      setPickupLocationPhone(
        quoteData.locations?.[0]?.pickup?.pickupContactPhone || ""
      );
      setdeliveryLocationName(
        quoteData.locations?.[0]?.delivery?.dropoffContactName || ""
      );
      setdeliveryLocationPhone(
        quoteData.locations?.[0]?.delivery?.dropoffContactPhone || ""
      );

      // Setting shipment details
      setPickupDate(quoteData.pickUpTime?.pickUpDate || "");
      setPickupTime(quoteData.pickUpTime?.pickUpTime || "");
      setDeliveryDate(quoteData.deliveryTime?.deliveryDate || "");
      setDeliveryTime(quoteData.deliveryTime?.deliveryTime || "");

      // Setting pickup and delivery options
      setPickupDateOption(quoteData.pickUpTime?.pickUpDateOption || "");
      setDeliveryDateOption(quoteData.deliveryTime?.deliveryDateOption || "");
      setPickupTimeOption(quoteData.pickUpTime?.pickUpTimeOption || "");
      setDeliveryTimeOption(quoteData.deliveryTime?.deliveryTimeOption || "");

      // Setting vehicle details
      setVehicleYear(quoteData.vehicleInfo?.[0]?.vehicleYear || "");
      setVehicleModel(quoteData.vehicleInfo?.[0]?.vehicleModel || "");
      setVehicleType(quoteData.vehicleInfo?.[0]?.vehicleMaker || ""); // Assuming 'vehicleMaker' is equivalent to vehicle type

      // Setting client details
      setFirstName(quoteData.client?.fullName || "");
      setEmail(quoteData.client?.email || "");
      setPhone(quoteData.client?.phone || "");

      // Setting additional details
      setOption(quoteData.status || ""); // Assuming 'status' is relevant
    }
  }, [quoteData]);

  if (isLoading) {
    return (
      <div className="mt-12">
        {" "}
        <DIsplayFormSkeleton />;
      </div>
    );
  }

  if (isError) {
    console.log(Error);
    return (
      <div className="text-red-300 text-center h-[700px] mt-24 p-20">
        {Error?.message} Failed to load quote data. Please try again later.
      </div>
    );
  }

  return (
    <section id="quote">
      <div className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900 mt-12">
        {/* Step 3: Contact Info */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* Full Name */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Full Name:</p>
              <p className="w-2/3">{quoteData.client.fullName}</p>
            </div>

            {/* Email Address */}
            {quoteData.client.email && (
              <div className="flex justify-between items-center">
                <p className="font-semibold w-1/3">Email Address:</p>
                <p className="w-2/3">{quoteData.client.email}</p>
              </div>
            )}

            {/* Phone Number */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Phone Number:</p>
              <p className="w-2/3">{quoteData.client.phone}</p>
            </div>

            {/* Is Dealer */}
            {quoteData.client.areYouDealer && (
              <div className="flex justify-between items-center">
                <p className="font-semibold w-1/3">Is Dealer:</p>
                <p className="w-2/3">
                  {quoteData.client.areYouDealer ? "Dealer" : "Not Dealer"}
                </p>
              </div>
            )}

            {quoteData.client.areYouDealer === true && (
              <div className="flex justify-between items-center">
                <p className="font-semibold w-1/3">Is Dealer:</p>
                <p className="w-2/3">{quoteData.client?.companyName}</p>
              </div>
            )}
            {quoteData.client.note && (
              <div className="flex justify-between items-center">
                <p className="font-semibold w-1/3">Client Note</p>
                <p className="w-2/3">{quoteData.client.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Step 1: Pickup, Delivery, and Shipment Date */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">
            Pickup and Dropoff Location Details
          </h2>
          <div className="space-y-4">
            {quoteData.locations.map((location: any, index: any) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300"
              >
                <p className="font-bold text-white text-center">
                  Vehicle {index + 1} Location
                </p>
                {/* Pickup Location */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold w-1/3">Pickup Location:</p>
                  <p className="w-2/3">{location.pickup.pickupLocation}</p>
                </div>

                {location.pickup.isPickupContact === false ? (
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold w-1/3">
                        Pickup Contact Name:
                      </p>
                      <p className="w-2/3">
                        {location.pickup.pickupContactName}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="font-semibold w-1/3">
                        Pickup Contact Phone:
                      </p>
                      <p className="w-2/3">
                        {location.pickup.pickupContactPhone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="font-semibold w-1/3">At Point of Pickup</p>
                  </div>
                )}

                {/* Delivery Location */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold w-1/3">Delivery Location:</p>
                  <p className="w-2/3">{location.delivery.deliveryLocation}</p>
                </div>

                {location.delivery.isDropoffContact === false ? (
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold w-1/3">
                        Delivery Contact Name:
                      </p>
                      <p className="w-2/3">
                        {location.delivery.dropoffContactName}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="font-semibold w-1/3">
                        Delivery Contact Phone:
                      </p>
                      <p className="w-2/3">
                        {location.delivery.dropoffContactPhone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="font-semibold w-1/3">At Point of Dropoff</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pickup and Delivery Dates */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">
            Shipment Date and Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {/* Pickup Date */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Date:</p>
              <div className="w-2/3 flex flex-row">
                <p className="pr-2">{quoteData.pickUpTime.pickUpDateOption}</p>
                {quoteData.pickUpTime.pickUpDateOption === "on" ||
                "before" ||
                "after" ? (
                  <p>
                    {new Date(
                      quoteData.pickUpTime.pickUpDate
                    ).toLocaleDateString()}
                  </p>
                ) : (
                  <p>
                    {new Date(
                      quoteData.pickUpTime.pickUpDateRangeStart
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      quoteData.pickUpTime.pickUpDateRangeEnd
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Date */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Date:</p>
              <div className="w-2/3 flex flex-row">
                <p className="pr-2">
                  {quoteData.deliveryTime.deliveryDateOption}
                </p>
                {quoteData.deliveryTime.deliveryDateOption === "on" ||
                "before" ||
                "after" ? (
                  <p>
                    {new Date(
                      quoteData.deliveryTime.deliveryDate
                    ).toLocaleDateString()}
                  </p>
                ) : (
                  <p>
                    {new Date(
                      quoteData.deliveryTime.deliveryDateRangeStart
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      quoteData.deliveryTime.deliveryDateRangeEnd
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Pickup Time */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Pickup Time:</p>
              <div className="w-2/3 flex flex-row">
                <p className="pr-2">{quoteData.pickUpTime.pickUpTimeOption}</p>
                {quoteData.pickUpTime.pickUpTimeOption === "on" ||
                "before" ||
                "after" ? (
                  <p>
                    {new Date(
                      `1970-01-01T${quoteData.pickUpTime.pickUpTime}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                ) : (
                  <p>
                    {new Date(
                      `1970-01-01T${quoteData.pickUpTime.pickUpTimeRangeStart}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(
                      `1970-01-01T${quoteData.pickUpTime.pickUpTimeRangeEnd}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="flex justify-between items-center">
              <p className="font-semibold w-1/3">Delivery Time:</p>
              <div className="w-2/3 flex flex-row">
                <p className="pr-2">
                  {quoteData.deliveryTime.deliveryTimeOption}
                </p>
                {quoteData.deliveryTime.deliveryTimeOption === "on" ||
                "before" ||
                "after" ? (
                  <p>
                    {new Date(
                      `1970-01-01T${quoteData.deliveryTime.deliveryTime}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                ) : (
                  <p>
                    {new Date(
                      `1970-01-01T${quoteData.deliveryTime.deliveryTimeRangeStart}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(
                      `1970-01-01T${quoteData.deliveryTime.deliveryTimeRangeEnd}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Vehicle Info */}
        <div className="bg-gray-800 p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Vehicle Info</h2>
          <div className="space-y-4">
            {quoteData.vehicleInfo.map((vehicle: any, index: any) => (
              <div key={index} className="space-y-4">
                {/* Vehicle Year */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold w-1/3">Vehicle Year:</p>
                  <p className="w-2/3">{vehicle.vehicleYear}</p>
                </div>

                {/* Vehicle Maker */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold w-1/3">Vehicle Maker:</p>
                  <p className="w-2/3">{vehicle.vehicleMaker}</p>
                </div>

                {/* Vehicle Model */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold w-1/3">Vehicle Model:</p>
                  <p className="w-2/3">{vehicle.vehicleModel}</p>
                </div>

                {/* Drivable Status */}
                <div className="flex justify-between items-center">
                  <p
                    className={`w-2/3 font-bold  p-2 rounded-lg text-center ${
                      vehicle.isDrivable === "true"
                        ? "bg-green-700"
                        : "bg-red-700"
                    }`}
                  >
                    {vehicle.isDrivable === "true"
                      ? "Drivable"
                      : "Not Drivable"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Handling */}
        {isError && (
          <div className="text-red-500 text-sm mb-4 mt-20 p-16">
            Failed to load quote data. Please try again later.
          </div>
        )}
      </div>
    </section>
  );
};

export default QuoteFormDisplayOne;
