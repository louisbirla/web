import { IconName } from "display-api"
import { Box as BoxIcon, CheckCircle, Folder, IconProps, MessageSquare, Plus, Rss, Type } from "react-feather"

export const IconComponent: React.FC<{ name?: IconName; color?: string; size?: number | string }> = ({
	name,
	color,
	size = 23,
}) => {
	if (color !== "none") {
		color = "#5276f3"
	} else {
		color = undefined
	}
	let commonProps: IconProps = { color, size }
	switch (name) {
		case "Folder":
			return <Folder {...commonProps} />
		case "TaskComplete":
			return <CheckCircle {...commonProps} />
		case "Message":
			return <MessageSquare {...commonProps} style={{ marginTop: "4px" }} />
		case "Box":
			return <BoxIcon {...commonProps} />
		case "Type":
			return <Type {...commonProps} />
		case "Feed":
			return <Rss {...commonProps} />
		case "Plus":
			return <Plus {...commonProps} />
		default:
			return <BoxIcon {...commonProps} />
	}
}
