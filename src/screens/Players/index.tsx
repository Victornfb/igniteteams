import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';

import { Button } from '@components/Button';
import { ButtonStyleTypes } from '@components/Button/styles';
import ButtonIcon from '@components/ButtonIcon';
import Filter from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import Input from '@components/Input';
import ListEmpty from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useRoute } from '@react-navigation/native';
import {
  PlayerDto,
  createPlayerByGroup,
  findAllPlayersByGroupAndTeam
} from '@storage/player';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export default function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<Array<PlayerDto>>([]);

  const  route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    try{
      await createPlayerByGroup({ name: newPlayerName, team }, group);

      const players = await findAllPlayersByGroupAndTeam(group, team);

      setPlayers(players);
      setNewPlayerName("");
    } catch (err: any) {
      Alert.alert(
        "Novo Jogador",
        err?.message || "Não foi possível criar um novo jogador."
      );
    }
  }

  useEffect(() => {
    async function fetchPlayersByTeam() {
      const players = await findAllPlayersByGroupAndTeam(group, team);
      setPlayers(players);
    }

    fetchPlayersByTeam();
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
          placeholder="Nome do(a) jogador(a)"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
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

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há jogares nesse time ainda" />
        )}
        contentContainerStyle={players.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Remover Grupo"
        type={ButtonStyleTypes.SECONDARY}
        style={{ marginTop: 12 }}
      />
    </Container>
  );
}
