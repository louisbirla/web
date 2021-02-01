import { Box, Heading, HStack } from "@chakra-ui/core"
import { CardArgs, CardIcon } from "display-api"
import Link from "next/link"
import { CheckCircle, Folder, IconProps, MessageSquare, Type, Box as BoxIcon, Rss } from "react-feather"
import { ComponentDelegate } from "../ComponentDelegate"

export const CardComponent: React.FC<CardArgs> = ({ header, color, content }) => {
	color = color || "#5D80FE"
	let cardHeader = <></>
	if (header) {
		let wrapLink = (wrapped: JSX.Element) => wrapped
		if (header.block_id) {
			wrapLink = (wrapped: JSX.Element) => (
				<Link href={`/b/${header.block_id}`}>
					<a>{wrapped}</a>
				</Link>
			)
		}
		cardHeader = (
			<Box pb={2}>
				<HStack>
					<CardIconComponent icon={header.icon} color={color} />
					{wrapLink(
						<Heading pl={1} size='md' fontWeight='bold'>
							{header.title}
						</Heading>,
					)}
				</HStack>
			</Box>
		)
	}
	return (
		<Box
			bgColor='white'
			boxShadow='xl'
			pt={3}
			pb={3}
			pl={2}
			pr={3}
			borderRadius={4}
			borderLeft={`3px solid ${color}`}
			display='inline-block'
			m={2}
		>
			{cardHeader}
			<Box pl={2}>
				<ComponentDelegate component={content} />
			</Box>
		</Box>
	)
}

const CardIconComponent: React.FC<{ icon?: CardIcon; color: string }> = ({ icon, color }) => {
	let commonProps: IconProps = { color, size: 23 }
	switch (icon) {
		case "Folder":
			return <Folder {...commonProps} />
		case "TaskComplete":
			return <CheckCircle {...commonProps} />
		case "Message":
			return <MessageSquare {...commonProps} style={{ marginTop: "4px" }} />
		case "Box":
			return <BoxIcon {...commonProps} />
		case "Type":
			return <Type {...commonProps} />
		case "Feed":
			return <Rss {...commonProps} />
		default:
			return <BoxIcon {...commonProps} />
	}
}
