// for local Storage 

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Project } from "@/types/Project"

const KEY = "projects"

export async function loadProjects(): Promise<Project[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
}

export async function saveProjects(projects: Project[]) {
    try{
        await AsyncStorage.setItem(KEY, JSON.stringify(projects));
    } catch (error) {
        console.log(error)
    };
}

export async function resetProjects() {
    await AsyncStorage.removeItem(KEY);
}