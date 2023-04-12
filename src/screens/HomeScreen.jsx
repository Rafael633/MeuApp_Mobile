import { Image, Text, useColorScheme, View } from "react-native";
import styles from "../utils/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://picsum.photos/300/300",
          }}
          style={styles.image}
        />
      </View>
      <Text>Hola, bem vindo ao meu app</Text>
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
