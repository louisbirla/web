import { Box, Text, Button, BoxProps } from "@chakra-ui/core"
import { Link } from "../basic/Link"

export const Nav: React.FC<BoxProps> = (props) => {
	return (
		<Box as='nav' {...props}>
			<Text color='gray.500'>
				<Link href='/'>
					<Button size='sm' variant='link'>
						Loop
					</Button>
				</Link>{" "}
				•{" "}
				<Link href='/block-technology'>
					<Button size='sm' variant='link'>
						Blocks
					</Button>
				</Link>{" "}
				•{" "}
				<Link href='/company'>
					<Button size='sm' variant='link'>
						Company
					</Button>
				</Link>{" "}
				•{" "}
				<Link href='/team'>
					<Button size='sm' variant='link'>
						Team
					</Button>
				</Link>{" "}
				•{" "}
				<Link href='/faq'>
					<Button size='sm' variant='link'>
						FAQ
					</Button>
				</Link>
			</Text>
		</Box>
	)
}
