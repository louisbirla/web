import { Link } from '@chakra-ui/core'
import { colors } from '../../../../utils/theme/colors'
import { Journey } from '../Journey'
import { JourneyGroup } from '../JourneyGroup'
import { Steps } from '../Steps'

export const CommunalTasks: React.FC = () => {
  return (
    <JourneyGroup
      name='Communal Tasks'
      desc='This section shows how sending tasks can make for enhanced collaboration between a family.'
    >
      <Journey
        name='I. Creation'
        context={`Evelyn’s family has just gotten on Loop.`}
        intent={
          <>
            Evelyn wants to make a base for her family’s chores and communal tasks, and a central location to put
            information about family information, like vacation plans, wish lists, and messaging between the family.
            (She wants to make a dashboard block
            <sup id='to-2'>
              <Link color={colors.blue} href='/user-journeys#sup-2'>
                2
              </Link>
            </sup>
            )
          </>
        }
      >
        <Steps
          steps={[
            `Evelyn clicks on the create block button, which opens a place for the block creation. Since the default
              block type is Text, she clicks on the type button and chooses Dashboard. On the block it says it will cost
              5 credits to create because she does not own the type.`,
            `She adds some sections to the block, including a title and description. She then confirms its creation.`,
            `Using the create block button again, she makes a Chat block in the base. She also adds her family members
              by typing their usernames.`,
            `She buys the Chat block by pressing a button displayed next to the message talked about in step 1.`,
            `She confirms with her family that it is set up correctly.`,
          ]}
        />
      </Journey>
      <Journey
        name='II. Assignment'
        context={`Evelyn has made a dashboard block for her family.`}
        intent={`Evelyn wants to assign some task blocks to her children as chores.`}
      >
        <Steps
          steps={[
            `Evelyn clicks on the create block button, chooses the Task type, and buys the block type.`,
            `She types out the text of the chore, and then adds a due date.`,
            `She clicks on a button to assign the task to someone by typing their username.`,
          ]}
        />
      </Journey>
    </JourneyGroup>
  )
}
