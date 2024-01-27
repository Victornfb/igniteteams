import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/config";

export async function createGroup(name: string): Promise<void> {
  try {
    const storedGroups = await findAllGroups();

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storedGroups, name])
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function findAllGroups(): Promise<Array<string>> {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
