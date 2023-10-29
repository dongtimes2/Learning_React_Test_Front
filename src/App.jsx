import { useState } from "react";
import OrderPage from "./pages/Order";
import { OrderContextProvider } from "./contexts/OrderContext";
import SummaryPage from "./pages/Summary";
import CompletePage from "./pages/Complete";

const App = () => {
  const [step, setStep] = useState(0);

  return (
    <OrderContextProvider>
      {step === 0 && <OrderPage setStep={setStep} />}
      {step === 1 && <SummaryPage setStep={setStep} />}
      {step === 2 && <CompletePage setStep={setStep} />}
    </OrderContextProvider>
  );
};

export default App;
