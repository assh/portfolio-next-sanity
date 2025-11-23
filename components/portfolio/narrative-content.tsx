import type {NarrativePortableText} from '@/sanity/types'

type NarrativeContentProps = {
	value?: NarrativePortableText
	className?: string
}


const isPortableArray = (
	blocks?: NarrativePortableText
): blocks is NarrativePortableText => Array.isArray(blocks)

export const NarrativeContent = ({
	value,
	className,
}: NarrativeContentProps) => {
	if (!isPortableArray(value) || value.length === 0) {
		return null
	}

	return (
		<div className={className}>
			{value.map((block) => {
				if (!Array.isArray(block.children) || block.children.length === 0) {
					return null
				}

				const markMap = new Map(block.markDefs?.map((def) => [def._key, def]))
				return (
					<p key={block._key} className='text-base leading-7 text-zinc-600 dark:text-zinc-300'>
						{block.children.map((child) => {
							if (!child._key) {
								return null
							}

							if (!child.marks?.length) {
								return (
									<span key={child._key}>{child.text}</span>
								)
							}

							const linkMark = child.marks
								.map((markKey) => markMap.get(markKey))
								.find((mark): mark is {href?: string; _type?: string; _key?: string} =>
									Boolean(mark?.href)
								)

							if (!linkMark?.href) {
								return (
									<span key={child._key}>{child.text}</span>
								)
							}

							return (
								<a
									key={child._key}
									href={linkMark.href}
									target='_blank'
									rel='noreferrer'
									className='font-medium text-zinc-900 underline decoration-dotted underline-offset-4 dark:text-white'
								>
									{child.text}
								</a>
							)
						})}
					</p>
				)
			})}
		</div>
	)
}
