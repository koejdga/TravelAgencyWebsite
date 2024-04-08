import ComponentList from "./ComponentList";
import EditCountry from "./forms/EditCountry";
import AddCountry from "./forms/AddCountry";
import "./EditPageUI.css";
import DeleteButton from "./DeleteButton";

function EditCountriesPageUI({
  countryToAdd,
  setCountryToAdd,
  addCountry,
  editCountry,
  deleteCountry,
  countryAddAlertMessage,
  countries,
  countryToEdit,
  setCountryToEdit,
  setCountryIdToEdit,
}) {
  const handleSelect = (selectedItem) => {
    setCountryIdToEdit(selectedItem.id);
    setCountryToEdit(countries.find((x) => x.id === selectedItem.id));
  };

  return (
    <div className="edit-page-container">
      <AddCountry
        country={countryToAdd}
        setCountry={setCountryToAdd}
        add={addCountry}
        alertMessage={countryAddAlertMessage}
      />
      <div className="edit-container">
        <ComponentList
          items={countries.map((x) => ({ name: x.country_name, id: x.id }))}
          onSelect={handleSelect}
          title="Країни"
        />
        <EditCountry
          country={countryToEdit}
          setCountry={setCountryToEdit}
          edit={editCountry}
          countries={countries}
        />
        <DeleteButton deleteItem={deleteCountry} />
      </div>
    </div>
  );
}
export default EditCountriesPageUI;
