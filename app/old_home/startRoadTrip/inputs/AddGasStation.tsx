import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import Add from "./Add";
function AddGasStation() {
  return (
    <Add
      icon={faGasPump}
      header="Add Gas Station"
      titlePlaceholder="Gas Station Name"
    />
  );
}

export default AddGasStation;
