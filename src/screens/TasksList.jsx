import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { app } from "../config/firebase";
import { List } from "react-native-paper";

const tarefasRef = collection(getFirestore(app), "tarefas");

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(tarefasRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <List.Item
        title={item.name}
        data={tasks}
        description={item.name}
        left={(props) => <List.Icon {...props} icon="check" />}
      />
    </View>
  );

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScrollView>
  );
}
