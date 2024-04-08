import ComponentList from "./ComponentList";
import DeleteButton from "./DeleteButton";
import AddHotel from "./forms/AddHotel";
import EditHotel from "./forms/EditHotel";
import "./EditPageUI.css";

function EditHotelsPageUI({
  hotelToAdd,
  setHotelToAdd,
  addHotel,
  editHotel,
  deleteHotel,
  hotelAddAlertMessage,
  hotels,
  cities,
  hotelToEdit,
  setHotelToEdit,
  setHotelIdToEdit,
}) {
  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setHotelIdToEdit(selectedItem.id);
    setHotelToEdit(hotels.find((x) => x.id === selectedItem.id));
  };

  return (
    <div className="edit-page-container">
      <AddHotel
        hotel={hotelToAdd}
        setHotel={setHotelToAdd}
        add={addHotel}
        alertMessage={hotelAddAlertMessage}
        cities={cities}
      />
      <div className="edit-container">
        <ComponentList
          items={hotels.map((x) => ({
            name: `${x.hotel_name}, ${x.hotel_address}`,
            id: x.id,
          }))}
          onSelect={handleSelect}
          title="Готелі"
        />
        <EditHotel
          hotel={hotelToEdit}
          setHotel={setHotelToEdit}
          edit={editHotel}
          hotels={hotels}
          cities={cities}
        />
        <DeleteButton deleteItem={deleteHotel} />
      </div>
    </div>
  );
}
export default EditHotelsPageUI;
