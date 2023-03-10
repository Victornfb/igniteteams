import ButtonIcon from '@components/ButtonIcon';
import { ButtonIconStyleTypes } from '@components/ButtonIcon/styles';

import { Container, Icon, Name } from './styles';

interface PlayerCardProps {
  name: string;
  onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>

      <ButtonIcon
        icon="close"
        type={ButtonIconStyleTypes.SECONDARY}
        onPress={onRemove}
      />
    </Container>
  );
}
