import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]); //lifted from form

  /*物品的数据需要由packing list组件去渲染:
  {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
    数据的state需要由Form去更新：
  const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
  */

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  } //items是本次state变化之前的上一个数组, lifted from form
  //

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
