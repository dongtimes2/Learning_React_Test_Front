import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";

const CompletePage = ({ setStep }) => {
  const [orderDatas, , resetOrderDatas] = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    resetOrderDatas();
    setStep(0);
  };

  const loadOrderData = async (orderDatas) => {
    try {
      const response = await axios.post("http://localhost:8000/order", {
        orderDatas,
      });
      setResponse({ ...response.data });
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData(orderDatas);
  }, [orderDatas]);

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <>
      {isLoading ? (
        <>
          <p>로딩중</p>
        </>
      ) : (
        <>
          <h1>주문이 성공했습니다.</h1>
          <h2>지금까지 모든 주문</h2>
          <table>
            <thead>
              <tr>
                <th>number</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{response.orderNumber}</td>
                <td>{response.price}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleClick}>첫 페이지로 가기</button>
        </>
      )}
    </>
  );
};

export default CompletePage;
