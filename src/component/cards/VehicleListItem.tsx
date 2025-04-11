import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface Vehicle {
  vehicleMaker: string;
  vehicleModel: string;
  vehicleYear: string;
  isDrivable: boolean;
}

interface Props {
  vehicle: Vehicle;
  vehicleIndex: number;
  expandedIndex: number | null;
  currentVehicleIndex: number;
  sameLocation: boolean | null;
  setExpandedIndex: (index: number | null) => void;
  handleEditVehicle: (index: number) => void;
  setErrors: (errors: any[]) => void;
}

const VehicleListItem: React.FC<Props> = ({
  vehicle,
  vehicleIndex,
  expandedIndex,
  currentVehicleIndex,
  sameLocation,
  setExpandedIndex,
  handleEditVehicle,
  setErrors,
}) => {
  if (sameLocation || currentVehicleIndex === 0) return null;

  const isExpanded = expandedIndex === vehicleIndex;

  return (
    <div
      className="flex flex-row space-x-2 bg-[#2c2c2c] border-1 border-[#2098ee] text-white mb-2 p-2 grid grid-cols-[1fr_1fr_1fr_min-content_min-content_1fr] shadow-lg rounded-xl w-full cursor-pointer"
      onClick={() => {
        setExpandedIndex(vehicleIndex);
        setErrors([]);
      }}
      style={{
        boxShadow: "0 0 50px -5px rgba(32, 152, 238, 0.2)",
      }}
    >
      {isExpanded ? (
        <>
          <div className="flex flex-col pl-2">
            <strong>Make</strong> {vehicle.vehicleMaker}
          </div>
          <div className="flex flex-col">
            <strong>Model</strong> {vehicle.vehicleModel}
          </div>
          <div className="flex flex-col">
            <strong>Year</strong> {vehicle.vehicleYear}
          </div>
          {!vehicle.isDrivable ? (
            <div className="flex w-8">
              <button className="text-red-500">
                <img
                  src={
                    vehicle.isDrivable
                      ? "/motor-svg-green.svg"
                      : "/motor-svg-red.svg"
                  }
                  width={24}
                  height={24}
                  alt="Drivable status"
                />
              </button>
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex w-8">
            <button
              className="text-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                handleEditVehicle(vehicleIndex);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <div
            className="flex"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedIndex(isExpanded ? null : vehicleIndex);
            }}
          >
            <p className="p-[10px] bg-[#2c2c2c] rounded-[100%]">
              <img
                alt="arrow"
                src="/arrow_forward.38aa47a7_2.svg"
                width="24"
                height="24"
                className={isExpanded ? "rotate-90" : ""}
                style={{ transition: "transform 0.3s ease" }}
              />
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">Vehicle {vehicleIndex + 1}</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setExpandedIndex(isExpanded ? null : vehicleIndex);
            }}
          >
            <p className="p-[10px] bg-[#2c2c2c] rounded-[100%]">
              <img
                alt="arrow"
                src="/arrow_forward.38aa47a7_2.svg"
                width="24"
                height="24"
                className={isExpanded ? "rotate-90" : ""}
                style={{ transition: "transform 0.3s ease" }}
              />
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleListItem;
