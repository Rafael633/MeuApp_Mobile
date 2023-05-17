import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  maxWidth: {
    alignSelf: "stretch",
    width: "100%",
    flexDirection: "column"
  },
  containerInner: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containerH: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
  containerTopo: {
    flexBasis: "80%",
  },
  containerBaixo: {
    flexBasis: "20%",
  },
  image: {
    minWidth: 300,
    height: 300,
  },
  textCenter: {
    textAlign: "center",

  }
});

export default styles;
