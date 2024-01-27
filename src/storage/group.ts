import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/config";
import { AppError } from "@utils/AppError";

export async function createGroup(name: string): Promise<void> {
  if (!name.length) throw new AppError("Insira um nome para o grupo.");

  const storedGroups = await findAllGroups();

  const groupAlreadyExists = storedGroups.includes(name);

  if (groupAlreadyExists) throw new AppError("O grupo já existe.");

  await AsyncStorage.setItem(
    GROUP_COLLECTION,
    JSON.stringify([...storedGroups, name])
  );
}

export async function findAllGroups(): Promise<Array<string>> {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

  const groups: string[] = storage ? JSON.parse(storage) : [];

  return groups;
}
