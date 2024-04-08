import { useState } from "react";
import ListItem from "./ListItem";

const ComponentList = ({ items, onSelect, title }) => {
  // items is an array of objects containing name and id properties
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>{title}</h3>

      <div
        style={{
          cursor: "pointer",
          maxHeight: "40vh",
          overflow: "scroll",
          border: "1px solid gray",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        {items.map((item, index) => (
          <ListItem
            key={index}
            name={item.name}
            onSelect={() => handleSelect(item)}
            isSelected={selectedItem === item}
          />
        ))}
      </div>
    </div>
  );
};

export default ComponentList;
