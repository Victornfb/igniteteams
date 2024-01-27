import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import ListEmpty from "@components/ListEmpty";

import { useNavigation } from "@react-navigation/native";
import { findAllGroups } from "@storage/group";
import { Container } from "./styles";

export default function Groups() {
  const navigation = useNavigation();

  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigation.navigate("newGroups");
  }

  useEffect(() => {
    async function fetchGroups() {
      const groups = await findAllGroups();
      setGroups(groups);
    }

    fetchGroups();
  }, [groups])

  return (
    <Container>
      <Header />
      <Highlight title="Grupos" subtitle="Jogue com seu grupo de amigos!" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhum grupo encontrado" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />

      <Button title="Criar Grupo" onPress={handleNewGroup} />
    </Container>
  );
}
