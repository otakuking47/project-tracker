// this is were I test how to use new features before adding to the main app
import { Button, Pressable, Text, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
// TODO: use Zeego (maybe)

export default function test() {
  return (
    <View>
      <Pressable>
        <MenuView
              title="Menu title"
              onPressAction={({ nativeEvent }) => {
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
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </MenuView>
      </Pressable>
  </View>
  );
}