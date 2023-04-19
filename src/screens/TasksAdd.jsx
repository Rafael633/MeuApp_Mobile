import { View } from "react-native-web";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";
import { Text, TextInput } from "react-native-paper";
import { useState } from "react";

const tarefas = collection(
  getFirestore(app), "tarefas"
);

export default function TasksAdd() {
  const [task, setTask] = useState("");

  function saveTask(newTask) {
    console.log("Salvando tarefa", newTask);
    addDoc(tarefas, {
      titulo: newTask,
      concluida: false,
    })
      .then((docRef) => {
        console.log("Tarefa salva com sucesso", docRef.id);
      })
      .catch((error) => {
        console.log("Erro ao salvar tarefa", error);
      })
  }

  function handleAddTask() {
    console.log("Adicionando tarefa");
    if (task.trim() != "") {
      saveTask(task);
    }
  }

  return (
    <View>
      <Text>Adicionar tarefa</Text>
      <TextInput
        label="Adicionar tarefa"
        mode="flat"
        value={task}
        onChangeText={setTask}
        right={
          <TextInput.Icon
            icon="plus"
            size={20}
            style={{ marginRight: 10 }}
            containerColor="lightgray"
            onPress={handleAddTask}
          />
        }
      />
    </View>
  )
}