import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);
  const [isChecked, setIsChecked] = useState(false);

  const ProductList = Array.from(orderDatas.products);
  const OptionList = Array.from(orderDatas.options);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <h1>주문확인</h1>
      <div>
        <h2>{`Products: ${orderDatas.totals.products}`} 원</h2>
        <ul>
          {ProductList.map(([name, count]) => (
            <li key={name}>{`${count} ${name}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>{`Options: ${orderDatas.totals.options}`} 원</h2>
        <ul>
          {OptionList.map(([name]) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <label htmlFor="check">주문하려는 것을 확인하셨나요?</label>
          <input id="check" type="checkbox" onChange={handleChange} />
        </div>
        <button disabled={!isChecked} onClick={() => setStep(2)}>
          주문확인
        </button>
      </div>
    </>
  );
};

export default SummaryPage;
