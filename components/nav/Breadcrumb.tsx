import { Box, Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Icon, Text } from "@chakra-ui/react"
import Link from "next/link"
import { ChevronRight } from "react-feather"
import { bg } from "../../utils/theme/colors"

export type Crumb = { name: string; blockId: number }
export const Breadcrumb: React.FC<{ crumbs: Crumb[]; pageStyling?: boolean }> = ({ crumbs }) => {
	return (
		<Box height={12}>
			<Flex
				position='absolute'
				left={0}
				height={8}
				alignItems='center'
				pl={6}
				fontWeight='medium'
				color='white'
				width='100%'
				bg='blue.500'
			>
				<ChakraBreadcrumb separator={<Icon color='white' as={ChevronRight} mb='2px' />} spacing={1} display='block'>
					{crumbs.map((crumb, i) => (
						<BreadcrumbItem
							_hover={{ color: bg }}
							fontWeight={i === crumbs.length - 1 ? "bold" : undefined}
							key={crumb.blockId}
						>
							{i === crumbs.length - 1 ? (
								<Text color='white'>{crumb.name}</Text>
							) : (
								<BreadcrumbLink as={Link} href={`/b/${crumb.blockId}`}>
									{crumb.name}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					))}
				</ChakraBreadcrumb>
			</Flex>
		</Box>
	)
}
