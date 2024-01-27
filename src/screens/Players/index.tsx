import { useState } from 'react';
import { FlatList } from 'react-native';

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

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export default function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([
    "Victor",
    "Lucas",
    "Fernando",
    "Daniel",
    "Rafael",
    "Wellington",
    "João",
    "Alex",
    "Ariel",
  ]);

  const  route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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
