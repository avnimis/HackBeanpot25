import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { Href, Link, router } from "expo-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface HeaderProps {
    title: string;
    navItems: Array<[string, Href]>;
    colorTheme?: string;
}
function Header({ title, navItems, colorTheme }: HeaderProps) {
  return (
      <View style={[styles.header, { backgroundColor: colorTheme }]}>
          <Text style={styles.headerText}>{title}</Text>
          <Pressable style={styles.backButton} onPress={() => { router.canGoBack() ? router.back() : console.log("No valid stack history.") }}>
              <FontAwesomeIcon icon={faArrowLeft} size={24} color="#FFF" />
          </Pressable>
      <FlatList
        data={navItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
            <Link style={styles.navItem}  href={item[1]} asChild>
            <Text >{item[0]}</Text>
          </Link>
              )}
              horizontal={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "15%",
    width: "100%",
  },
  headerText: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 400,
      paddingBottom: 10,
      paddingTop: 20,
    marginTop: 30,
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
      marginHorizontal: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      backgroundColor: "#449078",
      color: "#FFF",
      fontFamily: "Inter",
      fontSize: 14,
      fontStyle: "normal",
        fontWeight: 500,
        height: "35%",
        marginTop: 20,
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 50,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#449078",
        zIndex: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
  }
);

export default Header