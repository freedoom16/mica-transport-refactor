import * as React from "react";
import { Suspense } from "react";
import QouetFormThree from "@/component/quotesFromThree";
import QuoteFormDisplayOne from "@/component/formDisplay/quotesFormDisplayOne";

export interface IAppProps {}

function App(props: IAppProps) {
  return (
    <>
      <Suspense>
        <QuoteFormDisplayOne />
        <QouetFormThree />
      </Suspense>
    </>
  );
}

export default App;
