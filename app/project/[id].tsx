import { View, Text, Pressable, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { loadProjects, saveProjects } from "@/storage/projectStorage";
import { TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { todayISO } from "@/utils/date";
import { Project } from "@/types/Project";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  //const router = useRouter();
  const [project, setProjects] = useState<Project | null>(null);
  const [taskText, setTaskText] = useState("")

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
          borderRadius: 6,
        }}
      />

      <Button
        title="Add Task"
        onPress={async ()=> {
          if (!taskText.trim()) return;

          const projects = await loadProjects();
          const updated = projects.map((p) =>
            p.id === id
              ? {
                ...p,
                tasks: [
                  ...p.tasks,
                  {
                    id: Date.now().toString(),
                    text: taskText,
                    done: false,
                  },
                ],
              }
              : p
            );

            await saveProjects(updated);
            setProjects(
              updated.find((p) => p.id === id) || null
            );
            setTaskText("");
        }}
      />

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
              }}
            >
              {item.text}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
