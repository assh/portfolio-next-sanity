import {NarrativeContent} from '@/components/portfolio/narrative-content'
import type {NarrativePortableText} from '@/sanity/types'

type SummarySectionProps = {
	copy?: NarrativePortableText
}

export const SummarySection = ({copy}: SummarySectionProps) => {
	if (!copy?.length) {
		return null
	}

	return (
		<section className='rounded-[36px] border border-zinc-100/40 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
			<div className='flex flex-col gap-2'>
				<p className='text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500'>
					Narrative
				</p>
				<h2 className='text-2xl font-semibold text-zinc-900 dark:text-white'>
					Product leadership anchored in systems thinking
				</h2>
			</div>
			<NarrativeContent value={copy} className='mt-4 space-y-4' />
		</section>
	)
}
