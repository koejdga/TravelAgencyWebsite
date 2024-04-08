import ComponentList from "./ComponentList";
import DeleteButton from "./DeleteButton";
import AddTrip from "./forms/AddTrip";
import EditTrip from "./forms/EditTrip";
import "./EditPageUI.css";

function EditTripsPageUI({
  tripToAdd,
  setTripToAdd,
  addTrip,
  editTrip,
  deleteTrip,
  tripAddAlertMessage,
  trips,
  hotels,
  restaurants,
  cities,
  tripToEdit,
  setTripToEdit,
  setTripIdToEdit,
}) {
  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setTripIdToEdit(selectedItem.id);
    setTripToEdit(trips.find((x) => x.id === selectedItem.id));
  };

  return (
    <div className="edit-page-container">
      <AddTrip
        trip={tripToAdd}
        setTrip={setTripToAdd}
        add={addTrip}
        alertMessage={tripAddAlertMessage}
        hotels={hotels}
        restaurants={restaurants}
        cities={cities}
      />
      <div className="edit-container">
        <ComponentList
          items={trips.map((x) => ({
            name: x.trip_name,
            id: x.id,
          }))}
          onSelect={handleSelect}
          title="Поїздки"
        />
        <EditTrip
          trip={tripToEdit}
          setTrip={setTripToEdit}
          edit={editTrip}
          trips={trips}
          hotels={hotels}
          restaurants={restaurants}
          cities={cities}
        />
        <DeleteButton deleteItem={deleteTrip} />
      </div>
    </div>
  );
}
export default EditTripsPageUI;
