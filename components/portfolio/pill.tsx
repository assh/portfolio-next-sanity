import type {ReactNode} from 'react'

type PillProps = {
	children: ReactNode
}

export const Pill = ({children}: PillProps) => {
	return (
		<span className='inline-flex items-center rounded-full border border-zinc-100/60 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-zinc-200'>
			{children}
		</span>
	)
}
