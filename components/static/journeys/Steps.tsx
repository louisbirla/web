import { ListItem, OrderedList } from "@chakra-ui/core"
import { Paragraph } from "../Paragraph"

export const Steps: React.FC<{ steps: Array<string | JSX.Element> }> = ({ steps }) => {
	return (
		<OrderedList>
			{steps.map((step) => (
				<ListItem key={step.toString()}>
					<Paragraph>{step}</Paragraph>
				</ListItem>
			))}
		</OrderedList>
	)
}
