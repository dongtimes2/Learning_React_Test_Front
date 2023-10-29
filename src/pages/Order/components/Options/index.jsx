import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { OrderContext } from "../../../../contexts/OrderContext";
import ErrorBanner from "../../../../components/ErrorBanner";

const Options = () => {
  const [orderDatas, updateOrderDatas] = useContext(OrderContext);
  const [itemList, setItemList] = useState([]);
  const [isError, setIsError] = useState(false);

  const loadItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/options");
      setItemList([...response.data]);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <>
      <h2>Options</h2>
      <p>{`Options total price: ${orderDatas.totals.options}`} 원</p>
      <div>
        {itemList.map((item) => (
          <Item
            key={item.name}
            item={item}
            updateOrderDatas={updateOrderDatas}
          />
        ))}
      </div>
    </>
  );
};

export default Options;
