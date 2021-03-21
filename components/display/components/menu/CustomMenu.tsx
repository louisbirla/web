import { IconButton } from "@chakra-ui/button"
import { Tooltip } from "@chakra-ui/tooltip"
import { CustomMenuItem } from "display-api"
import { genActionObject } from "../../ActionObject"
import { IconComponent } from "../Icon"

export const CustomMenu: React.FC<{ customMenu: CustomMenuItem[]; color?: string }> = ({
	customMenu,
	color = "#b3cddb",
}) => {
	return (
		<>
			{customMenu.map(({ icon, text, interact, disabled }: CustomMenuItem) => {
				const [ActionWrap, action] = genActionObject(interact)
				return (
					<ActionWrap key={text}>
						<Tooltip label={text} hasArrow>
							<IconButton
								onClick={action}
								size='xs'
								variant='nostyle'
								color={color}
								disabled={disabled}
								aria-label={text}
								mr={2}
								icon={<IconComponent color='none' name={icon} size={20} />}
							/>
						</Tooltip>
					</ActionWrap>
				)
			})}
		</>
	)
}
