import { TouchableOpacityProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { ButtonIconStyleTypes, Container, Icon } from './styles';

interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconStyleTypes;
}

export default function ButtonIcon({
  icon,
  type = ButtonIconStyleTypes.PRIMARY,
  ...rest
}: ButtonIconProps) {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  );
}
