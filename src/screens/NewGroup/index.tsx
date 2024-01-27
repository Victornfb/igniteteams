import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import Input from '@components/Input';

import { useNavigation } from '@react-navigation/native';
import { Container, Content, Icon } from './styles';

export default function NewGroup() {
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("players", { group: '' })
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

        <Input placeholder="Nome do grupo" />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNewGroup} />
      </Content>
    </Container>
  );
}
