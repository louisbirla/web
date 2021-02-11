import {
	Heading,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	Tooltip,
} from "@chakra-ui/react"
import { IconName } from "display-api"
import { gql, useQuery } from "urql"
import { atom, useAtom } from "jotai"
import { Card } from "../display/components/Card"
import { IconComponent } from "../display/components/Icon"
import { Info } from "react-feather"
import { blue } from "../../utils/theme/colors"

export type TypeReject = () => void
export type TypeResolve = (name: string) => void
export const ChooseTypeAtom = atom<{ resolve: TypeResolve; reject: TypeReject } | undefined>(undefined)

const TypesQuery = gql`
	query {
		blockTypes {
			desc
			name
			icon
		}
	}
`
type BlockType = { desc: string; name: string; icon: IconName }
type TypesQueryResult = { blockTypes: BlockType[] }

const empty_reject = () => {}
const empty_resolve = (_: string) => {}
export const ChooseTypePanel: React.FC = () => {
	let [params] = useAtom(ChooseTypeAtom)
	let reject = params?.reject || empty_reject
	let resolve = params?.resolve || empty_resolve
	let enabled = params != undefined
	return (
		<Modal isOpen={enabled} onClose={reject}>
			<ModalOverlay />
			<ModalContent bg='#edeff1'>
				<ModalCloseButton />
				{enabled && <ChooseTypeContent resolve={resolve} />}
			</ModalContent>
		</Modal>
	)
}

const ChooseTypeContent: React.FC<{ resolve: TypeResolve }> = ({ resolve }) => {
	let [typeRes] = useQuery<TypesQueryResult>({
		query: TypesQuery,
	})

	let types = typeRes.data?.blockTypes

	if (types != undefined) {
		return (
			<>
				<ModalBody>
					<Heading size='lg'>Create a block</Heading>
					<Text mb={5}>Choose a block type for the block.</Text>
					{types.map((block) => (
						<BlockTypeCard onClick={() => resolve(block.name)} {...block} />
					))}
				</ModalBody>
			</>
		)
	}

	if (typeRes.error?.message) {
		return (
			<ModalBody>
				<Text colorScheme='red'>{typeRes.error.message}</Text>
			</ModalBody>
		)
	}
	return (
		<ModalBody>
			<Spinner />
		</ModalBody>
	)
}

export const useChooseType = () => {
	const [, setPromise] = useAtom(ChooseTypeAtom)
	return () =>
		new Promise((resolve: TypeResolve, reject) => {
			setPromise({
				reject: () => {
					setPromise(undefined)
					reject()
				},
				resolve: (name) => {
					setPromise(undefined)
					resolve(name)
				},
			})
		})
}

export const BlockTypeCard: React.FC<BlockType & { onClick: () => void }> = ({ name, icon, desc, onClick }) => (
	<Card
		display='inline-flex'
		justifyContent='center'
		alignItems='center'
		flexDirection='column'
		height={150}
		width={150}
		onClick={onClick}
		borderColor={blue[300]}
		_hover={{
			borderWidth: 2,
		}}
		cursor='pointer'
	>
		<IconComponent name={icon} size={30} />
		<Text mt={4} fontSize={20} fontWeight='medium' textTransform='capitalize'>
			{name}
		</Text>
		<Tooltip label={desc} aria-label='Block type description'>
			<Icon position='relative' top={5} left={12} as={Info} color='#ced6df' />
		</Tooltip>
	</Card>
)
