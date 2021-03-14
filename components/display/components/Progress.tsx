import { CircularProgress, CircularProgressLabel, Text } from "@chakra-ui/react"
import { ProgressArgs } from "display-api"
import React from "react"

export const ProgressComponent: React.FC<ProgressArgs> = ({ value, max = 100, inner_label, thickness, color }) => {
	const shrink = inner_label && (inner_label.length > 7 ? true : false)
	return (
		<CircularProgress
			size={20}
			value={value}
			max={max}
			thickness={thickness}
			color={color && (color.includes("#") ? color : `${color}.500`)}
		>
			<CircularProgressLabel>
				<Text fontSize={shrink ? 10 : 15}>{inner_label}</Text>
				<Text fontSize={shrink ? 20 : 25} lineHeight={5}>
					{value}
				</Text>
			</CircularProgressLabel>
		</CircularProgress>
	)
}
