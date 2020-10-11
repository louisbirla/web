import { Link } from '@chakra-ui/core'
import { colors } from '../../../utils/theme/colors'
import { Paragraph } from '../Paragraph'
import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'

export const Personas = () => (
  <Section>
    <SectionHeading>Personas</SectionHeading>
    <Paragraph>These are fictional people who each represent a group of users.</Paragraph>
    <Paragraph b>Dillan</Paragraph>
    <Paragraph id='to-1'>
      A university student with aspirations of being a writer. He is part of a study group that is on Loop. He is
      writing a novel, so he uses Loop as a knowledge-base for the book he is writing, but not the actual book itself.
      (Tools like Microsoft Word or Google Docs would suit this task better as of the first release of Loop
      <sup>
        <Link color={colors.blue} href='/user-journeys#sup-1'>
          1
        </Link>
      </sup>
      )
    </Paragraph>
    <Paragraph>
      Dillan represents the kind of user who is generally well acquainted with technology, and who have a social purpose
      for using Loop, in addition to a functional one (the modular knowledge-base).
    </Paragraph>
    <Paragraph b>Sal</Paragraph>
    <Paragraph>
      A student who attends the same university as Dillan. Both Dillan and Sal are part of the same study group, but Sal
      doesn’t use Loop that much outside of the group chats.
    </Paragraph>
    <Paragraph>Sal represents the group of users who would use Loop for a purely social reason.</Paragraph>
    <Paragraph b>Evelyn</Paragraph>
    <Paragraph>
      A mother in a family who all use Loop. They use it as a common task manager, a place for storing their family’s
      useful links, things to share, and messenger.
    </Paragraph>
    <Paragraph>
      Evelyn and her family represent the users who use Loop as a place for collaboration as a group, and as a
      collection of useful apps.
    </Paragraph>
    <Paragraph b>Mel</Paragraph>
    <Paragraph>
      A manager at a company. She uses Loop as a personal diary, and as a to-do tracker. Mel represents the group of
      users who use group as a personal tool, not a social one.
    </Paragraph>
  </Section>
)
