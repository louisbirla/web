import { Paragraph } from "../Paragraph"

export const Journey: React.FC<{ context: JSX.Element | string; intent?: JSX.Element | string; name: string }> = ({
	children,
	context,
	intent,
	name,
}) => {
	return (
		<>
			<Paragraph b>{name}</Paragraph>
			<Paragraph>
				<i>Context</i>: {context}
			</Paragraph>
			{intent && (
				<Paragraph>
					<i>Overall Intention</i>: {intent}
				</Paragraph>
			)}
			{children}
		</>
	)
}
