import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import { auth, db } from "../config/firebase";
import styles from "../utils/styles";
export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState("");

  function handleRegister() {
    console.log("Registrando usuário");
    if (checkIfPasswordsMatch()) {
      console.log("As senhas coincidem");
    } else {
      console.log("As senhas não coincidem");
    }
    if (checkPasswordLenght()) {
      console.log("As senhas são grandonas");
    } else {
      console.log("As senhas são muito pequenas");
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log(userCredential, "Usuário registrado com sucesso");

        // Agora podemos adicionar mais dados ao banco de dados
        // primeiro selecionamos a coleção qual desejamos
        const collectionRef = collection(db, "usuarios");

        // agora criamos um objeto com os dados que desejamos adicionar
        // neste caso, o email do usuário e o uid do usuário
        const dadosParaAdicionar = {
          emailUsuario: email,
          uid: userCredential.user.uid,
        }

        // agora podemos adicionar um documento a esta coleção
        // o primeiro parâmetro é a coleção que desejamos
        // o segundo parâmetro é um objeto com os dados que desejamos adicionar
        const docRef = addDoc(
          collectionRef,
          dadosParaAdicionar
        ).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
          console.error("Error adding document: ", error);
        }).finally(() => {
          navigation.navigate("LoginScreen");
        });
      })
      .catch((error) => {
        setError(error.message); // mostra a mensagem original do Firebase
        const errorCode = error.code; // obtém o código de erro do Firebase

        // verifica qual é o código de erro
        switch (errorCode) {
          case "auth/email-already-in-use":
            setError("Esse email já está em uso por outro usuário."); // mostra uma mensagem humanizada
            break;
          case "auth/invalid-email":
            setError("Esse email não é válido.");
            break;
          case "auth/weak-password":
            setError("Essa senha é muito fraca.");
            break;
          default:
            setError("Ocorreu um erro ao registrar o usuário." + error.message);
        }
      });
  }

  function checkIfPasswordsMatch() {
    return senha === confirmarSenha;
  }

  function checkPasswordLenght() {
    return senha.length >= 6;
  }

  return (
    <View style={styles.container}>
      <Paragraph>Faça o seu Registro - v2</Paragraph>
      <HelperText type="error"> {error} </HelperText>
      <View>
        <Paragraph>E-mail</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.maxWidth}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Paragraph>Senha</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={passwordVisible}
          style={styles.maxWidth}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Paragraph>Confirme sua Senha</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Confirme a Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={passwordVisible}
          style={styles.maxWidth}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <HelperText type="error" visible={!checkIfPasswordsMatch}>
          Não conferem
        </HelperText>
      </View>
      <View>
        <Button mode="contained" onPress={handleRegister}>
          Registrar
        </Button>
      </View>
    </View>
  );
}
