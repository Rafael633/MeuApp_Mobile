import { Image, Text, View } from "react-native";
import styles from "../utils/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [user, setUser] = useState({});

  useEffect(() => {

    // cria um listener para o estado de autenticação
    const unsub = onAuthStateChanged(
      // primeiro parâmetro é o objeto de autenticação
      auth,
      // segundo parâmetro é a função que será executada quando o estado mudar
      (user) => {
        // existe usuário?
        if (user) {
          console.log(user)
          // seta o usuário na variável de estado user
          setUser({
            userUID: user.uid,
          })
        }
      })
    // forma utilizada para ser chamada ao desmontar o componente
    return () => unsub();

  }, []);// graças a este colchete que simbila a entrada do componente na tela

  useEffect(() => {
    // se não houver usuário logado, não faz nada
    if (!user?.userUID) return

    // selecionar a coleção de usuários
    const usuariosRef = collection(db, "usuarios");

    // começa a construção da query
    const q = query(
      // Primeiro parâmetro é o nome da coleção
      usuariosRef,
      // Segundo parâmetro é a cláusula where
      where("userUID", "==", user.userUID)
    );

    // executa a query
    getDocs(q)
      // resolve a promessa
      .then((querySnapshot) => {
        // se tiver vazio, não faz nada
        if (querySnapshot.empty) return

        // se tiver algum documento, pega o primeiro
        const usuario = querySnapshot.docs[0].data();

        // seta o usuário na variável de estado user
        setUser(usuario)

        AsyncStorage.setItem("usuario", JSON.stringify(usuario))
          .then(() => console.log("Usuário salvo no AsyncStorage"))

      })

    // este colchete escuta a variável user.userUID
  }, [user?.userUID]);

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
      <Text>Hola {user?.nomeDaPessoa}, bem vindo ao meu app</Text>
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
