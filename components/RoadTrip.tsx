import { View, Text, StyleSheet, Pressable} from "react-native";
import { Link } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
enum Status {
    Active,
    Completed,
    Cancelled,
};
  
export type RoadTripData = {
    id: string,
    title: string,
    status: Status,
    progress: number,
    startDate: string,
    endDate: string,
};

function RoadTrip(roadTripData: RoadTripData) {
  
    const { id, title, status, progress, startDate, endDate } = roadTripData;
    const isActive = status === Status.Active;
    const isCompleted = status === Status.Completed;
    const isCancelled = status === Status.Cancelled;
    
    return (
      <Link href={"./roadtrip/${id}"} asChild>
        <Pressable style={styles.container}>
          <View style={styles.topRow}>
            <Text style={styles.title}>{title}</Text>
            <FontAwesomeIcon icon={faCaretRight} size={25} />
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.description}>
              {startDate} - {endDate}
            </Text>
            {isActive ? (
              <Text style={styles.description}>In Progress</Text>
            ) : isCompleted ? (
              <Text style={styles.description}>Completed</Text>
            ) : isCancelled ? (
              <Text style={styles.description}>Cancelled</Text>
            ) : null}
          </View>
        </Pressable>
      </Link>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: "#337357",
    borderBottomWidth: 2,
    width: "100%",
  },
  topRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#2e2d4d",
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 0,
  },
  description: {
    color: "2e2d4d",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 0,
  },
});

export default RoadTrip