import {NarrativeContent} from '@/components/portfolio/narrative-content'
import {formatDate, formatPeriod} from '@/lib/date-utils'
import type {
	Certification,
	Education,
	Publication,
} from '@/sanity/types'

type CredentialsGridProps = {
	education?: Education[]
	certifications?: Certification[]
	publications?: Publication[]
}

export const CredentialsGrid = ({
	education,
	certifications,
	publications,
}: CredentialsGridProps) => {
	if (!education?.length && !certifications?.length && !publications?.length) {
		return null
	}

	return (
		<section className='rounded-[36px] border border-zinc-100/40 bg-white/80 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/5'>
			<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.4em] text-rose-500'>
						Credentials
					</p>
					<h2 className='text-2xl font-semibold text-zinc-900 dark:text-white'>
						Learning loops and recognition
					</h2>
				</div>
				<p className='text-sm text-zinc-500 dark:text-zinc-400 md:max-w-sm'>
					Continuous discovery through formal study, certifications, and
					publications.
				</p>
			</div>
			<div className='mt-8 grid gap-5 lg:grid-cols-3'>
				{education?.map((entry) => (
					<article
						key={entry._id}
						className='rounded-3xl border border-zinc-100/60 p-5 shadow-sm dark:border-white/10'
					>
						<p className='text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400'>
							Education
						</p>
						<h3 className='mt-1 text-lg font-semibold text-zinc-900 dark:text-white'>
							{entry.degree}
						</h3>
						<p className='text-sm text-zinc-500 dark:text-zinc-300'>
							{entry.institution}
						</p>
						<p className='mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400'>
							{formatPeriod(entry.period)}
						</p>
						<NarrativeContent value={entry.summary} className='mt-3 space-y-3 text-sm' />
					</article>
				))}
				{certifications?.map((cert) => (
					<article
						key={cert._id}
						className='rounded-3xl border border-zinc-100/60 p-5 shadow-sm dark:border-white/10'
					>
						<p className='text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400'>
							Certification
						</p>
						<h3 className='mt-1 text-lg font-semibold text-zinc-900 dark:text-white'>
							{cert.name}
						</h3>
						<p className='text-sm text-zinc-500 dark:text-zinc-300'>
							{cert.issuer}
						</p>
						<p className='mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
							Issued {formatDate(cert.issuedAt) ?? 'recently'}
						</p>
						{cert.verificationUrl ? (
							<a
								href={cert.verificationUrl}
								target='_blank'
								rel='noreferrer'
								className='mt-4 inline-flex items-center text-sm font-medium text-rose-600 underline decoration-dotted underline-offset-4 hover:text-rose-800 dark:text-rose-300'
							>
								Verify credential →
							</a>
						) : null}
					</article>
				))}
				{publications?.map((publication) => (
					<article
						key={publication._id}
						className='rounded-3xl border border-zinc-100/60 p-5 shadow-sm dark:border-white/10'
					>
						<p className='text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400'>
							Publication
						</p>
						<h3 className='mt-1 text-lg font-semibold text-zinc-900 dark:text-white'>
							{publication.title}
						</h3>
						<p className='text-sm text-zinc-500 dark:text-zinc-300'>
							{publication.publisher}
						</p>
						<p className='mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
							{formatDate(publication.publishedAt)}
						</p>
						<NarrativeContent value={publication.summary} className='mt-3 space-y-3 text-sm' />
						{publication.links?.[0]?.url ? (
							<a
								href={publication.links[0].url}
								target='_blank'
								rel='noreferrer'
								className='mt-4 inline-flex items-center text-sm font-medium text-rose-600 underline decoration-dotted underline-offset-4 hover:text-rose-800 dark:text-rose-300'
							>
								Read publication →
							</a>
						) : null}
					</article>
				))}
			</div>
		</section>
	)
}
