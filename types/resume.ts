import type {
	Certification,
	Education,
	Experience,
	Language,
	Project,
	Publication,
	Resume,
	SkillCategory,
} from '@/sanity/types'

export type ResumePayload = Omit<
	Resume,
	'experiences' |
	'projects' |
	'education' |
	'publications' |
	'certifications' |
	'skillCategories' |
	'languages'
> & {
	experiences?: Experience[]
	projects?: Project[]
	education?: Education[]
	publications?: Publication[]
	certifications?: Certification[]
	skillCategories?: SkillCategory[]
	languages?: Language[]
}
