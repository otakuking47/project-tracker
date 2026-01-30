//this allows me to create a new project

import { View, Text, TextInput, Button } from "react-native";
import { useState, useLayoutEffect, use } from "react";
import { useRouter } from "expo-router";
import { loadProjects, saveProjects } from "@/storage/projectStorage";
import { Project } from "@/types/Project";
import { todayISO } from "@/utils/date";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function NewProjectScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const navigation = useNavigation();

  if (!id) {
    useLayoutEffect(() => {
      navigation.setOptions({
        title: "New Project",
      });
    }, [navigation]);

    async function createProject() {
      if (!title.trim()) return;

      const projects = await loadProjects();

      const newProject: Project = {
        id: Date.now().toString(), // may change this
        title,
        progress: 0,
        lastTouchedAt: todayISO(),
        tasks: [],
      };

      const updated = [newProject, ...projects];
      await saveProjects(updated);

      router.back();
    }

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          placeholder="Project title"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 6,
          }}
        />
        <Button title="Create Project" onPress={createProject} />
      </View>
    );
  } else {
    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Edit Project",
      });
    }, [navigation]);

    async function editProject() {
        const projects = await loadProjects();

        const updated = projects.map((p) =>
          p.id === id ? { ...p, title } : p,
        ); 
        await saveProjects(updated);

        router.back();
    }
    return (
        <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          placeholder="new project title"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 6,
          }}
        />
        <Button title="Edit Project" onPress={editProject} />
      </View>
    )
  }
}
