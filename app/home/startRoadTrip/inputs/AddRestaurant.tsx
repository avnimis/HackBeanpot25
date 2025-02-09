import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Add from "./Add";
function AddRestaurant() {
  return (
    <Add
      icon={faUtensils}
      header="Add Restaurant"
      titlePlaceholder="Restaurant Name"
    />
  );
}

export default AddRestaurant;
