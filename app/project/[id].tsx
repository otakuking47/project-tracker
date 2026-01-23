//ths file shows the details of a specific project, allowing users to view and manage tasks within that project.

import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { loadProjects, saveProjects } from "@/storage/projectStorage";
import { TextInput, Button } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { todayISO } from "@/utils/date";
import { Project } from "@/types/Project";
import { useNavigation } from "@react-navigation/native";

export default function ProjectDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [project, setProjects] = useState<Project | null>(null);
  const [taskText, setTaskText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Project Details",
    });
  });

  useEffect(() => {
    loadProjects().then((projects) => {
      const updated = projects.map((p) =>
        p.id === id ? { ...p, lastTouchedAt: todayISO() } : p,
      );

      saveProjects(updated);
      setProjects(updated.find((p) => p.id === id) || null);
    });
  }, [id]);

  if (!project) {
    return <Text>Loading project...</Text>;
  }

  project.lastTouchedAt = todayISO();
//TODO: Add functionality to edit project details and style the delete component better.
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{project.title}</Text>

      <Text>{project.progress}% complete</Text>

      <Text style={{ marginTop: 20, fontSize: 18 }}>Tasks</Text>

      <TextInput
        placeholder="New task"
        value={taskText}
        onChangeText={setTaskText}
        style={{
          borderWidth: 1,
          padding: 8,
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <Button
        title="Add Task"
        onPress={async () => {
          if (!taskText.trim()) return;

          const projects = await loadProjects();

          const updated = projects.map((p) => {
            const taskLength = p.tasks.length;
            const completedTasks = p.tasks.filter((t) => t.done ).length;

            return p.id === id
                ? {
                    ...p,
                    progress: Math.round((completedTasks / (taskLength + 1)) * 100),
                    tasks: [
                      ...p.tasks,
                      {
                        id: Date.now().toString(),
                        text: taskText,
                        done: false,
                      },
                    ],
                  }
                : p;
          });

          await saveProjects(updated);
          setProjects(updated.find((p) => p.id === id) || null);
          setTaskText("");
        }}
      />

      <View style={styles.container}>
        <FlatList
        data={project.tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No tasks yet. Add one.</Text>}
        renderItem={({ item }) => (
          <Pressable
            onPress={async () => {
              const projects = await loadProjects();
              const updated = projects.map((p) => {
                if (p.id !== id) return p;

                const tasks = p.tasks.map((t) =>
                  t.id === item.id ? { ...t, done: !t.done } : t,
                );

                const completed = tasks.filter((t) => t.done).length;

                return {
                  ...p,
                  tasks,
                  progress:
                    tasks.length === 0
                      ? 0
                      : Math.round((completed / tasks.length) * 100),
                };
              });

              await saveProjects(updated);
              setProjects(updated.find((p) => p.id === id) || null);
            }}
          >
            <Text
              style={{
                textDecorationLine: item.done ? "line-through" : "none",
                fontSize: 16,
                padding: 8,
                backgroundColor: item.done ? "#d3ffd3" : "#ffd3d3",
                marginBottom: 2,
                borderRadius: 4,
                marginTop: 10,
              }}
            >
              {item.text}
            </Text>
          
            <Button 
              title="Delete"
              onPress={async () => {
                const projects = await loadProjects();
                const updated = projects.filter((p) => {
                  const numtasks = p.tasks.length - 1;
                  const completedTasks = p.tasks.filter((t) => t.done && t.id !== item.id).length;

                  if (p.id !== id) return p;
                  p.progress = numtasks === 0 ? 0 : Math.round((completedTasks / numtasks) * 100);
                  p.tasks = p.tasks.filter((t) => t.id !== item.id);
                  return p;
                });
                await saveProjects(updated);
                setProjects(updated.find((p) => p.id === id) || null);
              }}
            />
          </Pressable>
        )}
      />
      </View>
    </View>
  );
}

// stylesheet for the component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});