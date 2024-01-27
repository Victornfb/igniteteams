import { useCallback, useState } from "react";
import { FlatList } from "react-native";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import ListEmpty from "@components/ListEmpty";

import { Loading } from "@components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { findAllGroups } from "@storage/group";
import { Container } from "./styles";

export default function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("newGroups");
  }

  function handleOpenGroup(name: string) {
    navigation.navigate("players", { group: name })
  }

  useFocusEffect(
    useCallback(
      () => {
        async function fetchGroups() {
          setIsLoading(true);
          const groups = await findAllGroups();
          setGroups(groups);
          setIsLoading(false);
        }

        fetchGroups();
      }, []
    )
  );

  return (
    <Container>
      <Header />
      <Highlight title="Grupos" subtitle="Jogue com seu grupo de amigos!" />

      {isLoading ? <Loading/> :
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Nenhum grupo encontrado" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
        />
      }

      <Button title="Criar Grupo" onPress={handleNewGroup} />
    </Container>
  );
}
