import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Add from "./Add";
function AddAttraction() {
    return (
      <Add
        titlePlaceholder="Attraction Title"
        header="Add Attraction"
        icon={faCamera}
        colorTheme="#7C6095"
      />
    );
}

export default AddAttraction