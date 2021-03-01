import { SearchComponent as SearchArgs } from "display-api"
import {
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@chakra-ui/popover"
import { SearchComponent } from "../../search/SearchComponent"
import React, { useState } from "react"
import { UserSearchResults } from "../../search/UserSearchResults"
import { Box, Text } from "@chakra-ui/layout"
import { genActionObject } from "../ActionObject"
import { setMethodVar } from "../method"
import { BlockSearchResults } from "../../search/BlockSearchResults"
import { Button } from "@chakra-ui/button"
import { useCreateBlock } from "../../panels/CreateBlockPanel"
import { useChooseType } from "../../panels/ChooseTypePanel"

export const SearchComponentWrapper: React.FC<{ component: SearchArgs }> = ({ children, component }) => {
	const [chosen, setChosen] = useState(false)
	const [WrapThen, then] = genActionObject(component.then)
	const onChoose = (id: number) => {
		setChosen(true)
		setMethodVar(component.name || "_", id.toString())
		then()
	}
	if (chosen) {
		return <WrapThen>{children}</WrapThen>
	}
	return (
		<Popover closeOnBlur={false} closeOnEsc={false}>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverHeader fontWeight='bold' textAlign='center'>
					{component.action_text ?? (component.type === "User" ? "Choose a User" : "Choose a Block")}
				</PopoverHeader>
				<SearchComponentBody onChoose={onChoose} component={component} />
			</PopoverContent>
		</Popover>
	)
}

export const SearchComponentBody: React.FC<{ component: SearchArgs; onChoose: (id: number) => void }> = ({
	component,
	onChoose,
}) => {
	let [query, setQuery] = useState("")
	const createBlock = useCreateBlock()
	const chooseType = useChooseType()

	if (component.type === "User") {
		return (
			<PopoverBody>
				<SearchComponent placeholder='Search for users' value={query} setValue={setQuery} />
				<Box mt={2} textAlign='center'>
					{query.trim().length > 0 && <UserSearchResults onChoose={onChoose} setQuery={setQuery} query={query} />}
				</Box>
			</PopoverBody>
		)
	} else {
		return (
			<PopoverBody textAlign='center'>
				<SearchComponent placeholder='Search for blocks' value={query} setValue={setQuery} />
				<Box mt={2}>
					{query.trim().length > 0 ? (
						<BlockSearchResults onChoose={onChoose} setQuery={setQuery} query={query} />
					) : (
						<>
							<Text>or</Text>
							<Button onClick={() => chooseType().then(createBlock).then(onChoose)} colorScheme='blue'>
								Create a Block
							</Button>
						</>
					)}
				</Box>
			</PopoverBody>
		)
	}
}
