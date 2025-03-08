import * as React from "react";
import { Suspense } from "react";
import QouetFormTwo from "@/component/quotesFromTwo";
import QouetFormThree from "@/component/quotesFromThree";
import ViewQuoteForm from "@/component/driverFormQoutes";

export interface IAppProps {}

function App(props: IAppProps) {
  return (
    <>
      <Suspense>
        <ViewQuoteForm />
        <QouetFormThree />
      </Suspense>
    </>
  );
}

export default App;
