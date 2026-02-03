import Ionicons from "@react-native-vector-icons/ionicons";
import { View, Text, Pressable } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { loadProjects, saveProjects, resetProjects } from "@/storage/projectStorage";


type Props = {
    id: string;
  title: string;
  progress: number;
  lastTouchedAt: string;
  onPress: () => void;
  onDelete: (id: string) => void;
};

function daysAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function ProjectCard({ id, title, progress, lastTouchedAt, onPress, onDelete }: Props) {
    const stale = lastTouchedAt && daysAgo(lastTouchedAt) > 7;
    const router = useRouter();

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 15,
          marginTop: 10,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: stale ? "red" : "black",
        }}
      >
        <Text style={{ fontSize: 18 }}>{title}</Text>
        <Text>{progress}% complete</Text>
        {lastTouchedAt && <Text>Last touched: {lastTouchedAt}</Text>}
        <Pressable
          style={{ position: "absolute", right: 15, top: 15 }}
          >
            <MenuView
              title="Menu title"
              onPressAction={ async ({ nativeEvent }) => {
                if (nativeEvent.event === "edit") {
                router.push({
                  pathname: "/new",
                  params: { id: id }});
              } else if (nativeEvent.event === "delete") {
                onDelete(id);
              };
            }}
              actions={[
                {
                  id: "edit",
                  title: "Edit",
                  titleColor: "#2367A2",
                  image: Platform.select({
                    ios: "plus",
                    android: "ic_menu_add",
                  }),
                  imageColor: "#2367A2",
                },
                {
                  id: "delete",
                  title: "Delete",
                  attributes: {
                    destructive: true,
                  },
                  image: Platform.select({
                    ios: "trash",
                    android: "ic_menu_delete",
                  }),
                },
              ]}
              shouldOpenOnLongPress={false}
            >
              <View>
                <Ionicons name="ellipsis-vertical" size={24} />
              </View>
            </MenuView>
        </Pressable>
      </View>
    </Pressable>
  );
}
