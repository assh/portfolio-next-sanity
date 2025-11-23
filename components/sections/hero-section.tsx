type Stat = {
	label: string
	value: string
}

type Cta = {
	label: string
	href: string
}

type HeroSectionProps = {
	fullName?: string
	headline?: string
	location?: string
	intro?: string
	stats: Stat[]
	primaryCta?: Cta | null
	secondaryCta?: Cta | null
}

export const HeroSection = ({
	fullName,
	headline,
	location,
	intro,
	stats,
	primaryCta,
	secondaryCta,
}: HeroSectionProps) => {
	return (
		<section className='rounded-[36px] border border-zinc-100/20 bg-white/70 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-white/5 dark:bg-white/5'>
			<p className='text-sm uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400'>
				Crafting Intelligent Experiences
			</p>
			<div className='mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='text-sm font-medium text-zinc-600 dark:text-zinc-300'>
						{location ?? 'Somewhere on the network'}
					</p>
					<h1 className='mt-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl'>
						{fullName ?? 'Your Name'}
					</h1>
					<p className='mt-3 text-xl text-zinc-600 dark:text-zinc-300'>
						{headline ?? 'Product-minded engineer building reliable systems'}
					</p>
				</div>
				<div className='flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-300 md:text-right'>
					<p>
						Currently transforming complex briefs into adaptive, human-centered
						tools.
					</p>
					<p>{intro}</p>
				</div>
			</div>
			<div className='mt-8 grid gap-6 rounded-3xl border border-zinc-100/60 p-6 dark:border-white/10 md:grid-cols-3'>
				{stats.map((stat) => (
					<div key={stat.label} className='flex flex-col'>
						<span className='text-4xl font-semibold text-zinc-900 dark:text-white'>
							{stat.value}
						</span>
						<span className='text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
							{stat.label}
						</span>
					</div>
				))}
			</div>
			<div className='mt-8 flex flex-wrap gap-4'>
				{primaryCta ? (
					<a
						href={primaryCta.href}
						className='rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-black dark:bg-white dark:text-zinc-900'
					>
						{primaryCta.label}
					</a>
				) : null}
				{secondaryCta ? (
					<a
						href={secondaryCta.href}
						className='rounded-full border border-zinc-900/10 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:-translate-y-1 hover:border-zinc-900 hover:text-zinc-900 dark:border-white/20 dark:text-white'
					>
						{secondaryCta.label}
					</a>
				) : null}
			</div>
		</section>
	)
}
