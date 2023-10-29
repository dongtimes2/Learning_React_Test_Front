const Item = ({ item, updateOrderDatas }) => {
  const handleChange = (event) => {
    const count = event.target.value;
    updateOrderDatas("products", item.name, count);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img
        src={`http://localhost:8000${item.imagePath}`}
        alt={`${item.name} product`}
        style={{ width: "100%", height: "200px" }}
      />
      <label htmlFor={item.name}>{item.name}</label>
      <input
        id={item.name}
        type="number"
        min={0}
        defaultValue={0}
        onChange={handleChange}
      />
    </div>
  );
};

export default Item;
