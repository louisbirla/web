import { Layout } from '../components/Layout'
import { Text, VStack } from '@chakra-ui/core'
import { Paragraph } from '../components/static/Paragraph'
import { SectionHeading } from '../components/static/SectionHeading'
import { Section } from '../components/static/Section'

const BlocksPage = () => {
  return (
    <Layout title='Blocks | Loop'>
      <VStack>
        <Section>
          <SectionHeading>
            The{' '}
            <Text display='inline' color='#28df99'>
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
            <Text display='inline' color='#ffc93c'>
              Block Store
            </Text>{' '}
            &{' '}
            <Text display='inline' color='#fe91ca'>
              Credit Economy
            </Text>
          </SectionHeading>
          <Paragraph>
            Blocks cost a few credits to make, depending on the block type. There is also the option to purchase a block
            type, which costs more but is a one time fee. This allows developers to develop their own blocks, that they
            price however they want, and earn credits from the usage.
          </Paragraph>
          <Paragraph>
            This creates the Block Store, like and app store for blocks. At least for the first year, Blocks will have
            to be made directly by editing the source code of Loop (which will be maintained and beginner-friendly), but
            after this phase, Loop will release a general-purpose programming syntax. Blocks would be made
            cross-platform using this syntax, using libraries supplied by Loop.
          </Paragraph>
          <Paragraph>
            While using Loop is free, certain actions and customizations will cost Loop credits. However, most of the
            exchange of credits will be peer-to-peer such as like buying Block types developed by 3rd party developers
            or buying access to certain Blocks (and their content) that users create. This means that Loop users will
            need credits, and for that there are four options. The first, and the easiest, is to simply use Loop.
            Through a streak system, and achievement system down the line, users will earn a small amount of credits.
            However, this would take time, so another option is to make great content and distribute them via Blocks
            (e.g. an Art exhibition, a live event, or an album). By offering access to these content rich Blocks for
            credits, users can earn money and add valuable Block content to Loop at the same time. A third option will
            appeal to developers, where creating an entirely new block type would mean earning credits every time
            someone uses that developer’s block type (e.g. a game or an fantasy sports app). In this way, everyone wins
            because the developer will earn credits and Loop/users will have an entirely new block type to use. The
            fourth option is the most obvious, which is to simply purchase credits from Loop. Purchasing credits will be
            1-to-1 to the value of credits to the currency, and will add Liquidity to Loop. Then, when people wish to
            exchange credits for a liquid currency, they can do so with a small percentage less than the original 1-to-1
            ratio. This small percentage during exchange of credits to currency is loop’s revenue.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading>
            The{' '}
            <Text display='inline' color='#6eb6ff'>
              Block Platform
            </Text>{' '}
            vs{' '}
            <Text display='inline' color='#28df99'>
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
      </VStack>
    </Layout>
  )
}

export default BlocksPage
