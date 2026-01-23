// this is the home screen that shows all projects

import { Text, View, FlatList, Button } from "react-native";
import { useRouter } from "expo-router";
import ProjectCard from "@/components/projectCard";
import { loadProjects, saveProjects, resetProjects } from "@/storage/projectStorage";
import { useState, useEffect, useLayoutEffect } from "react";
import { Project } from "@/types/Project";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { HeaderTitle } from "@react-navigation/elements";

export default function HomeScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Projects",
      HeaderTitleStyle: { fontSize: 24, fontWeight: "bold" },
    });
  }, [navigation]);

  useFocusEffect(() => {
    loadProjects().then((item) =>{
      setProjects(item)
      setLoaded(true) // this thing is dangerous 
    })
  })

  useEffect(() => {
    if (loaded) {
      saveProjects(projects)
    }
  }, [projects, loaded]);

  if (!loaded) {
    return <Text style={{ paddingLeft:20 }}>Loading...</Text>
  }

  return (
    <View style={{ flex:1, padding: 20, paddingBottom: 50,}}>
      <Button
        title="New Project"
        onPress={() => router.push("/new")}
      />

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            title={item.title}
            progress={item.progress}
            lastTouchedAt={item.lastTouchedAt}
            onPress={() => 
              router.push({
                pathname: "/project/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
      />

      {/* NUKE */}
      <Button
        title="RESET ALL PROJECTS"
        color="red"
        onPress={async () => {
          await resetProjects();
          setProjects([]);
        }}
      />
    </View>
  );
}