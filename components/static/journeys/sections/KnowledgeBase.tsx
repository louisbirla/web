import { Journey } from '../Journey'
import { JourneyGroup } from '../JourneyGroup'
import { Steps } from '../Steps'

export const KnowledgeBase: React.FC = () => {
  return (
    <JourneyGroup
      name='Knowledge Base'
      desc='This section shows how the modular design of blocks can create amazingly well connected wikis.'
    >
      <Journey
        name='I. Linking'
        context={`Dillan is writing about a mythical creature in his novel.`}
        intent={`Dillan wants to connect the creature to an important character in his story.`}
      >
        <Steps
          steps={[
            `While typing in the document, Dillan types the “/“ key to start the embed of a block.`,
            `He searches for the block (still just by typing) by using “Anthras Medelop by:me” (a query he knows will
              get a the result) and presses enter. Doing that adds the chosen block within the creature’s, so he can
              travel between them easily.`,
          ]}
        />
      </Journey>
      <Journey
        name='II. Reference'
        context={`Dillan forgot the name of the mythical creature he was writing about. He knows it relates to a certain character in his story.`}
        intent={`Dillan knows he added the character to the creature’s block, so he wants to find it by looking at the character block’s tree.`}
      >
        <Steps
          steps={[
            `On the character block’s page, he clicks on the “+9” next to the breadcrumb (“+9” would be the number of
              blocks besides the ones displayed that are connected to this one).`,
            `This expands the breadcrumb to show a tree of where the character block has been used. There he spots the
              mythical creature’s block.`,
          ]}
        />
      </Journey>
    </JourneyGroup>
  )
}
