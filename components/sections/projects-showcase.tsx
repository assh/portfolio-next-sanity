import {ImpactList} from '@/components/portfolio/impact-list'
import {NarrativeContent} from '@/components/portfolio/narrative-content'
import {Pill} from '@/components/portfolio/pill'
import {formatPeriod} from '@/lib/date-utils'
import type {ExternalLink, ImpactHighlight, Project} from '@/sanity/types'

type ProjectsShowcaseProps = {
	items?: Project[]
}

const getPrimaryLink = (links?: Array<ExternalLink & {_key: string}>) => {
	if (!links?.length) {
		return null
	}

	return links.find((link) => Boolean(link.url)) ?? links[0]
}

export const ProjectsShowcase = ({items}: ProjectsShowcaseProps) => {
	if (!items?.length) {
		return null
	}

	return (
		<section className='rounded-[36px] border border-zinc-100/40 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.1)] dark:border-white/10 dark:from-white/5 dark:to-white/0'>
			<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.4em] text-violet-500'>
						Projects
					</p>
					<h2 className='text-2xl font-semibold text-zinc-900 dark:text-white'>
						High-leverage builds and experiments
					</h2>
				</div>
				<p className='text-sm text-zinc-500 dark:text-zinc-400 md:max-w-sm'>
					From rapid PoCs to enterprise rollouts, these initiatives delivered
					tangible momentum.
				</p>
			</div>
			<div className='mt-8 grid gap-6 lg:grid-cols-2'>
				{items.map((project) => {
					const primaryLink = getPrimaryLink(
						(project.links as Array<ExternalLink & {_key: string}>) ?? []
					)
					return (
						<article
							key={project._id}
							className='rounded-3xl border border-zinc-100/60 bg-white/70 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5'
						>
							<div className='flex items-center justify-between gap-4'>
								<div>
									<h3 className='text-xl font-semibold text-zinc-900 dark:text-white'>
										{project.title}
									</h3>
									<p className='text-sm text-zinc-500 dark:text-zinc-300'>
										{project.role ?? 'Product partner'}
									</p>
								</div>
								<p className='text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-300'>
									{project.status ?? 'In motion'}
								</p>
							</div>
							<p className='mt-2 text-sm text-zinc-500 dark:text-zinc-300'>
								{formatPeriod(project.period)}
							</p>
							<NarrativeContent value={project.summary} className='mt-4 space-y-3' />
							{project.technologies?.length ? (
								<div className='mt-4 flex flex-wrap gap-2'>
									{project.technologies.map((tech) => (
										<Pill key={`${project._id}-${tech}`}>{tech}</Pill>
									))}
								</div>
							) : null}
							<ImpactList
								items={project.highlights as ImpactHighlight[] | undefined}
							/>
							{primaryLink?.url ? (
								<a
									href={primaryLink.url}
									target='_blank'
									rel='noreferrer'
									className='mt-4 inline-flex items-center text-sm font-medium text-violet-600 underline decoration-dotted underline-offset-4 hover:text-violet-800 dark:text-violet-300'
								>
									{primaryLink.label ?? 'View project'} →
								</a>
							) : null}
						</article>
					)
				})}
			</div>
		</section>
	)
}
