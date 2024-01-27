import { useState } from 'react';
import { Alert } from 'react-native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { createGroup } from '@storage/group';

import { Container, Content, Icon } from './styles';

export default function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      await createGroup(group);
      navigation.navigate("players", { group });
    } catch (err: any) {
      Alert.alert(
        "Novo Grupo",
        err?.message || "Não foi possível criar um novo grupo."
      );
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Novo Grupo"
          subtitle="Crie o grupo para adicionar pessoas"
        />

        <Input
          placeholder="Nome do grupo"
          onChangeText={setGroup}
          onSubmitEditing={handleNewGroup}
          returnKeyType='done'
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNewGroup} />
      </Content>
    </Container>
  );
}
