import { Layout } from '../components/Layout'
import { Text, VStack, Link as ChakraLink } from '@chakra-ui/core'
import { Paragraph } from '../components/static/Paragraph'
import { SectionHeading } from '../components/static/SectionHeading'
import { Section } from '../components/static/Section'
import { LinkStyling } from '../components/styling/LinkStyling'
import { colors } from '../utils/theme/colors'
import { BlockNav } from '../components/nav/BlockNav'
import { Image } from '../components/static/Image'

const BlocksPage = () => {
  return (
    <Layout title='Blocks | Loop'>
      <VStack>
        <Section>
          <SectionHeading>
            The{' '}
            <Text display='inline' color={colors.green}>
              Block Platform
            </Text>
          </SectionHeading>
          <BlockNav />
          <Paragraph>
            The first product of Loop is the Block platform. This is a network of individual nodes called Blocks. Blocks
            all have the same fundamental properties, such as permissions, types, and more. The power of Blocks comes
            from the fact that Blocks have other Blocks as properties, which creates an extremely modular structure,
            which in turn provides many advantages over how things work today in the online content sharing world.
          </Paragraph>
          <Paragraph>
            Each Block has a type associated with it. Simple types include Text and Numbers. Complex types could be an
            entire game within a Block. The types that Loop will produce first are Chats, Tasks, and Documents. These
            Block Types are like micro-apps within Loop, that have the bonus of being built up of Blocks.
          </Paragraph>
          <Image
            src='https://lucid.app/publicSegments/view/3d93066e-dab2-4986-93e1-d69a069779d1/image.png'
            alt={`Diagram illustrating the differences between how apps work vs how Blocks work.
            There are many apps in the app model, while the Block model has the functions individually.`}
          />
          <Paragraph>
            As mentioned before, Blocks fundamentally change how content is created, structured, and shared online
            between people. For example, take a Feeds Block Type used to make a Block called “feed1”. Each paragraph
            within feed1 would be it’s own Block, giving it great flexibility. This means that in addition to Text, even
            Tasks and Chats can be integrated within feed1. Therefore, instead of inviting readers to use a separate
            messaging app and talk about the text/content within feed1 (which many readers will not use because it means
            opening up another app), users can simply use a Chats Block Type within feed1 to initiate a chat stream
            called “chat1”. Because of the inherent modularity and non wasteful replication architecture within the
            Block platform, the same chat1 can be integrated into any number of similar Feeds (e.g. feed2) or other
            appropriate Blocks (e.g. event1).
          </Paragraph>
          <Image
            src='https://lucid.app/publicSegments/view/9c37b043-4c66-4437-b692-7330d100045e/image.png'
            alt={`Diagram illustrating the differences between a traditional messaging app and a chat block.
            The chat block is composed of many other blocks, while the messaging app is full of links and bad functionality.`}
          />
          <Paragraph>
            In addition, using this modular architecture, complex apps can be broken down into simple transportable
            pieces. Take embedding a quote from a document for example. Today, one option is to link to the document, so
            that readers can find the original document. Another option is to copy and paste the quote itself, which
            creates redundancy and requires extra work to keep the quote updated. With Blocks however, one can embed a
            Quote Block (quote1) directly into one’s Document Block (document1). Each time a user changes quote1,
            document1 will automatically inherit the change!
          </Paragraph>
          <Paragraph>
            If you are a programmer well versed with “C”, you will immediately see the beneficial advantage of Blocks.
            In some ways, it is similar to the massively efficient and useful concept of “pointers”.
          </Paragraph>
          <Paragraph b>Here is a more technical look at what a Block is:</Paragraph>
          <Image
            src='https://lucid.app/publicSegments/view/f082ca01-c9e1-4448-b3ac-444f0856548b/image.png'
            alt={`Diagram illustrating a Block's parts. There are permissions, properties, Block Types, and data.`}
          />
          <Paragraph>
            Blocks will be available as iOS, Android, and web applications, powered by an Open API (located at{' '}
            <LinkStyling>
              <ChakraLink href='https://api.loop.page' isExternal>
                api.loop.page
              </ChakraLink>
            </LinkStyling>
            ).
          </Paragraph>
        </Section>
        <BlockNav />
      </VStack>
    </Layout>
  )
}

export default BlocksPage
