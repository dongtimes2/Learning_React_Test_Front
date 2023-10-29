const Item = ({ item, updateOrderDatas }) => {
  const handleChange = (event) => {
    const isChecked = event.target.checked ? 1 : 0;
    updateOrderDatas("options", item.name, isChecked);
  };

  return (
    <div>
      <input
        id={`${item.name} option`}
        type="checkbox"
        onChange={handleChange}
      />
      <label htmlFor={`${item.name} option`}>{item.name}</label>
    </div>
  );
};

export default Item;
