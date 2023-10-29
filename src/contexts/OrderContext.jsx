import { createContext, useEffect, useMemo, useState } from "react";

const pricePerItem = {
  products: 1000,
  options: 500,
};

const calculatePrice = (type, orderCounts) => {
  let totalCount = 0;
  for (const count of orderCounts[type].values()) {
    totalCount += count;
  }
  return totalCount * pricePerItem[type];
};

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculatePrice("products", orderCounts);
    const optionsTotal = calculatePrice("options", orderCounts);
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    const updateOrderDatas = (type, name, count) => {
      const newOrderCounts = { ...orderCounts };
      newOrderCounts[type].set(name, Number(count));
      setOrderCounts({ ...newOrderCounts });
    };

    const resetOrderDatas = () => {
      setOrderCounts({
        products: new Map(),
        options: new Map(),
      });
    };

    return [{ ...orderCounts, totals }, updateOrderDatas, resetOrderDatas];
  }, [orderCounts, totals]);

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
