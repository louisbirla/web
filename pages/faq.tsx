import { Layout } from '../components/Layout'
import { VStack } from '@chakra-ui/core'
import { Paragraph } from '../components/static/Paragraph'
import { SectionHeading } from '../components/static/SectionHeading'
import { Section } from '../components/static/Section'
import { BlockNav } from '../components/nav/BlockNav'

const FAQPage = () => {
  return (
    <Layout title='FAQ | Loop'>
      <VStack>
        <Section>
          <SectionHeading>FAQ</SectionHeading>
          <BlockNav />
          <Paragraph b>What's the difference between the Block Platform and the Blockchain?</Paragraph>
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
        <BlockNav />
      </VStack>
    </Layout>
  )
}

export default FAQPage
