"use client";
import { useGetQuoetsByIDQuery } from "@/store/Api/quotesApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"; // Import the skeleton library
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import DIsplayFormSkeleton from "./displayFormSkeleton";

const ViewQuoteForm = () => {
  const searchParams: any = useSearchParams();
  const userId = searchParams.get("id");

  const [driverName, setDriverName] = useState(""); // New state for driver's name

  // Fetch data using the query from the Redux store
  const {
    data: data,
    isLoading,
    error,
    isError,
  } = useGetQuoetsByIDQuery(userId);
  // const { data: formData, isLoading, error } = useGetQuoetsByIDQuery(userId);
  console.log(data);
  const formData: any = data?.data;
  // {
  //   pickupName: "John Doe",
  //   pickupAddress: "123 Main St, Springfield, IL",
  //   pickupCityState: "Springfield, IL",
  //   pickupPhone: "(555) 123-4567",
  //   deliveryName: "Jane Smith",
  //   deliveryAddress: "456 Oak Ave, Chicago, IL",
  //   deliveryCityState: "Chicago, IL",
  //   deliveryPhone: "(555) 987-6543",
  //   vehicleMileage: "25,000 miles",
  //   plateNumber: "XYZ 1234",
  //   vinNumber: "XMN10918",
  //   inspectionConditions: "Good condition, no visible damage",
  //   transportFee: "$300.00",
  //   prePaid: "$150.00",
  //   totalCOD: "$150.00",
  //   paymentType: "Credit Card",
  //   paymentMadeIn: "USD",
  // };

  // State for loading/error handling
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (error) {
      setErrorMessage("Error fetching data");
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <DIsplayFormSkeleton />;
  }

  if (errorMessage) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form or handle confirmation
    alert("Contract Confirmed! Driver: " + driverName); // Example confirmation
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900">
      {/* Vehicle and Payment Information */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg text-black font-bold mb-2">
          Vehicle and Payment Details
        </h3>
        <div className="space-y-4 text-black ">
          {formData?.vehicleInfo && formData?.vehicleInfo.length > 0 ? (
            <>
              {formData?.vehicleInfo.map((vehicle: any, index: number) => (
                <div key={index} className="space-y-4 lg:whitespace-nowrap">
                  <div className="border-b border-blue-600"></div>
                  <div className="font-bold">
                    vehicle {index + 1} information
                  </div>
                  <div className="flex justify-between items-center lg:whitespace-nowrap">
                    <p className="font-semibold w-2/3">Vehicle Mileage</p>
                    <p className="w-1/3">{vehicle.vehicleMileage}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold w-2/3">Plate Number</p>
                    <p className="w-1/3">{vehicle.plateNumber}</p>
                  </div>
                  {/* <div className="flex justify-between items-center">
                  <p className="font-semibold w-2/3">VIN Number:</p>
                  <p className="w-1/3">{vehicle.vinNumber}</p>
                </div> */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold w-2/3">Dimension</p>
                    <p className="w-1/3">{vehicle.dimension}</p>
                  </div>
                </div>
              ))}
              <div className="border-b border-blue-600"></div>

              <div className="flex justify-between items-center">
                <p className="font-semibold w-2/3">Total COD:</p>
                <p className="w-1/3">
                  {formData?.payment?.paymentType === "COP" ? (
                    <p className="w-1/3">{formData?.payment?.totalAmount}</p>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </>
          ) : (
            <p>No vehicle information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuoteForm;
