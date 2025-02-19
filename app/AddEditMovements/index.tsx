import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import { useRouter } from "expo-router";
import { View } from "react-native";



export default function AddEditMovements() {
  const router = useRouter()

  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <WTButton title="Add Movement" variant={ButtonVariant.Primary} onPress={() => {router.push('/AddEditMovements/AddMovement')}} />
      <WTButton title="Edit Movement" variant={ButtonVariant.Primary} onPress={() => {router.push('/AddEditMovements/EditMovement')}} />
      <WTButton title="Delete Movement" variant={ButtonVariant.Primary} onPress={() => {router.push('/AddEditMovements/DeleteMovement')}} />
    </View>
  )
}