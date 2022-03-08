import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/modal"
import { useState } from "react"
import { gql, useMutation } from "urql"
import { Button, Input } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks"

export const UpdateBlockColor = gql`
	mutation ($blockId: Int!, $rgb: String!) {
		updateColor(blockId: $blockId, rgb: $rgb) {
			id
		}
	}
`
export type UpdateBlockColorVars = { blockId: number; rgb: string }

export const useChangeColor = (blockId: number, blockColor?: string): [() => void, JSX.Element] => {
	const [, updateColor] = useMutation<{}, UpdateBlockColorVars>(UpdateBlockColor)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [color, setColor] = useState(blockColor ? rgbToHex(blockColor) : "#4e75fd")

	const modal = (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Block Color</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						onChange={(e) => {
							setColor(e.target.value)
						}}
						value={color}
						type='color'
					/>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme='blue'
						mr={3}
						onClick={() => {
							let rgb = hexToRgb(color)
							if (rgb) {
								updateColor({
									blockId,
									rgb: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
								}).then(onClose)
							}
						}}
					>
						Update
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
	return [onOpen, modal]
}

const hexToRgb = (hex: string) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null
}

const componentToHex = (c: number) => {
	var hex = c.toString(16)
	return hex.length == 1 ? "0" + hex : hex
}

const rgbToHex = (rgbInput: string) => {
	let rgb = rgbInput.split(",")
	const r = parseInt(rgb[0].substring(4))
	const g = parseInt(rgb[1])
	const b = parseInt(rgb[2])
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
