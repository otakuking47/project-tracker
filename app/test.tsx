import DropDownMenu from "@/components/dropDownMenu";
import { Stack } from "expo-router";
import { View } from "react-native";


export default function testing () {
    const handleDrop = (key:string) => {
        console.log('key pressed: ', key)
    }

    return (
        <View style={{ flex:1 }}>
            <Stack.Screen
                options={{
                    title: 'testing',
                    headerRight: () => 
                        <DropDownMenu onSelect={handleDrop}
                        items={[]} />
                    
                }}
            />
        </View>
    )
}