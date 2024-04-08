import ComponentList from "./ComponentList";
import DeleteButton from "./DeleteButton";
import AddRestaurant from "./forms/AddRestaurant";
import EditRestaurant from "./forms/EditRestaurant";
import "./EditPageUI.css";

function EditRestaurantsPageUI({
  restaurantToAdd,
  setRestaurantToAdd,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
  restaurantAddAlertMessage,
  restaurants,
  cities,
  restaurantToEdit,
  setRestaurantToEdit,
  setRestaurantIdToEdit,
}) {
  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setRestaurantIdToEdit(selectedItem.id);
    setRestaurantToEdit(restaurants.find((x) => x.id === selectedItem.id));
  };

  return (
    <div className="edit-page-container">
      <AddRestaurant
        restaurant={restaurantToAdd}
        setRestaurant={setRestaurantToAdd}
        add={addRestaurant}
        alertMessage={restaurantAddAlertMessage}
        cities={cities}
      />
      <div className="edit-container">
        <ComponentList
          items={restaurants.map((x) => ({
            name: `${x.restaurant_name}, ${x.restaurant_address}`,
            id: x.id,
          }))}
          onSelect={handleSelect}
          title="Ресторани"
        />
        <EditRestaurant
          restaurant={restaurantToEdit}
          setRestaurant={setRestaurantToEdit}
          edit={editRestaurant}
          restaurants={restaurants}
          cities={cities}
        />
        <DeleteButton deleteItem={deleteRestaurant} />
      </div>
    </div>
  );
}
export default EditRestaurantsPageUI;
