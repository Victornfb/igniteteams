import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export enum ButtonStyleTypes {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

interface ButtonStyleProps {
  type: ButtonStyleTypes;
}

export const Container = styled(TouchableOpacity)<ButtonStyleProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme, type }) =>
    type === ButtonStyleTypes.PRIMARY
      ? theme.COLORS.GREEN_700
      : theme.COLORS.RED_DARK};

  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
