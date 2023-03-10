import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./styles";

// FilterStyleProps

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
  title: string;
}

export default function Filter({
  title,
  isActive = false,
  ...rest
}: FilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
