import {Pill} from '@/components/portfolio/pill'
import type {Language, SkillCategory} from '@/sanity/types'

type SkillsMosaicProps = {
	categories?: SkillCategory[]
	languages?: Language[]
}

const proficiencyCopy: Record<NonNullable<Language['proficiency']>, string> = {
	native: 'Native fluency',
	fluent: 'Fluent collaborator',
	professional: 'Professional working',
	conversational: 'Conversational partner',
}

export const SkillsMosaic = ({categories, languages}: SkillsMosaicProps) => {
	if (!categories?.length && !languages?.length) {
		return null
	}

	return (
		<section className='rounded-[36px] border border-zinc-100/40 bg-white/70 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
			<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.4em] text-amber-500'>
						Capabilities
					</p>
					<h2 className='text-2xl font-semibold text-zinc-900 dark:text-white'>
						Toolkits, systems, and languages
					</h2>
				</div>
				<p className='text-sm text-zinc-500 dark:text-zinc-400 md:max-w-sm'>
					Composable stacks tailored per mission while preserving reliable
					scalability.
				</p>
			</div>
			<div className='mt-8 grid gap-5 md:grid-cols-2'>
				{categories?.map((category) => (
					<article
						key={category._id}
						className='rounded-2xl border border-zinc-100/70 p-5 shadow-sm dark:border-white/10'
					>
						<p className='text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-300'>
							{category.label}
						</p>
						<div className='mt-3 flex flex-wrap gap-2'>
							{category.skills?.map((skill) => (
								<Pill key={`${category._id}-${skill}`}>{skill}</Pill>
							))}
						</div>
					</article>
				))}
			</div>
			{languages?.length ? (
				<div className='mt-8 rounded-3xl border border-zinc-100/70 p-6 dark:border-white/10'>
					<p className='text-xs font-semibold uppercase tracking-[0.35em] text-amber-500'>
						Languages
					</p>
					<div className='mt-4 grid gap-4 md:grid-cols-3'>
						{languages.map((language) => (
							<div key={language._id} className='rounded-2xl bg-white/70 p-4 dark:bg-white/5'>
								<p className='text-base font-medium text-zinc-900 dark:text-white'>
									{language.name}
								</p>
								<p className='text-sm text-zinc-500 dark:text-zinc-300'>
									{language.proficiency
										? proficiencyCopy[language.proficiency]
										: 'Working proficiency'}
								</p>
							</div>
						))}
					</div>
				</div>
			) : null}
		</section>
	)
}
