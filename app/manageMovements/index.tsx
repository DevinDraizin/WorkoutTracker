import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import { useRouter } from "expo-router";
import { View } from "react-native";



export default function ManageMovements() {
  const router = useRouter()

  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <WTButton title="Add Movement" variant={ButtonVariant.Primary} onPress={() => {router.push('/manageMovements/AddMovement')}} />
      <WTButton title="Delete Movement" variant={ButtonVariant.Primary} onPress={() => {router.push('/manageMovements/DeleteMovement')}} />
    </View>
  )
}