import { IconName } from "display-api"
import { Box as BoxIcon, CheckCircle, Folder, IconProps, MessageSquare, Rss, Type } from "react-feather"

export const IconComponent: React.FC<{ name?: IconName; color: string }> = ({ name, color }) => {
	let commonProps: IconProps = { color, size: 23 }
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
		default:
			return <BoxIcon {...commonProps} />
	}
}
