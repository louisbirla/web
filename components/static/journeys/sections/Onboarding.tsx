import { Journey } from "../Journey"
import { JourneyGroup } from "../JourneyGroup"
import { Steps } from "../Steps"

export const Onboarding: React.FC = () => {
  return (
    <JourneyGroup name='Onboarding' desc='This section shows how new users can use Loop.'>
      <Journey
        name='I. Discovery'
        context={`Evelyn’s friend recommended Loop to her.`}
        intent={`Evelyn wants to see what Loop is and why her friend recommends it.`}
      >
        <Steps
          steps={[
            `Evelyn clicks on the link her friend sent her. There, she skims through the home-page to learn what it’s about.
            There should be many visuals to help explain some of the more complicated concepts, but afterwards Evelyn is intrigued but still a bit confused.`,
            `After making an account a tutorial Block is automatically created for her. She plays around with it until she understands Loop’s concepts.`,
          ]}
        />
      </Journey>
      <Journey
        name='II. Usage'
        context={`Evelyn knows what Loop is and how it works, but doesn’t quite know what she would use it for.`}
        intent={`Evelyn wants to know what she can do with Loop.`}
      >
        <Steps
          steps={[
            `On the home screen, there is a banner for users to get help if they are lost. She clicks it and it brings her the a help block page.`,
            `On the page is a few links, one being use-cases. She clicks on that because she wants to know what she could use it for.`,
            `She is redirected to a document block full of use cases, so she can understand.`,
          ]}
        />
      </Journey>
    </JourneyGroup>
  )
}
