import { Layout } from '../components/Layout'
import { VStack } from '@chakra-ui/core'
import { Paragraph } from '../components/static/Paragraph'
import { SectionHeading } from '../components/static/SectionHeading'
import { Section } from '../components/static/Section'
import { BlockNav } from '../components/nav/BlockNav'

const PitchPage = () => {
  return (
    <Layout title='Elevator Pitch | Loop'>
      <VStack>
        <Section>
          <SectionHeading>Elevator Pitch</SectionHeading>
          <BlockNav />
          <Paragraph>
            There are 2.2 million apps available on the App Store, and 2.8 million on the Google Play Store. There’s no
            way to try out all of them, and less than 2% of the apps integrate with each other at all. Not to mention
            there are hundreds of alternatives for every app you use already, and some might even be life-changers you
            can’t switch to because all of your data is already in another app.
          </Paragraph>
          <Paragraph>
            The Block platform completely changes this scenario. Apps use a common data source, so integration is
            built-in to every single app. Not to mention you can easily switch apps because your data is the same. And
            unlike an app store that you need to download all these apps for, you can pick and choose how much of an app
            you’d like.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>Block Platform Problems & Solutions</SectionHeading>
          <Paragraph b>Proliferation of discrete apps in your life (or devices)</Paragraph>
          <Paragraph>
            It’s rare that people can get what they want, when it comes to software. That’s because nowadays the
            features you get are the features that an app gives you, no more and no less. That’s there are so many
            different apps that do slightly different things, just for a different environment. If someone who can’t
            program wanted to put together some features and make an app specialized for their needs, that would be
            impossible.
          </Paragraph>
          <Paragraph>
            This fact is what sets Loop apart from other apps. The ability to combine features that you want without
            needing the bloat of an entire app means that you can piece together your own app, similar to how you order
            what you want and put it together at a Tapas bar.
          </Paragraph>
          <Paragraph b>The difficulty of switching to new apps due to legacy data</Paragraph>
          <Paragraph>
            Nowadays there are new products launching left and right. Sometimes, these products would be completely
            life-changing for your workflow, but the problem is that you can’t leave what you already use.
          </Paragraph>
          <Paragraph>
            Blocks change that. Apps on our platform all use the same data source, so your data won’t be a casualty when
            swapping to new services.
          </Paragraph>
          <Paragraph b>The lack of integration between apps</Paragraph>
          <Paragraph>
            Or let’s say that you have the latest and greatest “to-do” tracker, that packs so many more features than
            the one you used to use. However it doesn’t integrate with Slack, which you use for messaging.
          </Paragraph>
          <Paragraph>
            On the Block platform, integration isn’t something that an app needs to add. It’s already baked into the app
            as soon as it’s created.
          </Paragraph>
          <Paragraph b>The inefficiencies (and annoyances) of using multiple apps of the same kind</Paragraph>
          <Paragraph>
            Maybe you and your friends recently switched to an amazing new messaging app; but now you need to juggle
            between yet another messaging app to talk to people who haven’t switched.
          </Paragraph>
          <Paragraph>
            On the Block Platform you don’t need ALL of an app, you can just choose what features you want. That way if
            you only stayed with an app because of a small group of people, you wouldn’t have any of the excess bulk.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>A Lego Analogy</SectionHeading>
          <Paragraph>
            Think of Blocks as similar to Lego blocks. Each Lego block comes as a small piece that anyone can use to
            create the shape they want to create (however big or small). Except that these Blocks are not programmer
            functions but apps that have been created using the Block Platform. Blocks behave just like Lego blocks
            where shapes, fitments, colors come standard and inherently usable with other Lego blocks.
          </Paragraph>
        </Section>
        <BlockNav />
      </VStack>
    </Layout>
  )
}

export default PitchPage
