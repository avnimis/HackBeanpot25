import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Add from "./Add";
function AddRestaurant() {
  return (
    <Add
      icon={faUtensils}
      header="Add Restaurant"
      titlePlaceholder="Restaurant Name"
      colorTheme="#3D61A4"
    />
  );
}

export default AddRestaurant;
