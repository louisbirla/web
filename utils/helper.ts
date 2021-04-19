import { isToday, formatDistance, isYesterday, format } from "date-fns"

export const getFormattedTime = (time: string) => {
	let date = new Date(time)
	if (isToday(date)) {
		return `Today, ${formatDistance(date, new Date(), { addSuffix: true, includeSeconds: true })}`
	} else if (isYesterday(date)) {
		return `Yesterday, at ${format(date, "p")}`
	} else {
		return format(date, "PP', at 'p")
	}
}
