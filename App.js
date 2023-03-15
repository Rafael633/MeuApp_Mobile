import { Provider as PaperProvider } from "react-native-paper";
import RootNavigation from "./src";

export default function App() {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
}
