import { ListItem, OrderedList, Link } from '@chakra-ui/core'
import { LinkStyling } from '../../styling/LinkStyling'
import { Paragraph } from '../Paragraph'
import { Section } from '../Section'

export const Notes = () => (
  <Section>
    <Paragraph b>Notes</Paragraph>
    <OrderedList>
      <ListItem>
        <Paragraph id='sup-1'>
          Loop’s use case <b>is not pdfs</b>. Whenever wanting to print something out, using a tool like Google Docs
          would be a lot easier. Where Loop fits in is that text can be at the levels of chapters or sections (in the
          example of a novel). In future (way future, probably) release, a way to create pdf-like things could be
          possible, but is not in the current scope.{' '}
          <Link href='/user-journeys#to-1'>
            <LinkStyling>Back</LinkStyling>
          </Link>
        </Paragraph>
      </ListItem>
      <ListItem>
        <Paragraph id='sup-2'>
          A dashboard block would be the type of block the home page is; a place where users can make a custom layout,
          including blocks and feeds. Feeds are a type of block that generate an interface based on parameters like what
          to display. Common ones would include a to-do list feed, a recent blocks feed, and a recent chat messages
          feed.{' '}
          <Link href='/user-journeys#to-1'>
            <LinkStyling>Back</LinkStyling>
          </Link>
        </Paragraph>
      </ListItem>
      <ListItem>
        <Paragraph id='sup-3'>
          Searching would be one of the most important features of Loop. There will be many blocks of all kinds, so
          navigation would be extremely important. Many blocks, like the dashboard, would make it easy to navigate, but
          the easiest would be search.{' '}
          <Link href='/user-journeys#to-3'>
            <LinkStyling>Back</LinkStyling>
          </Link>
        </Paragraph>
      </ListItem>
    </OrderedList>
  </Section>
)
