import { Container, Message } from "./styles";

interface ListEmptyProps {
  message: string;
}

export default function ListEmpty({ message }: ListEmptyProps) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}
