import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  //TODO: Fix dark mode

  // const colorScheme = useColorScheme();
  // return ( 
  //   <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  //     <Stack>
  //       <Stack.Screen
  //         name="index"
  //         options={{
  //           headerTitle: "Projects",
  //         }}
  //       />
  //       <Stack.Screen
  //         name="new"
  //         options={{
  //           headerTitle: "New Project",
  //         }}
  //       />
  //       <Stack.Screen
  //         name="project/[id]"
  //         options={{
  //           headerTitle: "Project Details",
  //         }}
  //       />
  //     </Stack>
  //   </ThemeProvider>
  // );
  return <Stack />;
}
