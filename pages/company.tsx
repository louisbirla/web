import { Layout } from "../components/Layout"
import { VStack } from "@chakra-ui/core"
import { Paragraph } from "../components/static/Paragraph"
import { SectionHeading } from "../components/static/SectionHeading"
import { Section } from "../components/static/Section"

const CompanyPage = () => {
  return (
    <Layout title='Company | Loop'>
      <VStack>
        <Section>
          <SectionHeading>Loop Revolution</SectionHeading>
          <Paragraph>
            Loop Revolution, known as Loop, is a company whose purpose is to create innovative platforms, in a manner
            that is ethical, transparent, extensible and forward-thinking.
          </Paragraph>
          <Paragraph>
            As a company with humble beginnings, Loop is more appealing than large corporations because nothing is
            behind the curtains. Because everything is readily available for anyone to inspect, users can use and extend
            Loop’s platforms with 100% trust.
          </Paragraph>
          <Paragraph>
            Loop’s platforms will primarily be about open-source and extensible software. Open-source software means
            that the source code is readily available to and can be improved upon by anyone. While anybody is free to
            use the code for personal use, commercial replication will not be allowed.
          </Paragraph>
        </Section>
        <Section>
          <SectionHeading id='loop-credits-section'>Loop Credits</SectionHeading>
          <Paragraph>
            Loop Credits (credits) is a global currency used by Loop users. Instead of using currencies such as USD,
            Euro or Ethereum, Loop users can use their credits for actions within Loop, such as purchasing Block types
            and special settings. In general however, new users start with a certain number of credits for free and can
            start earning more through usage, watching voluntary advertisements, purchasing advanced features or selling
            content to other users. Credits can also be purchased from Loop. Credits will initially be implemented in a
            straightforward secure manner using a combination of Loop data structures and commercial payment gateways.
            Later on, Loop may use Blockchain technology for additional scale, security and fidelity.
          </Paragraph>
          <Paragraph>
            Most of the exchange of credits, however, will be peer-to-peer such as like buying Block types developed by
            3rd party developers or buying access to certain Blocks (and their content) that users create. Through a
            streak system, and achievement system down the line, users will earn a small amount of credits. However,
            this would take time, so another option is to make great content and distribute them via Blocks (e.g. an Art
            exhibition, a live event, or an album). By offering access to these content rich Blocks for credits, users
            can earn money and add valuable Block content to the platform at the same time. A third option will appeal
            to developers, where creating an entirely new block type would mean earning credits every time someone uses
            that developer’s block type (e.g. a game or an fantasy sports app). In this way, everyone wins because the
            developer will earn credits and the platform/users will have an entirely new block type to use. The fourth
            option is the most obvious, which is to simply purchase credits from Loop. Purchasing credits will be 1-to-1
            to the value of credits to the currency, and will add Liquidity to Loop. Then, when people wish to exchange
            credits for a liquid currency, they can do so with a small percentage less than the original 1-to-1 ratio.
          </Paragraph>
          <Paragraph>
            Loop’s revenue comes from charging a % transaction fees when a user exchanges their credits for real-world
            money.
          </Paragraph>
        </Section>
      </VStack>
    </Layout>
  )
}

export default CompanyPage
