import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';

import { Button } from '@components/Button';
import { ButtonStyleTypes } from '@components/Button/styles';
import ButtonIcon from '@components/ButtonIcon';
import Filter from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import Input from '@components/Input';
import ListEmpty from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { removeGroup } from '@storage/group';
import {
  PlayerDto,
  createPlayerByGroup, findAllPlayersByGroupAndTeam,
  removePlayerByGroup
} from '@storage/player';

import { Loading } from '@components/Loading';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export default function Players() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<Array<PlayerDto>>([]);

  const  route = useRoute();
  const { group } = route.params as RouteParams;

  const navigation = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    try{
      await createPlayerByGroup({ name: newPlayerName, team }, group);
      await fetchPlayers();
      setNewPlayerName("");
      newPlayerNameInputRef.current?.blur();
    } catch (err: any) {
      Alert.alert(
        "Novo Jogador",
        err?.message || "Não foi possível criar um novo jogador."
      );
    }
  }

  async function handleRemovePlayer(player: PlayerDto) {
    try{
      await removePlayerByGroup(player.name, group);
      await fetchPlayers();
    } catch (err: any) {
      Alert.alert(
        "Remover Jogador",
        err?.message || "Não foi possível remover o jogador."
      );
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover Grupo", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel"},
      { text: "Sim", onPress: async () => {
        try {
          await removeGroup(group);
          navigation.navigate("groups");
        } catch (err: any) {
          Alert.alert(
            "Remover Grupo",
            err?.message || "Não foi possível remover o grupo."
          );
        }
      }},
    ])
  }

  async function fetchPlayers() {
    setIsLoading(true);
    const players = await findAllPlayersByGroupAndTeam(group, team);
    setPlayers(players);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPlayers();
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do(a) jogador(a)"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? <Loading/> :
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há jogares nesse time ainda" />
          )}
          contentContainerStyle={players.length === 0 && { flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      }

      <Button
        title="Remover Grupo"
        type={ButtonStyleTypes.SECONDARY}
        style={{ marginTop: 12 }}
        onPress={() => handleRemoveGroup()}
      />
    </Container>
  );
}
