import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width * .95;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  maxWidth: {
    width: width,
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
});

export default styles;
