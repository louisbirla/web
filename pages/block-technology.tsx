import { Layout } from "../components/Layout"
import { VStack } from "@chakra-ui/core"
import { Paragraph } from "../components/static/Paragraph"
import { SectionHeading } from "../components/static/SectionHeading"
import { Section } from "../components/static/Section"
import { Image } from "../components/static/Image"

const BlockTechnologyPage = () => {
	return (
		<Layout title='Block Technology | Loop'>
			<VStack>
				<Section>
					<SectionHeading>Block Technology</SectionHeading>
					<Paragraph>
						As mentioned before, Blocks fundamentally change how content is created, structured, and shared online
						between people. For example, take a Feeds Block Type used to make a Block called “feed1”. Each paragraph
						within feed1 would be it’s own Block, giving it great flexibility. This means that in addition to Text, even
						Tasks and Chats can be integrated within feed1. Therefore, instead of inviting readers to use a separate
						messaging app and talk about the text/content within feed1 (which many readers will not use because it means
						opening up another app), users can simply use a Chats Block Type within feed1 to initiate a chat stream
						called “chat1”. Because of the inherent modularity and non wasteful replication architecture in this
						technology, the same chat1 can be integrated into any number of similar Feeds (e.g. feed2) or other
						appropriate Blocks (e.g. event1).
					</Paragraph>
					<Paragraph>
						If you are a programmer well versed low-level languages like C or Rust, you will immediately see the
						beneficial advantage of Blocks. In some ways, it is similar to the massively efficient and useful concept of
						“pointers”.
					</Paragraph>
					<Paragraph b>Here is a more technical look at what a Block is:</Paragraph>
					<Image
						src='https://lucid.app/publicSegments/view/f082ca01-c9e1-4448-b3ac-444f0856548b/image.png'
						alt={`Diagram illustrating a Block's parts. There are permissions, properties, Block Types, and data.`}
					/>
					<Paragraph>
						A certain 4 Block types generally provides navigation and organization on Loop, besides searching. These are
						the Feed, Dashboard, Group, and Document blocks. A Dashboard Block is a type of Block that organizes
						layouts. For example, the Loop home screen will be a customizable Dashboard block, where you can add Feeds,
						certain blocks, and position them to your liking. Feeds are a kind of block that can intelligently create a
						stream of Blocks, based on it’s parameters. Common feeds would be Following, Latest, Messages, and Tasks.
						Groups can be thought of as advanced folders, and are an integral building block of Block structure.
						Document blocks are quite straightforwards in terms of interface, but when using Loop as a sort of
						knowledge-base, Documents with connected Blocks is key.
					</Paragraph>
				</Section>
				<Section>
					<SectionHeading>The Block Store</SectionHeading>
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
				</Section>
			</VStack>
		</Layout>
	)
}

export default BlockTechnologyPage
