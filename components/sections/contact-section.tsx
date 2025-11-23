type ContactSectionProps = {
	fullName?: string
	primaryLink?: {label?: string; url?: string} | null
}

export const ContactSection = ({fullName, primaryLink}: ContactSectionProps) => {
	return (
		<section className='rounded-[36px] border border-zinc-100/40 bg-gradient-to-br from-zinc-900 to-black p-8 text-white shadow-[0_40px_140px_rgba(0,0,0,0.35)]'>
			<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300'>
						Collaborate
					</p>
					<h2 className='mt-3 text-3xl font-semibold tracking-tight'>
						Let’s architect the next chapter together
					</h2>
					<p className='mt-2 text-sm text-zinc-200 md:max-w-2xl'>
						{fullName ?? 'This practice'} builds with intention—pairing principled
						strategy with biased-for-delivery execution.
					</p>
				</div>
				{primaryLink?.url ? (
					<a
						href={primaryLink.url}
						target='_blank'
						rel='noreferrer'
						className='rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-black/30 transition hover:-translate-y-1'
					>
						{primaryLink.label ?? 'Open highlighted work'}
					</a>
				) : (
					<p className='text-sm text-zinc-300'>
						Add a project link inside Sanity to surface a contact or booking CTA
						here.
					</p>
				)}
			</div>
		</section>
	)
}
