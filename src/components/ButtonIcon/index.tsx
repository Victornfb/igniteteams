import { TouchableOpacityProps } from "react-native";
import { ButtonIconStyleTypes, Container, Icon } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

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
