import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/layout"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/modal"
import { Switch } from "@chakra-ui/switch"
import { RefObject, useEffect, useRef, useState } from "react"
import { gql, useMutation, useQuery } from "urql"
import { Avatar, Icon, Select, Tooltip, Button } from "@chakra-ui/react"
import { Info } from "react-feather"
import { UserArray } from "../../../search/UserSearchResults"
import { SearchComponentWrapper } from "../Search"

export const SetVisibilityQuery = gql`
	mutation($blockId: Int!, $public: Boolean!) {
		updateVisibility(public: $public, blockId: $blockId) {
			id
		}
	}
`

export const GetUserPermissions = gql`
	query($blockId: Int!) {
		blockById(id: $blockId) {
			full: permFull(level: FULL) {
				id
				username
				displayName
			}
			edit: permFull(level: EDIT) {
				id
				username
				displayName
			}
			view: permFull(level: VIEW) {
				id
				username
				displayName
			}
		}
	}
`
export const SetUserPermissions = gql`
	mutation($full: [Int!]!, $edit: [Int!]!, $view: [Int!]!, $blockId: Int!) {
		setPerms(permFull: $full, permEdit: $edit, permView: $view, blockId: $blockId) {
			full: permFull(level: FULL) {
				id
				username
				displayName
			}
			edit: permFull(level: EDIT) {
				id
				username
				displayName
			}
			view: permFull(level: VIEW) {
				id
				username
				displayName
			}
		}
	}
`

export type SetVisibilityArgsVars = { blockId: number; public: boolean }
export type SetUserPerissionsVars = { full: Array<number>, edit: Array<number>, view: Array<number>, blockId: number }
export type GetUserPerissionsVars = { blockId: number }
export type UserPermission = { full: UserArray, edit: UserArray, view: UserArray }
export type GetUserPermissionResult = { blockById: UserPermission }
export enum PermissionType {
	full = 0,
	edit = 1,
	view = 2
}


export const usePermissionButton = (blockId: number, pub: boolean): [JSX.Element, () => void, RefObject<any>] => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef: RefObject<any> = useRef()
	const [visLoading, setVisLoading] = useState(false)
	const [full, setFull] = useState<UserArray>([])
	const [edit, setEdit] = useState<UserArray>([])
	const [view, setView] = useState<UserArray>([])

	const [visRes, setVis] = useMutation<{}, SetVisibilityArgsVars>(SetVisibilityQuery)
	const [userPermissionResponse, getUserPermissions] = useQuery<GetUserPermissionResult, GetUserPerissionsVars>({
		query: GetUserPermissions,
		variables: { blockId: blockId },
	})

	useEffect(() => {
		getUserPermissions()
	}, [])

	useEffect(() => {
		if (userPermissionResponse.data?.blockById) {
			const permissions = userPermissionResponse.data?.blockById
			setFull(permissions.full)
			setEdit(permissions.edit)
			setView(permissions.view)
		}
	}, [userPermissionResponse])

	const renderUserItems = (users: UserArray, type: PermissionType) => {
		const results = users.map((user, i) => {
			const displayName = user.displayName || user.username
			const content = (
				<Flex alignItems='center'>
					<Avatar size='sm' name={displayName} />
					<HStack width='100%' alignItems='flex-end' ml={2}>
						<Stack width='100%' spacing={0}>
							<Text fontWeight='bold'>{displayName}</Text>
							<Text>@{user.username}</Text>
						</Stack>
						<Box width='70%' justifyContent='flex-end'>
							<Select
								value={type}
								onChange={(e: any) => {
									const index = e.target.value
									const destination = index == 0 ? full : index == 1 ? edit : index == 2 ? view : undefined
									if (!destination) {
										return
									}

									const setDestination = index == 0 ? setFull : index == 1 ? setEdit : setView
									const exists = destination.some(e => e.username === user.username)
									if (!exists) {
										setView(oldValue => oldValue.filter(e => e.username !== user.username))
										setEdit(oldValue => oldValue.filter(e => e.username !== user.username))
										setFull(oldValue => oldValue.filter(e => e.username !== user.username))
										setDestination(oldValue => [...oldValue, user])
									}
								}}>
								<option value={0}>Full</option>
								<option value={1}>Edit</option>
								<option value={2}>Read-Only</option>
							</Select>
						</Box>
					</HStack>
				</Flex>
			)

			return (
				<Box
					key={user.username}
					cursor='pointer'
					px={4}
					py={1}
					onClick={() => {

					}}
				>
					{content}
				</Box>
			)
		})

		return results
	}

	const renderUserList = () => {
		return <>
			{full.length > 0 &&
				<Stack maxH='80vh' overflow='scroll' spacing={0}>
					<Heading size='sm' fontWeight='semibold' marginTop='10'>Full</Heading>
					{renderUserItems(full, PermissionType.full)}
				</Stack>}
			{edit.length > 0 &&
				<Stack maxH='80vh' overflow='scroll' spacing={0}>
					<Heading size='sm' fontWeight='semibold' marginTop='10'>Edit</Heading>
					{renderUserItems(edit, PermissionType.edit)}
				</Stack>}
			{view.length > 0 &&
				<Stack maxH='80vh' overflow='scroll' spacing={0}>
					<Heading size='sm' fontWeight='semibold' marginTop='10'>Read-Only</Heading>
					{renderUserItems(view, PermissionType.view)}
				</Stack>}
		</>
	}

	const drawer = (
		<Drawer size='sm' isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Block Permissions</DrawerHeader>
					<DrawerBody>
						<Flex width='100%' justifyContent='space-between'>
							<Flex alignItems='center'>
								<Tooltip
									hasArrow
									label='Anybody can see public blocks'
									aria-label='Information about public vs private blocks'
								>
									<Icon as={Info} color='gray' />
								</Tooltip>
								<Text ml={2} display='inline'>
									Public
								</Text>
							</Flex>
							<Switch
								isDisabled={visLoading}
								onClick={() => {
									setVisLoading(true)
									setVis({ public: !pub, blockId })
										.then(() => setVisLoading(false))
										.catch(() => setVisLoading(false))
								}}
								isChecked={pub}
							/>
						</Flex>
						<Text color='red'>{visRes.error?.message}</Text>

						<HStack alignItems='flex-end' marginTop='10'>
							<Heading width='100%' size=' md' fontWeight='semibold'>User Permissions</Heading>
							<SearchComponentWrapper component={{ cid: 'search', type: 'User' }}>
								<Button
									justifyContent='flex-end'
									colorScheme='orange'
									variant='link'>
									Add
								</Button>
							</SearchComponentWrapper>
							<Button
								onClick={() => { }}
								justifyContent='flex-end'
								colorScheme='orange'
								variant='link'>
								Save
							</Button>
						</HStack>

						{userPermissionResponse && renderUserList()}
					</DrawerBody>

					<DrawerFooter>
						<Button onClick={onClose} colorScheme='orange'>
							Done
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer >
	)
	return [drawer, onOpen, btnRef]
}
