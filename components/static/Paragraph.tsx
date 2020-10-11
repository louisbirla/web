import { Text, Container } from '@chakra-ui/core'

export const Paragraph: React.FC<{ b?: boolean }> = ({ children, b }) => {
  return (
    <Container maxW='sm'>
      <Text fontWeight={b ? 'bold' : undefined}>{children}</Text>
    </Container>
  )
}
