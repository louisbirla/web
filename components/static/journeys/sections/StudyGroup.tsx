import { Heading } from '@chakra-ui/core'
import { Paragraph } from '../../Paragraph'
import { Section } from '../../Section'
import { Steps } from '../Steps'

export const StudyGroup = () => (
  <Section>
    <Heading size='md'>Study Group</Heading>
    <Paragraph>This section shows how messaging and collaboration would work.</Paragraph>
    <Paragraph>
      <b>Sal</b> is having trouble with some school work. They want to ask the study group for help.
    </Paragraph>
    <Paragraph>
      <b>Dillan</b> is working on his side-project, his novel, in Google Doc (while consulting the knowledge-base he
      made on Loop)
    </Paragraph>
    <Steps
      steps={[
        `Sal opens the Loop website and goes to the enter page.`,
        `They enter their username and password to log in.`,
        `On the home page, they click the to page where they can see chats, and click on the study group chat.`,
        `Here, the interface changes more like a messenger, but still retains search, block creation, and other parts of the interface that remain the same throughout.`,
        `Sal clicks on the message input to send a message (behind the scenes, this makes a Text block) and asks for some help. They offer to pay whoever can tutor them with some credits.`,
        `Dillan receives a notification and clicks on it to move to the chat page. He reads the message and wants to help, so he replies that he wants to help.`,
        `Within the messenger interface, Dillan clicks on a “+” button and chooses a chat type, to make and send a Chat block.`,
        `Dillan clicks on the chat block that is in chat (displayed as the chat’s name & number of messages) to open that one.`,
        `As like before, Dillan sends a message asking Sal for more information.`,
        `Sal sees this and opens the chat Dillan sent.`,
        `They chat/discuss (I’d imagine they would video call of some kind, that is not a Loop feature).`,
        `Throughout the discussion, Dillan sends some document blocks he’s made before in the chat, by pressing the “+” button as before but choosing an existing block, and searching for it.`,
        `Sal and Dillan conclude talking, and so Sal clicks on Dillan’s profile picture, which brings Dillan’s page. They click on a button to send credits, and type the amount. Sal then clicks a button to confirm the transaction.`,
        `Dillan receives the notification for the transaction, and accepts it.`,
      ]}
    />
  </Section>
)
