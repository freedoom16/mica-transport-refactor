"use client";
import QouetFormTwo from "@/component/formDisplay/quotesFromTwo";
import QouetFormThree from "@/component/formDisplay/quotesFromThree";

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
