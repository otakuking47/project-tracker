//this allows me to create a new project

import { View, Text, TextInput, Button } from "react-native";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "expo-router";
import { loadProjects, saveProjects } from "@/storage/projectStorage";
import { Project } from "@/types/Project";
import { todayISO } from "@/utils/date";
import { useNavigation } from "@react-navigation/native";


export default function NewProjectScreen(){
    const router = useRouter();
    const [title, setTitle] = useState("");
    const navigation = useNavigation();
    
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

        router.back(); // takes it back home
    }

    return (
        <View style={{ flex:1, padding:20}}>
            <Text style={{fontSize: 24}}>new Project</Text>
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
}