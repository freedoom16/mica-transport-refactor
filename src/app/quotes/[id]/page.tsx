"use client";
import QouetFormTwo from "@/component/quotesFromTwo";
import QouetFormThree from "@/component/quotesFromThree";

import * as React from "react";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div>
      <QouetFormTwo />
      <QouetFormThree />
    </div>
  );
}
