import type {ImpactHighlight} from '@/sanity/types'

type ImpactListProps = {
	items?: ImpactHighlight[]
}

export const ImpactList = ({items}: ImpactListProps) => {
	if (!items?.length) {
		return null
	}

	return (
		<ul className='mt-4 space-y-3'>
			{items.map((item) => (
				<li
					key={item.metricDescription ?? item.body}
					className='rounded-2xl border border-zinc-100/60 bg-white/80 p-4 text-sm shadow-sm dark:border-white/10 dark:bg-white/5'
				>
					<div className='flex items-baseline justify-between gap-4'>
						<p className='font-medium text-zinc-800 dark:text-white'>
							{item.body}
						</p>
						{item.metricValue ? (
							<span className='text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400'>
								{item.metricValue}
							</span>
						) : null}
					</div>
					{item.metricDescription ? (
						<p className='mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
							{item.metricDescription}
						</p>
					) : null}
				</li>
			))}
		</ul>
	)
}
