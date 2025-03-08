import { Suspense } from "react";

import * as React from "react";
import QouetFormTwo from "@/component/quotesFromTwo";
import ViewQuoteForm from "@/component/driverForm";
import ViewQuoteForm1 from "@/component/driverFormQoutes";
import ImageUpload from "@/component/driverUploadImage";

export interface IAppProps {}

function App(props: IAppProps) {
  return (
    <>
      <Suspense>
        <ViewQuoteForm1 />
        <ViewQuoteForm />
        <ImageUpload />
      </Suspense>
    </>
  );
}

export default App;
