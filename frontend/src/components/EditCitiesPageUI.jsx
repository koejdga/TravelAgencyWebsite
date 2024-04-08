import AddCity from "./forms/AddCity";
import ComponentList from "./ComponentList";
import EditCity from "./forms/EditCity";
import DeleteButton from "./DeleteButton";
import "./EditPageUI.css";

function EditCitiesPageUI({
  cityToAdd,
  setCityToAdd,
  addCity,
  editCity,
  deleteCity,
  cityAddAlertMessage,
  countries,
  cities,
  cityToEdit,
  setCityToEdit,
  setCityIdToEdit,
}) {
  const handleSelect = (selectedItem) => {
    setCityIdToEdit(selectedItem.id);
    setCityToEdit(cities.find((x) => x.id === selectedItem.id));
  };

  return (
    <div className="edit-page-container">
      <AddCity
        city={cityToAdd}
        setCity={setCityToAdd}
        add={addCity}
        alertMessage={cityAddAlertMessage}
        countries={countries}
      />
      <div className="edit-container">
        <ComponentList
          items={cities.map((x) => ({ name: x.city_name, id: x.id }))}
          onSelect={handleSelect}
          title="Міста"
        />
        <EditCity
          city={cityToEdit}
          setCity={setCityToEdit}
          edit={editCity}
          countries={countries}
        />
        <DeleteButton deleteItem={deleteCity} />
      </div>
    </div>
  );
}
export default EditCitiesPageUI;
