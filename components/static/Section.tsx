import { VStack } from "@chakra-ui/core"

export const Section: React.FC = ({ children }) => {
  return (
    <VStack fontSize={20} as='section' spacing={10} mb={10}>
      {children}
    </VStack>
  )
}
