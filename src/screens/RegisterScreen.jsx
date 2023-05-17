import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { auth, db } from "../config/firebase";
import styles from "../utils/styles";
export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  // variável de CEP
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [bairro, setBairro] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState(
    {
      padrao: false,
      cep: false,
      endereco: false,
      cidade: false,
      estado: false,
      bairro: false,
      telefone: false,
      email: false,
      senha: false,
      confirmarSenha: false,
    }
  );

  function handleCep() {
    setError("");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => (response.json()))
      .then((data) => {
        setBairro(data.bairro);
        setEstado(data.uf);
        setCidade(data.localidade);
        setEndereco(data.logradouro);
        console.log(endereco)
      })
      .catch((error) => {
        console.log("Erro: ", error)
        setError("CEP Inválido");
      })
  }

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

        const userUID = userCredential.user.uid;

        // selecionar a coleção "tabela" que vamos trabalhar
        const collectionRef = doc(db, "usuarios", userUID);

        const dadosParaInserir = {
          nomeDaPessoa: nome,
          telefoneDaPessoa: telefone,
          cepDaPessoa: cep,
          enderecoDaPessoa: endereco,
          cidadeDaPessoa: cidade,
          estadoDaPessoa: estado,
          bairroDaPessoa: bairro,
          emailDaPessoa: email,
          userUID: userUID
        }

        // faço a inserção dos dados na tabela "usuarios"
        const docRef = setDoc(collectionRef, dadosParaInserir)
          .then((docRef) => {
            console.log("Documento inserido com sucesso: ", docRef);
            navigation.navigate("LoginScreen");
          })
          .catch((error) => {
            console.log("Erro ao inserir o documento: ", error);
          });
      })
      .catch((errorRes) => {
        setError({ ...error, padrao: errorRes.message }); // mostra a mensagem original do Firebase
        const errorCode = errorRes.code; // obtém o código de erro do Firebase

        // verifica qual é o código de erro
        switch (errorCode) {
          case "auth/email-already-in-use":
            setError(
              {
                ...error,
                email: "Esse email já está em uso por outro usuário."
              }
            ); // mostra uma mensagem humanizada
            break;
          case "auth/invalid-email":
            setError(
              {
                ...error,
                email: "Esse email não é válido."
              }
            );
            break;
          case "auth/weak-password":
            setError(
              {
                ...error,
                senha: "Essa senha é muito fraca."
              }
            );
            break;
          default:
            setError(
              {
                ...error,
                padrao: "Ocorreu um erro ao registrar o usuário." + error.message
              }
            );
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
    <ScrollView style={styles.containerInner}>
      <HelperText type="error"> {error.padrao} </HelperText>
      <View>
        {error.nome && <HelperText type="error">{error.nome}</HelperText>}
        <TextInput
          mode="outlined"
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          style={styles.maxWidth}
        />
      </View>
      <View>
        {error.cep && <HelperText type="error">{error.cep}</HelperText>}
        <TextInput
          mode="outlined"
          placeholder="Digite seu CEP"
          value={cep}
          onChangeText={setCep}
          style={styles.maxWidth}
          onBlur={handleCep}
        />
      </View>
      <View>
        {error.endereco && <HelperText type="error">{error.endereco}</HelperText>}
        <TextInput
          mode="outlined"
          placeholder="Digite o endereço"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.maxWidth}
        />
      </View>
      <View>
        {error.bairro && <HelperText type="error">{error.bairro}</HelperText>}
        <TextInput
          mode="outlined"
          placeholder="Digite o Bairro"
          value={bairro}
          onChangeText={setBairro}
          style={styles.maxWidth}
        />
      </View>
      <View>
        {error.cidade && <HelperText type="error">{error.cidade}</HelperText>}
        {error.estado && <HelperText type="error">{error.estado}</HelperText>}
        <View
          style={{
            ...styles.maxWidth,
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <TextInput
            mode="outlined"
            placeholder="Digite a Cidade"
            value={cidade}
            onChangeText={setCidade}
            style={{ alignSelf: "stretch", flexBasis: "60%" }}
          />
          <TextInput
            mode="outlined"
            placeholder="Digite o Estado"
            value={estado}
            onChangeText={setEstado}
            style={{ alignSelf: "stretch", flexBasis: "38%" }}
          />
        </View>
      </View>
      <View>
        {error.telefone && <HelperText type="error">{error.telefone}</HelperText>}
        <TextInput
          mode="outlined"
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
          style={styles.maxWidth}
        />
      </View>
      <View>
        {error.email && <HelperText type="error">{error.email}</HelperText>}
        <TextInput
          mode="outlined"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.maxWidth}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        {error.senha && <HelperText type="error">{error.senha}</HelperText>}
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
    </ScrollView>
  );
}
