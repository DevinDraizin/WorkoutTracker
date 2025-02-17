import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton"
import { DatabaseService } from "@/services/DatabaseService"
import { WorkoutService } from "@/services/WorkoutService"
import { Movement } from "@/Types/DBTypes"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text} from "react-native"
import * as FileSystem from 'expo-file-system'

export default function Index() {
  const router = useRouter()
  const [isDbReady, setIsDbReady] = useState(false)

  useEffect(() => {
    const initDatabase = async () => {
      try {
        console.log('Initializing database...')
        const dbService = DatabaseService.getInstance()
        await dbService.initialize()
        setIsDbReady(true)
        console.log('Database initialized successfully.')
      } catch (error) {
        console.error('Failed to initialize database:', error)
      }
    }

    initDatabase()
  }, [])

  if (!isDbReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    )
  } else {
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
        onPress={() => {
          const a = {
            id: 1,
            name: 'TestName',
            setType: 'TestSetType',
          } as Movement
          // WorkoutService.getInstance().createMovement(a)
        }}
        variant={ButtonVariant.Primary}
      ></WTButton>
      <WTButton
        title="Add / Edit Movement"
        onPress={() => {
          const a: Promise<Movement[] | null> = WorkoutService.getInstance().getAllMovements() ??  [{
            id: 9,
            name: 'FAKE',
            setType: 'FAKE',
          }]
          a.then((movment) => {
            console.log(movment)
          })
          console.log(FileSystem.documentDirectory)
        }}
        variant={ButtonVariant.Primary}
      ></WTButton>
    </View>
    )
  }

}
