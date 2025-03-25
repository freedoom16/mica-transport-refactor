import { useState } from "react";

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnershipModal: React.FC<PartnershipModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-gray-900 text-center text-lg mb-4">
          Partnership Form
        </h2>

        {/* Company Name Input */}

        <div className="relative z-5 w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Company Name
          </label>

          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder=""
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${"border-[#938f99]"} outline-none transition-all focus:border-[#6DB8D1]`}
          />
        </div>

        <div className="relative z-5 w-full mb-5 group">
          <label className="absolute px-3 py-2 text-sm rounded-xl bg-white text-black transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
            Position
          </label>

          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder=""
            className={`w-full h-14 px-3 py-2 text-sm text-gray-900 rounded-xl bg-white border ${"border-[#938f99]"} outline-none transition-all focus:border-[#6DB8D1]`}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Close
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnershipModal;
