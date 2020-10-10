import { Layout } from '../components/Layout'
import { Text, VStack, Link as ChakraLink, Button } from '@chakra-ui/core'
import { Paragraph } from '../components/static/Paragraph'
import { SectionHeading } from '../components/static/SectionHeading'
import { Section } from '../components/static/Section'
import { Link } from '../components/basic/Link'
import { BookOpen, ExternalLink } from 'react-feather'
import { LinkStyling } from '../components/styling/LinkStyling'
import { colors } from '../utils/theme/colors'

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
        </Section>
        <Section>
          <SectionHeading>
            The{' '}
            <Text display='inline' color={colors.blue}>
              Block Platform
            </Text>{' '}
            vs{' '}
            <Text display='inline' color={colors.green}>
              Blockchain
            </Text>
          </SectionHeading>
          <Paragraph>
            As a clarification, these are different concepts and technologies even though the terms can be a little
            confusing.
          </Paragraph>
          <Paragraph>
            Blockchain technology involves immutable structures called blocks which are cryptographically secure, and
            stored by many different individuals. This is often for keeping track of digital currency as well as for
            decentralized applications where transactional fidelity and security is paramount.
          </Paragraph>
          <Paragraph>
            Loop’s Blocks on the other hand, are stored in Loop’s databases, and are not immutable. They are modular and
            built on top of each-other to access content without replicating the same thing over and over again. Loop’s
            Blocks do not manage a secure registry of transactions.
          </Paragraph>
          <Paragraph>
            That said, the goals of decentralization and certain features of blockchains line up very well with Loop’s
            vision as a company. This is why when Loop matures, and when decentralized technology matures, Loop may
            adopt a decentralized model. However, this is not something that would happen within Loop’s formative years.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>
            <Text color={colors.blue} display='inline'>
              High Level
            </Text>{' '}
            Implementation of{' '}
            <Text color={colors.pink} display='inline'>
              Blocks
            </Text>
          </SectionHeading>
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
        <ChakraLink isExternal href='https://app.lucidchart.com/documents/view/98d13c36-0c61-4c25-b067-d47279344815'>
          <Button
            textDecor='none'
            rightIcon={<ExternalLink size={12} />}
            leftIcon={<BookOpen size={15} />}
            variant='solid'
          >
            Block Diagram
          </Button>
        </ChakraLink>
      </VStack>
    </Layout>
  )
}

export default BlocksPage
