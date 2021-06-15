import { Badge } from "@chakra-ui/react"
import { BadgeArgs } from "display-api"

export const BadgeComponent: React.FC<BadgeArgs> = ({ text, variant, color_scheme, size }) => {
	return (
		<Badge m={1} colorScheme={color_scheme} variant={variant?.toLowerCase()} fontSize={size}>
			{text}
		</Badge>
	)
}
