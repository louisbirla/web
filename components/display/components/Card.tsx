import { Box, BoxProps, Heading, HStack } from "@chakra-ui/react"
import { CardArgs } from "display-api"
import Link from "next/link"
import React from "react"
import { ComponentDelegate, Environment } from "../ComponentDelegate"
import { IconComponent } from "./Icon"
import { CardMenu } from "./menu/CardMenu"

export const CardComponent: React.FC<CardArgs & { env?: Environment }> = ({ header, color, content, env }) => {
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
		let headerContent = (
			<HStack>
				<IconComponent name={header.icon} color={color} />
				{wrapLink(
					<Heading pl={1} size='md' fontWeight='bold'>
						{header.title}
					</Heading>,
				)}
			</HStack>
		)
		if (header.custom) {
			headerContent = <ComponentDelegate env='cardheader' component={header.custom} />
		}
		cardHeader = (
			<Box pb={2} display='flex' justifyContent='space-between'>
				{headerContent}
				<Box ml={2}>{header.menu == null ? <></> : <CardMenu menu={header.menu} />}</Box>
			</Box>
		)
	}
	const shadowlessProps: BoxProps | undefined =
		env === "displaylist"
			? {
					boxShadow: "none",
					borderRight: "1px solid #CFD7E1",
					borderTop: "1px solid #CFD7E1",
					borderBottom: "1px solid #CFD7E1",
			  }
			: undefined
	return (
		<Card maxW={600} ml={0} pr={4} borderLeft={`3px solid ${color}`} {...shadowlessProps}>
			{cardHeader}
			<Box pl={2}>
				<ComponentDelegate component={content} />
			</Box>
		</Card>
	)
}

export const Card: React.FC<BoxProps> = (props) => (
	<Box
		bgColor='white'
		boxShadow='base'
		pt={3}
		pb={3}
		pl={2}
		pr={3}
		borderRadius={4}
		display='inline-block'
		m={2}
		{...props}
	>
		{props.children}
	</Box>
)
