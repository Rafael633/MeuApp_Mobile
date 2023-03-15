import { Image, Text, View } from "react-native";
import styles from "../utils/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexBasis: "80%",
        }}
      >
        <Image
          source={{
            uri: "https://picsum.photos/300/300",
          }}
          style={{
            minWidth: "300px",
            height: "300px",
          }}
        />
      </View>
      <Text
        style={{
          color: "tomato",
          fontSize: "34px",
        }}
      >
        Hola, bem vindo ao meu app
      </Text>
      <Aviso />
    </View>
  );
}

// é um componente em React Native
function Aviso() {
  return (
    <View style={{ backgroundColor: "yellow" }}>
      <Text>Oi eu sou um aviso!</Text>
    </View>
  );
}
