import { Text, View } from "react-native";
import styles from "../utils/styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactScreen() {
  const [nomeDaPessoa, setNomeDaPessoa] = useState("")

  useEffect(() => {
    // pega o usuário do AsyncStorage
    AsyncStorage.getItem("usuario")
      // resolve a promessa
      .then((retorno) => {
        // transforma o JSON em objeto
        const usuario = JSON.parse(retorno)
        // seta o nome da pessoa na variável de estado
        setNomeDaPessoa(usuario.nomeDaPessoa)
      })
  }, [])

  return (
    <View
      style={styles.container}
    >
      <Text>Oi sou a página de contato, {nomeDaPessoa}</Text>
    </View>
  );
}
