import { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "../utils/styles";

/**
 * Componente de Login do usuário
 *
 * @param {*} param0
 * @returns
 */
export default function LoginScreen({ navigation }) {
  // Variável responsável pelo e-mail do usuário
  const [email, setEmail] = useState("");
  // Variável responsável pela senha do usuário
  const [senha, setSenha] = useState("");
  // Variável responsável por mostrar ou não a senha do usuário (em teste)
  const [passwordVisible, setPasswordVisible] = useState(true);
  // Variável responsável por mostrar ou não o erro do usuário
  const [error, setError] = useState("");

  /**
   * Função responsável por fazer o login do usuário
   */
  function handleRegister() {
    console.log("Login usuário");

    // Verifica se o e-mail e a senha são válidos no firebase
    // esta função retorna uma Promise
    // foi importada do firebase/auth
    // note que auth é o primeiro parâmetro
    signInWithEmailAndPassword(auth, email, senha)
      // caso a Promise seja resolvida, o usuário é logado
      .then((userCredential) => {
        //
        console.log(userCredential, "Usuário registrado com sucesso");
        navigation.navigate("MTBNavigation");
      })
      // caso a Promise seja rejeitada, o usuário não é logado
      .catch((error) => {
        setError(error.message); // mostra a mensagem original do Firebase
        const errorCode = error.code; // obtém o código de erro do Firebase
        switch (
        errorCode // verifica qual é o código de erro
        ) {
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
            setError("Ocorreu um erro ao acessar com este e-mail e senha.");
        }
      });
  }

  return (
    <View style={styles.container}>
      <Paragraph>Faça o seu Login</Paragraph>
      <HelperText type="error"> {error} </HelperText>
      <View style={styles.maxWidth}>
        <Paragraph>E-mail</Paragraph>

          <TextInput
            mode="outlined"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.maxWidth}
          />
      </View>
      <View style={styles.maxWidth}>
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
      <View style={{ flexDirection: "row", gap: 15 }}>
        <View style={{ marginTop: 20 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Registrar
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button mode="contained" onPress={handleRegister}>
            Acessar
          </Button>
        </View>
      </View>
    </View>
  );
}
