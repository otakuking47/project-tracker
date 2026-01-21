import { View, Text, Pressable } from "react-native";

type Props = {
    title: string;
    progress: number;
    lastTouchedAt: string
    onPress: () => void;
};

function daysAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export default function ProjectCard({ title, progress, lastTouchedAt, onPress }: Props) {
    const stale = lastTouchedAt && daysAgo(lastTouchedAt) > 7
    
    return(
        <Pressable onPress={onPress}>
            <View
                style ={{
                    padding: 15,
                    marginTop:10,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: stale ? "red":"black",
                }}
            >
                <Text style={{ fontSize: 18 }}>{title}</Text>
                <Text>{progress}% complete</Text>
                {lastTouchedAt && (
                    <Text>
                        Last touched: {lastTouchedAt}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}