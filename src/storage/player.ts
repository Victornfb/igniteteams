import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/config";
import { AppError } from "@utils/AppError";

export type PlayerDto = {
  name: string;
  team: string;
};

export async function createPlayerByGroup(
  player: PlayerDto,
  group: string
): Promise<void> {
  if (!player?.name?.length) {
    throw new AppError("Insira um nome para o jogador.");
  }

  if (!group?.length) throw new AppError("Grupo inválido.");

  const storedPlayers = await findAllPlayersByGroup(group);

  const playerAlreadyExists = storedPlayers.find((p) => p.name === player.name);

  if (playerAlreadyExists) throw new AppError("O jogador já existe.");

  await AsyncStorage.setItem(
    `${PLAYER_COLLECTION}-${group}`,
    JSON.stringify([...storedPlayers, player])
  );
}

export async function findAllPlayersByGroup(
  group: string
): Promise<Array<PlayerDto>> {
  const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

  const players: PlayerDto[] = storage ? JSON.parse(storage) : [];

  return players;
}

export async function findAllPlayersByGroupAndTeam(
  group: string,
  team: string
): Promise<Array<PlayerDto>> {
  const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

  const players: PlayerDto[] = storage ? JSON.parse(storage) : [];

  const updatedPlayers = players.filter((p) => p.team === team);

  return updatedPlayers;
}
