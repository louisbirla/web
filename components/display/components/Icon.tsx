import { IconName } from "display-api"
import { Trash, Unlock } from "react-feather"
import {
	Anchor,
	Archive,
	Award,
	Book,
	Box as BoxIcon,
	CheckCircle,
	Folder,
	IconProps,
	MessageSquare,
	Plus,
	ThumbsDown,
	ThumbsUp,
	Type,
	Bookmark,
	Briefcase,
	Calendar,
	Edit,
	Eye,
	Inbox,
	File,
	FileText,
	Film,
	Filter,
	Flag,
	Gift,
	Heart,
	Image,
	Info,
	Key,
	Lock,
	Map,
	MapPin,
	Minus,
	Send,
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
		case "Anchor":
			return <Anchor {...commonProps} />
		case "Archive":
			return <Archive {...commonProps} />
		case "Award":
			return <Award {...commonProps} />
		case "Book":
			return <Book {...commonProps} />
		case "Bookmark":
			return <Bookmark {...commonProps} />
		case "Box":
			return <BoxIcon {...commonProps} />
		case "Briefcase":
			return <Briefcase {...commonProps} />
		case "Calendar":
			return <Calendar {...commonProps} />
		case "Edit":
			return <Edit {...commonProps} />
		case "Eye":
			return <Eye {...commonProps} />
		case "Feed":
			return <Inbox {...commonProps} />
		case "File":
			return <File {...commonProps} />
		case "FileText":
			return <FileText {...commonProps} />
		case "Film":
			return <Film {...commonProps} />
		case "Filter":
			return <Filter {...commonProps} />
		case "Flag":
			return <Flag {...commonProps} />
		case "Folder":
			return <Folder {...commonProps} />
		case "Gift":
			return <Gift {...commonProps} />
		case "Heart":
			return <Heart {...commonProps} />
		case "Image":
			return <Image {...commonProps} />
		case "Info":
			return <Info {...commonProps} />
		case "Key":
			return <Key {...commonProps} />
		case "Lock":
			return <Lock {...commonProps} />
		case "Map":
			return <Map {...commonProps} />
		case "MapPin":
			return <MapPin {...commonProps} />
		case "Message":
			return <MessageSquare {...commonProps} style={{ marginTop: "4px" }} />
		case "Minus":
			return <Minus {...commonProps} />
		case "Plus":
			return <Plus {...commonProps} />
		case "Send":
			return <Send {...commonProps} />
		case "TaskComplete":
			return <CheckCircle {...commonProps} />
		case "ThumbsDown":
			return <ThumbsDown {...commonProps} />
		case "ThumbsUp":
			return <ThumbsUp {...commonProps} />
		case "Trash":
			return <Trash {...commonProps} />
		case "Type":
			return <Type {...commonProps} />
		case "Unlock":
			return <Unlock {...commonProps} />
		default:
			return <BoxIcon {...commonProps} />
	}
}
