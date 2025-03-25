import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DIsplayFormSkeleton = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg text-white font-bold mb-2">
          <Skeleton
            width={150}
            height={24}
            baseColor="#374151" // Tailwind gray-700
            highlightColor="#D1D5DB" // Tailwind gray-300
          />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg text-white font-bold mb-2">
          <Skeleton
            width={150}
            height={24}
            baseColor="#374151" // Tailwind gray-700
            highlightColor="#D1D5DB" // Tailwind gray-300
          />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg text-white font-bold mb-2">
          <Skeleton
            width={150}
            height={24}
            baseColor="#374151" // Tailwind gray-700
            highlightColor="#D1D5DB" // Tailwind gray-300
          />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold w-1/3">
              <Skeleton
                width={100}
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
            <p className="w-2/3">
              <Skeleton
                width="100%"
                height={20}
                baseColor="#374151"
                highlightColor="#D1D5DB"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DIsplayFormSkeleton;
