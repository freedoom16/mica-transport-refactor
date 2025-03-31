import { Suspense } from "react";

import * as React from "react";
import QouetFormTwo from "@/component/formDisplay/quotesFromTwo";
import ViewQuoteForm from "@/component/formDisplay/driverForm";
import ViewQuoteForm1 from "@/component/formDisplay/driverFormQoutes";
import ImageUpload from "@/component/formDisplay/driverUploadImage";
import QuoteFormDisplayOne from "@/component/formDisplay/quotesFormDisplayOne";

export interface IAppProps {}

function App(props: IAppProps) {
  return (
    <>
      <Suspense>
        {/* <ViewQuoteForm1 /> */}
        <QuoteFormDisplayOne />

        <ViewQuoteForm />
        <ImageUpload />
      </Suspense>
    </>
  );
}

export default App;
