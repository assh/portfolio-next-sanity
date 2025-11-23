import type {NarrativePortableText} from '@/sanity/types'

export const portableTextToPlainText = (
	value?: NarrativePortableText
) => {
	if (!value?.length) {
		return ''
	}

	return value
		.map((block) => {
			if (block._type !== 'block' || !block.children) {
				return ''
			}

			return block.children.map((child) => child.text ?? '').join('')
		})
		.filter(Boolean)
		.join(' ')
}
