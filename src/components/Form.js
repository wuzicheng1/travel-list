import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState(""); //初数state为空
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    console.log(newItem);
  } //去除event的刷新效果

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/* 监听提交并且去除event的刷新效果 */}
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description} //将HTML储存值交由React管理（state）
        onChange={(e) => {
          setDescription(e.target.value);
        }} //事件的目标上调用setDescription()
      />
      <button>Add</button>
    </form>
  );
}
