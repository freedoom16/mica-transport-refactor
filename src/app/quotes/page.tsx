"use client";
import * as React from "react";
import QouetFormTwo from "@/component/quotesFromTwo";
import QouetFormThree from "@/component/quotesFromThree";

export interface IAppProps {}

function App(props: IAppProps) {
  return (
    <>
      <div>
        <QouetFormTwo />
        <QouetFormThree />
      </div>
    </>
  );
}

export default App;
