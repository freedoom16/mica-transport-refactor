import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

type VehicleCardProps = {
  vehicle: {
    vehicleYear: string;
    vehicleModel: string;
    vehicleMaker: string;
    type: string; // "Open" or "Enclosed"
    isDrivable: boolean | null;
    category: string;
    sameLocation: boolean | null;
    vehicleId: string;
  };
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <div key={index} className="flex flex-row space-y-2 ">
      <div
        className=" flex flex-row space-x-2 bg-[#2c2c2c] text-white mb-2 p-2 grid grid-cols-[1fr_1fr_1fr__min-content_min-content_min-content] shadow-lg  rounded-xl w-full border-1 border-[#2098ee]"
        style={{
          boxShadow: "0 0 50px -5px rgba(32, 152, 238, 0.2)",
        }}
      >
        <div className="flex flex-col pl-2">
          <strong>Make</strong> {vehicle?.vehicleMaker}
        </div>
        <div className="flex flex-col">
          <strong>Model</strong> {vehicle?.vehicleModel}
        </div>
        <div className="flex flex-col">
          <strong>Year</strong> {vehicle?.vehicleYear}
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
          <button className="text-blue-500" onClick={() => onEdit(index)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>

        <div className="flex w-8">
          <button className="text-red-500 " onClick={() => onDelete(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
