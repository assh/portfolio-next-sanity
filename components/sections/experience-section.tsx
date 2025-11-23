import {ImpactList} from '@/components/portfolio/impact-list'
import {NarrativeContent} from '@/components/portfolio/narrative-content'
import {Pill} from '@/components/portfolio/pill'
import {formatPeriod} from '@/lib/date-utils'
import type {Experience} from '@/sanity/types'

type ExperienceSectionProps = {
	items?: Experience[]
}

const employmentLabels: Record<NonNullable<Experience['employmentType']>, string> = {
	fullTime: 'Full-time',
	partTime: 'Part-time',
	contract: 'Contract',
	internship: 'Internship',
}

export const ExperienceSection = ({items}: ExperienceSectionProps) => {
	if (!items?.length) {
		return null
	}

	return (
		<section className='rounded-[36px] border border-zinc-100/40 bg-white/80 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
			<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.4em] text-sky-500'>
						Experience
					</p>
					<h2 className='text-2xl font-semibold text-zinc-900 dark:text-white'>
						Recent impact across teams and ventures
					</h2>
				</div>
				<p className='text-sm text-zinc-500 dark:text-zinc-400 md:max-w-sm'>
					Strategic delivery spanning discovery workshops, engineering execution,
					and scaled rollouts.
				</p>
			</div>
			<div className='mt-8 space-y-8'>
				{items.map((experience) => (
					<article
						key={experience._id}
						className='rounded-3xl border border-zinc-100/60 p-6 shadow-lg shadow-black/5 dark:border-white/10'
					>
						<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
							<div>
								<h3 className='text-xl font-semibold text-zinc-900 dark:text-white'>
									{experience.role}
								</h3>
								<p className='text-sm text-zinc-500 dark:text-zinc-300'>
									{experience.organization} • {experience.location ?? 'Remote'}
								</p>
							</div>
							<p className='text-sm font-medium text-zinc-700 dark:text-zinc-200'>
								{formatPeriod(experience.period)}
							</p>
						</div>
						<div className='mt-4 grid gap-3 md:grid-cols-2'>
							<NarrativeContent value={experience.summary} className='space-y-3' />
							<div>
								<p className='text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400'>
									Focus
								</p>
								<p className='text-sm text-zinc-700 dark:text-zinc-200'>
									{experience.industryFocus ?? 'Multi-industry'}
								</p>
								<p className='mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
									{experience.employmentType
										? employmentLabels[experience.employmentType]
										: 'Engagement'}
								</p>
							</div>
						</div>
						<ImpactList items={experience.highlights} />
						{experience.tooling?.length ? (
							<div className='mt-5 flex flex-wrap gap-2'>
								{experience.tooling.map((tool) => (
									<Pill key={`${experience._id}-${tool}`}>{tool}</Pill>
								))}
							</div>
						) : null}
					</article>
				))}
			</div>
		</section>
	)
}
