import { Text, Box, Heading } from '@chakra-ui/core'

export const CountDisplay: React.FC<{ count?: number | null }> = ({ count }) => {
  if (count == null) return <Text color='gray.500'>Loading...</Text>

  return (
    <Box textAlign='center'>
      <Text color='gray.500'>count</Text>
      <Heading fontWeight='bold'>{count}</Heading>
    </Box>
  )
}
