import * as React from "react";

export interface ITestTestProps {}

export default function TestTest(props: ITestTestProps) {
  return (
    <section
      id="step-1"
      className="w-full h-full overflow-visible bg-[#302D38] text-white flex flex-col rounded-xl p-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-normal w-[90%] leading-9 text-xl">
          Instant Shipping Quote Calculator
        </h2>
        <p className="form-stepper-circle w-9">1 / 3</p>
      </div>
      <div className="relative mt-5 mb-2 w-full border-[0.5px] border-gray-700"></div>
      <div className="booking-formstate-vehicles-list-container flex gap-3 flex-wrap mt-[15px] relative bg-[#302D38] rounded-lg"></div>
      <div className="mt-[15px] relative">
        <div className="w-full flex flex-col gap-1 mb-4">
          <div className="w-full flex gap-4">
            <div className="w-2/4 h-14 flex items-center cursor-pointer rounded-xl pl-4 gap-3 bg-[#302D38] border border-[#938f99]">
              <input type="radio" required value="Open" />
              <p>Open</p>
            </div>
            <div className="w-2/4 h-14 flex items-center cursor-pointer rounded-xl pl-4 gap-3 bg-[#302D38] border border-[#938f99]">
              <input type="radio" required value="Enclosed" />
              <p>Enclosed</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full">
            <div>
              <div className="w-full">
                <div className="mb-4 relative top-0">
                  <label
                    //for="origin_postal_code"
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#302D38] text-white transform translate-x-2.5 -translate-y-1.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Pickup
                  </label>
                  <input
                    required
                    // autocomplete="off"
                    className="w-full h-14 px-3 py-2 text-sm rounded-xl bg-[#302D38] border border-[#938f99] outline-none transition-all"
                    placeholder="Origin Zip or City"
                    name="origin_postal_code"
                    id="origin_postal_code"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div>
              <div className="w-full">
                <div className="mb-4 relative top-0">
                  <label
                    //for="destination_postal_code"
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#302D38] text-white transform translate-x-2.5 -translate-y-1.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Delivery
                  </label>
                  <input
                    required
                    // autocomplete="off"
                    className="w-full h-14 px-3 py-2 text-sm rounded-xl bg-[#302D38] border border-[#938f99] outline-none transition-all"
                    placeholder="Destination Zip or City"
                    name="destination_postal_code"
                    id="destination_postal_code"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div>
              <div className="w-full">
                <div className="mb-4 relative top-0">
                  <label
                    //for="ship_date"
                    className="absolute px-3 py-2 text-sm rounded-xl bg-[#302D38] text-white transform translate-x-2.5 -translate-y-1.5 scale-[0.75] origin-[left_top] transition-all"
                  >
                    Ship Date
                  </label>
                  <input
                    required
                    // autocomplete="off"
                    className="w-full h-14 px-3 py-2 text-sm rounded-xl bg-[#302D38] border border-[#938f99] outline-none transition-all"
                    placeholder="Ship date"
                    name="ship_date"
                    id="ship_date"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between gap-1">
          <button
            id="1"
            className="w-full px-6 py-3 bg-[#DEE0FF] text-[#302D38] rounded-full"
            type="button"
          >
            Next step
          </button>
        </div>
      </div>
    </section>
  );
}
