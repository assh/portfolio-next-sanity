import {HeroSection} from '@/components/sections/hero-section'
import {SummarySection} from '@/components/sections/summary-section'
import {ExperienceSection} from '@/components/sections/experience-section'
import {ProjectsShowcase} from '@/components/sections/projects-showcase'
import {SkillsMosaic} from '@/components/sections/skills-mosaic'
import {CredentialsGrid} from '@/components/sections/credentials-grid'
import {ContactSection} from '@/components/sections/contact-section'
import {calculateTenureYears} from '@/lib/date-utils'
import {portableTextToPlainText} from '@/lib/portable-text'
import {client} from '@/sanity/lib/client'
import {resumeQuery} from '@/sanity/lib/queries'
import type {ExternalLink} from '@/sanity/types'
import type {ResumePayload} from '@/types/resume'

export const revalidate = 60

const getResume = async () => {
	return client.fetch<ResumePayload>(resumeQuery)
}

const pickPrimaryLink = (links: Array<ExternalLink & {_key: string}> = []) => {
	return links.find((link) => Boolean(link.url)) ?? links[0]
}

export default async function HomePage() {
	const resume = await getResume()
	const experiences = resume?.experiences ?? []
	const projects = resume?.projects ?? []
	const education = resume?.education ?? []
	const certifications = resume?.certifications ?? []
	const publications = resume?.publications ?? []
	const skillCategories = resume?.skillCategories ?? []
	const languages = resume?.languages ?? []
	const highlightsCount = experiences.reduce(
		(total, experience) => total + (experience.highlights?.length ?? 0),
		0
	)
	const tenureYears = calculateTenureYears(
		experiences.map((experience) => experience.period)
	)
	const heroIntro = portableTextToPlainText(resume?.summary)
	const linkedProjects = projects.flatMap((project) => {
		const links = project.links as Array<ExternalLink & {_key: string}> | undefined
		return links ?? []
	})
	const primaryLink = pickPrimaryLink(linkedProjects)

	return (
		<main className='px-4 py-10 sm:px-6 lg:px-12'>
			<div className='mx-auto flex max-w-6xl flex-col gap-10 pb-16'>
				<HeroSection
					fullName={resume?.fullName}
					headline={resume?.headline}
					location={resume?.location}
					intro={heroIntro}
					stats={[
						{
							label: 'Years in practice',
							value: tenureYears ? `${tenureYears}+` : 'In progress',
						},
						{
							label: 'Product launches',
							value: projects.length ? `${projects.length}+` : 'Curating',
						},
						{
							label: 'Impact highlights',
							value: highlightsCount ? `${highlightsCount}+` : 'Evolving',
						},
					]}
					primaryCta={
						primaryLink?.url
							? {
								label: primaryLink.label ?? 'View highlighted work',
								href: primaryLink.url,
							}
							: null
					}
					secondaryCta={{label: 'Open Studio CMS', href: '/studio'}}
				/>
				<SummarySection copy={resume?.summary} />
				<ExperienceSection items={experiences} />
				<ProjectsShowcase items={projects} />
				<SkillsMosaic categories={skillCategories} languages={languages} />
				<CredentialsGrid
					education={education}
					certifications={certifications}
					publications={publications}
				/>
				<ContactSection
					fullName={resume?.fullName}
					primaryLink={primaryLink}
				/>
			</div>
		</main>
	)
}
