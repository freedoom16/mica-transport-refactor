// pages/api/cars.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const loc = require("list-of-cars");

  loc.getListSync(); // Decompress the dataset
  const makes = loc.getCarMakes();
  const carsByMake = loc.getCarsByMakeObj();

  res.status(200).json({ makes, carsByMake });
}
