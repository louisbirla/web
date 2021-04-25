import { IconName } from "display-api"
import {
	Box as BoxIcon,
	CheckCircle,
	Folder,
	IconProps,
	MessageSquare,
	Plus,
	Rss,
	ThumbsDown,
	ThumbsUp,
	Type,
} from "react-feather"

export const IconComponent: React.FC<{ name?: IconName; icon?: IconName; color?: string; size?: number | string }> = ({
	name,
	color,
	size = 23,
	icon,
}) => {
	if (color !== "none") {
		color = "#5276f3"
	} else {
		color = undefined
	}
	let commonProps: IconProps = { color, size: size ?? 23 }
	switch (name ?? icon) {
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
		case "ThumbsUp":
			return <ThumbsUp {...commonProps} />
		case "ThumbsDown":
			return <ThumbsDown {...commonProps} />
		default:
			return <BoxIcon {...commonProps} />
	}
}
