import { Link } from "@chakra-ui/core"
import { colors } from "../../../../utils/theme/colors"
import { Paragraph } from "../../Paragraph"
import { Journey } from "../Journey"
import { JourneyGroup } from "../JourneyGroup"
import { Steps } from "../Steps"

export const QuickNote: React.FC = () => {
	return (
		<JourneyGroup name='Quick Note' desc='This section shows how individual text blocks would work.'>
			<Journey
				name='I. Quickly jotting down a note'
				context={`Dillan is at a park for a walk, and suddenly gets some inspiration for his novel.`}
				intent={`Dillan wants to record a note so that later he can recall what he was thinking.`}
			>
				<Steps
					steps={[
						`Dillan takes his phone out and opens the Loop app. This opens up the home screen, where there is a button to make a new block.`,
						`He taps the button to make a new block, which then shows him a field for where he can enter his note.
            (That button changes default type based on location in app, in this case a Text block)`,
						`He types out the text, and taps the button to confirm it. (I’m thinking that there could be 2 buttons, “Save + Open” and “Save + Close”)`,
						`Dillan is done for now, so he puts his phone away and continues his walk.`,
					]}
				/>
				<Paragraph>
					Note: it is not in the current scope to develop offline support. Dillan will need cellular data for this.
				</Paragraph>
			</Journey>
			<Journey
				name='II. Going back to the note later'
				context={`Dillan has returned home from his walk, and is at his primary workspace.`}
				intent={`Dillan wants to write more about the idea he had jotted down.`}
			>
				<Steps
					steps={[
						`Dillan visits the Loop website on his computer.
            The home screen displays a Dashboard block, that Dillan has configured to show a couple feeds, including one for recent blocks he’s made.
            In that section is displayed the note he made before.`,
						`He clicks on the memo he made, which opens it’s page. This displays the full text he wrote down, so he can re-read it.`,
					]}
				/>
			</Journey>
			<Journey
				name='III. Finding a similar note'
				context={`After re-reading his note, Dillan remembers another note he wrote down before that relates to it.`}
				intent={`Dillan wants to find the note he made before.`}
			>
				<Steps
					steps={[
						<>
							Still on the Loop website from the previous action, he starts typing into the search bar (that there
							should be on every page). Using an in-text filter he searches for only blocks he’s made by including
							"by:me" into the search.
							<sup id='to-3'>
								<Link color={colors.blue} href='/user-journeys#sup-3'>
									3
								</Link>
							</sup>
						</>,
						`He knows it’s text, so he filters it by that also (type:text). This results in a lot of blocks, that he scrolls through to find the one he wants.`,
						`In a menu on the block he found (displayed as a card of text) he clicks to associate it to the one he was on.`,
					]}
				/>
				<Paragraph>
					Now that both of those are connected, whenever he sees one, it’ll show him the other one too.
				</Paragraph>
			</Journey>
		</JourneyGroup>
	)
}
