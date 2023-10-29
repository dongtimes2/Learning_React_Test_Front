import { useContext } from "react";
import Options from "./components/Options";
import Products from "./components/Products";
import { OrderContext } from "../../contexts/OrderContext";

const OrderPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);

  return (
    <>
      <h1>Travel Products</h1>
      <Products />
      <Options />
      <div>
        <h2>{`Final Price: ${orderDatas.totals.total} 원`}</h2>
        <button onClick={() => setStep(1)}>주문하기</button>
      </div>
    </>
  );
};

export default OrderPage;
