import { Layout } from '../../components/Layout'
import { Text, VStack, Link as ChakraLink } from '@chakra-ui/core'
import { Paragraph } from '../../components/static/Paragraph'
import { SectionHeading } from '../../components/static/SectionHeading'
import { Section } from '../../components/static/Section'
import { Link } from '../../components/basic/Link'
import { LinkStyling } from '../../components/styling/LinkStyling'
import { colors } from '../../utils/theme/colors'
import { BlockNav } from '../../components/nav/BlockNav'

const BlockStorePage = () => {
  return (
    <Layout title='The Block Store | Loop'>
      <VStack>
        <Section>
          <SectionHeading>
            The{' '}
            <Text display='inline' color={colors.gold}>
              Block Store
            </Text>{' '}
            &{' '}
            <Text display='inline' color={colors.pink}>
              Credit Economy
            </Text>
          </SectionHeading>
          <BlockNav />
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
            While using Blocks is free, certain actions and customizations will cost Loop Credits (credits). However,
            most of the exchange of credits will be peer-to-peer such as like buying Block types developed by 3rd party
            developers or buying access to certain Blocks (and their content) that users create. This means that Block
            users will need credits, and for that there are four options. The first, and the easiest, is to simply use
            Blocks (or any other Loop platform). Through a streak system, and achievement system down the line, users
            will earn a small amount of credits. However, this would take time, so another option is to make great
            content and distribute them via Blocks (e.g. an Art exhibition, a live event, or an album). By offering
            access to these content rich Blocks for credits, users can earn money and add valuable Block content to the
            platform at the same time. A third option will appeal to developers, where creating an entirely new block
            type would mean earning credits every time someone uses that developer’s block type (e.g. a game or an
            fantasy sports app). In this way, everyone wins because the developer will earn credits and the
            platform/users will have an entirely new block type to use. The fourth option is the most obvious, which is
            to simply purchase credits from Loop. Purchasing credits will be 1-to-1 to the value of credits to the
            currency, and will add Liquidity to Loop. Then, when people wish to exchange credits for a liquid currency,
            they can do so with a small percentage less than the original 1-to-1 ratio. This small percentage during
            exchange of credits to currency is loop’s revenue (see{' '}
            <LinkStyling>
              <ChakraLink as={Link} href='/#loop-credits-section'>
                Loop Credits
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

export default BlockStorePage
