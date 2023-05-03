import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { View } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { db } from "../config/firebase"
import styles from "../utils/styles"

export default function AulaTasksAdicionar() {
    const [tarefa, setTarefa] = useState('')

    const tarefasRef = collection(db, "tarefas")

    function handleAddTask() {
        console.log(tarefa)
        const data = {
            nomeDaTarefa: tarefa
        }

        addDoc(tarefasRef, data)
            .then((docRef) => {
                console.log("Tarefa Adicionar com a ID: ", docRef.id)
            })
            .catch(
                (error) => console.log(error)
            )
    }

    return (
        <View
            style={styles.container}
        >
            <Text>Adicionar Tarefa</Text>
            <TextInput
                label="Tarefa"
                mode="outlined"
                value={tarefa}
                onChangeText={setTarefa}
                right={
                    <TextInput.Icon
                        icon="plus"
                        size={28}
                        onPress={handleAddTask}
                    />
                }
            />
        </View>
    )
}