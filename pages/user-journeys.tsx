import { Layout } from "../components/Layout"
import { VStack } from "@chakra-ui/core"
import { SectionHeading } from "../components/static/SectionHeading"
import { Section } from "../components/static/Section"
import { Paragraph } from "../components/static/Paragraph"
import { KnowledgeBase } from "../components/static/journeys/sections/KnowledgeBase"
import { CommunalTasks } from "../components/static/journeys/sections/CommunalTasks"
import { Notes } from "../components/static/journeys/Notes"
import { Personas } from "../components/static/journeys/Personas"
import { QuickNote } from "../components/static/journeys/sections/QuickNote"
import { MorningProductivity } from "../components/static/journeys/sections/MorningProductivity"
import { Blog } from "../components/static/journeys/sections/Blog"
import { Onboarding } from "../components/static/journeys/sections/Onboarding"
import { StudyGroup } from "../components/static/journeys/sections/StudyGroup"

const JourneysPage = () => {
	return (
		<Layout title='User Journeys | Loop'>
			<VStack>
				<Section>
					<SectionHeading>User Journeys</SectionHeading>
					<Paragraph>
						These are made-up scenarios for what a first release of Loop would look like. This does not represent all of
						the features Loop is planned to have, or any that come after what I think would be feasible for a first
						launch.
					</Paragraph>
				</Section>
				<Personas />
				<SectionHeading>Journeys</SectionHeading>
				<KnowledgeBase />
				<StudyGroup />
				<CommunalTasks />
				<QuickNote />
				<MorningProductivity />
				<Blog />
				<Onboarding />
				<Notes />
			</VStack>
		</Layout>
	)
}

export default JourneysPage
