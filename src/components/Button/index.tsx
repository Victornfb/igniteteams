import { TouchableOpacityProps } from 'react-native';

import { ButtonStyleTypes, Container, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonStyleTypes;
}

export function Button({
  title,
  type = ButtonStyleTypes.PRIMARY,
  ...rest
}: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
