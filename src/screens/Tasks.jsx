import { Text } from "react-native-paper";
import { View } from "react-native";
import styles from "../utils/styles";
import TasksAdd from "./TasksAdd";
import TasksList from "./TasksList";

export default function Tasks() {
  return (
    <View style={styles.containerH}>
      <View style={styles.containerTopo}>
        <TasksList />
      </View>
      <View style={styles.containerBaixo}>
        <TasksAdd />
      </View>
    </View>
  );
}
