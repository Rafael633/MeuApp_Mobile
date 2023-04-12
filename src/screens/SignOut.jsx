import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function SignOut() {
  const navigation = useNavigation();
  signOut(auth)
    .then(() => {
      navigation.navigate("SplashScreen");
    })
    .catch((error) => {
      console.log("Algo deu errado.");
      return false;
    });
}
