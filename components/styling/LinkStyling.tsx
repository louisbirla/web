import { Text } from "@chakra-ui/core"
import { colors } from "../../utils/theme/colors"

export const LinkStyling: React.FC = ({ children }) => {
  return (
    <Text as='span' fontWeight='bold' display='inline' color={colors.blue}>
      {children}
    </Text>
  )
}
