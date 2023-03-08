import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([
    "Grupo 🔑 dos Cornos",
    "Novo ano velho 🎉",
  ]);

  return (
    <Container>
      <Header />
      <Highlight title="Grupos" subtitle="Jogue com seu grupo de amigos!" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  );
}
