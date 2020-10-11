import { Text, Container } from '@chakra-ui/core'

export const Paragraph: React.FC<{ b?: boolean; id?: string }> = ({ children, b, id }) => {
  return (
    <Container maxW='sm'>
      <Text id={id} fontWeight={b ? 'bold' : undefined}>
        {children}
      </Text>
    </Container>
  )
}
