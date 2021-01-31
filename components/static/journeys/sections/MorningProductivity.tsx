import { Journey } from "../Journey"
import { JourneyGroup } from "../JourneyGroup"
import { Steps } from "../Steps"

export const MorningProductivity: React.FC = () => {
	return (
		<JourneyGroup
			name='Morning + Productivity'
			desc='This section shows how someone would catch up in their morning routine.'
		>
			<Journey
				name='I. Checking up with what’s new'
				context={`Mel wakes up in the morning.`}
				intent={`Mel wants to see if anyone’s posted anything, or if she has any tasks.`}
			>
				<Steps
					steps={[
						`Mel opens the Loop app on her phone, which then displays a small & short notification that she has gained a few credits and has a streak of 5 days.`,
						`On the homepage Mel sees the first two habits she needs to do today (Jogging and language lessons), and a few Text blocks from some people she had followed.`,
					]}
				/>
			</Journey>
			<Journey
				name='II. Completing tasks'
				context={`Mel has finished her morning run.`}
				intent={`Mel wants to mark the run as complete.`}
			>
				<Steps
					steps={[
						`She opens the Loop app, where she can see a few tasks. She taps on the check-box to complete it, and it goes away revealing another task.`,
						`Mel wants to see what she’s assigned to herself today, so she opens her to-do feed from her home page and scrolls through it to see.`,
						`(At this point, it’s pretty much like a regular task-managing app.)`,
						`Mel sees a task that she won’t do anymore, so she cancels it.`,
						`She presses the button to add a block, and enters the primary text of the block.
            She also adds a start & due date (Since it’s the to-do page, Loop should know to default to a task block here).`,
					]}
				/>
			</Journey>
		</JourneyGroup>
	)
}
