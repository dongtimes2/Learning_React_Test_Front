import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { OrderContext } from "../../../../contexts/OrderContext";
import ErrorBanner from "../../../../components/ErrorBanner";

const Products = () => {
  const [orderDatas, updateOrderDatas] = useContext(OrderContext);
  const [itemList, setItemList] = useState([]);
  const [isError, setIsError] = useState(false);

  const loadItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
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
      <h2>Products</h2>
      <p>{`Products total price: ${orderDatas.totals.products}`} 원</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "5px",
          width: "100%",
        }}
      >
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

export default Products;
