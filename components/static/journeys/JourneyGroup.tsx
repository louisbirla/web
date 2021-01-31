import { Heading } from "@chakra-ui/core"
import { Paragraph } from "../Paragraph"
import { Section } from "../Section"

export const JourneyGroup: React.FC<{ name: string; desc?: string }> = ({ children, name, desc }) => {
	return (
		<Section>
			<Heading size='md'>{name}</Heading>
			<Paragraph>{desc}</Paragraph>
			{children}
		</Section>
	)
}
