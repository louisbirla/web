import {
	Box,
	Button,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react"
import { ActionPopoverAction, ActionPopoverArgs } from "display-api"
import { MoreHorizontal } from "react-feather"
import { genActionObject } from "../ActionObject"
import { ComponentDelegate } from "../ComponentDelegate"
import { IconComponent } from "./Icon"

export const ActionPopoverComponent: React.FC<ActionPopoverArgs> = ({ trigger, actions }) => {
	let actionList = <Text>No actions provided</Text>
	if (actions.length > 0) {
		actionList = (
			<Stack alignItems='start' overflow='scroll' divider={<StackDivider borderColor='gray.200' />}>
				{actions.map((action) => (
					<ActionButton action={action} />
				))}
			</Stack>
		)
	}
	return (
		<Popover onClose={close}>
			<PopoverTrigger>
				<Box display='inline'>
					{trigger == undefined ? (
						<IconButton size='sm' aria-label='Open action list' icon={<MoreHorizontal size={30} />} variant='ghost' />
					) : (
						<ComponentDelegate component={trigger} />
					)}
				</Box>
			</PopoverTrigger>
			<PopoverContent width='xs'>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>{actionList}</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}

const ActionButton = ({ action }: { action: ActionPopoverAction }) => {
	const [ActionWrap, interact] = genActionObject(action.interact)
	return (
		<ActionWrap>
			<Button onClick={interact} justifyContent='start' width='100%' variant='ghost'>
				{action.icon && (
					<Box mr={2}>
						<IconComponent size='1.3em' color='none' name={action.icon} />
					</Box>
				)}
				{action.text}
			</Button>
		</ActionWrap>
	)
}
