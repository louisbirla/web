import { IconButton } from "@chakra-ui/button"
import Icon from "@chakra-ui/icon"
import { CustomMenuItem } from "display-api"
import { genActionObject } from "../../ActionObject"

export const CustomMenu: React.FC<{ customMenu: CustomMenuItem[] }> = ({ customMenu }) => {
	return (
		<>
			{customMenu.map(({ icon, text, interact, disabled }: CustomMenuItem) => {
				const [, action] = genActionObject(interact)
				return (
					<IconButton
						onClick={action}
						size='xs'
						variant='nostyle'
						color='#b3cddb'
						disabled={disabled}
						aria-label={text}
						marginLeft='2'
						icon={<Icon name={icon} size={20} />}
					/>
				)
			})}
		</>
	)
}
