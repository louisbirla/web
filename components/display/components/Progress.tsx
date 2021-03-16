import { CircularProgress, CircularProgressLabel, Text } from "@chakra-ui/react"
import { ProgressArgs } from "display-api"
import React from "react"
import { Environment } from "../ComponentDelegate"

export const ProgressComponent: React.FC<ProgressArgs & { env?: Environment }> = ({
	value,
	max = 100,
	inner_label,
	thickness,
	color,
	env,
}) => {
	const inHeader = env === "cardheader"
	const shrink = inner_label && (inner_label.length > 7 ? true : false)
	return (
		<CircularProgress
			size={inHeader ? 10 : 20}
			value={value}
			max={max}
			thickness={thickness}
			color={color && (color.includes("#") ? color : `${color}.500`)}
		>
			<CircularProgressLabel>
				{inHeader || <Text fontSize={shrink ? 10 : 15}>{inner_label}</Text>}
				<Text fontSize={inHeader ? 15 : shrink ? 20 : 25} lineHeight={5}>
					{value}
				</Text>
			</CircularProgressLabel>
		</CircularProgress>
	)
}
