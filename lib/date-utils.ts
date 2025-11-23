import type {TimePeriod} from '@/sanity/types'

const monthYear = new Intl.DateTimeFormat('en', {
	month: 'short',
	year: 'numeric',
})

export const formatDate = (value?: string | null) => {
	if (!value) {
		return null
	}

	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return value
	}

	return monthYear.format(date)
}

export const formatPeriod = (period?: TimePeriod | null) => {
	if (!period) {
		return 'Timing in progress'
	}

	const startLabel = formatDate(period.startDate) ?? 'TBD'
	const endLabel = formatDate(period.endDate) ?? 'Present'
	return `${startLabel} — ${endLabel}`
}

export const calculateTenureYears = (periods: Array<TimePeriod | undefined>) => {
	const validStarts = periods
		.map((period) => period?.startDate)
		.filter((value): value is string => Boolean(value))

	if (validStarts.length === 0) {
		return 0
	}

	const earliest = validStarts.reduce((min, current) => {
		return new Date(current) < new Date(min) ? current : min
	})

	const firstDate = new Date(earliest)
	const now = new Date()
	const diff = now.getTime() - firstDate.getTime()
	const years = diff / (1000 * 60 * 60 * 24 * 365)
	return Math.max(0, Math.floor(years))
}
