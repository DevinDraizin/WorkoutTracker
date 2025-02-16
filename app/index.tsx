import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WTButton
        title="Create Workout"
        onPress={() => {router.push("/createWorkouts")}}
        variant={ButtonVariant.Primary}
      ></WTButton>
      <WTButton
        title="View Workouts"
        onPress={() => {}}
        variant={ButtonVariant.Primary}
      ></WTButton>
      <WTButton
        title="Add / Edit Movement"
        onPress={() => {}}
        variant={ButtonVariant.Primary}
      ></WTButton>
    </View>
  );
}
