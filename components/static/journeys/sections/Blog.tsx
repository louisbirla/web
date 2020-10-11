import { Paragraph } from '../../Paragraph'
import { Journey } from '../Journey'
import { JourneyGroup } from '../JourneyGroup'
import { Steps } from '../Steps'

export const Blog: React.FC = () => {
  return (
    <JourneyGroup name='Blog' desc='This section shows how subscribing to a blog would work.'>
      <Journey
        name='I. Discovery'
        context={`Browsing around, Evelyn stumbles upon a blog post she really likes.`}
        intent={`Evelyn wants to follow the blog to get updates in her “following” feed.`}
      >
        <Steps
          steps={[
            `On the blog post page, she clicks on the breadcrumb to see the tree for what it’s in.`,
            `She finds the Blog’s block and goes to it’s page.`,
            `She clicks on the follow button to subscribe to that Block’s updates.`,
          ]}
        />
      </Journey>
      <Journey
        name='II. Feed'
        context={`Evelyn has followed the Blog, and resumed her day. The next day, she sees a new Blog post in her feed.`}
      >
        <Paragraph>
          <i>No intention, because she just needs to click it to read it.</i>
        </Paragraph>
      </Journey>
    </JourneyGroup>
  )
}
