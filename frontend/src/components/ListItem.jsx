import "./ListItem.css";

const ListItem = ({ name, onSelect, isSelected }) => {
  return (
    <div
      onClick={onSelect}
      className={`item ${isSelected ? "selected" : "not-selected"}`}
    >
      {name}
    </div>
  );
};

export default ListItem;
