import { NextSeo } from 'next-seo'
import ReactGA from 'react-ga'
import Head from 'next/head'
import { useBlackOrWhite } from '../utils/theme/useBlackOrWhite'

const description = `Creating innovative platforms, in a manner that is ethical, transparent, extensible and forward-thinking.`
const name = 'Loop'
const iconPath = '/donuts'

/**
 * Everything needed in the header.
 * Adds icons, metadata, Google Analytics
 */
export const Metadata: React.FC = () => {
  ReactGA.initialize('G-V7WFFJCYCW')
  const { color } = useBlackOrWhite()
  return (
    <>
      <Head>
        <base href='/' />
        <meta charSet='utf-8' />

        <meta
          name='viewport'
          content='viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='author' content='Loop' />
        <meta name='theme-color' content='#000' />
        <meta name='mobile-web-app-capable' content='no' />

        <link rel='shortcut icon' type='image/png' href={`${iconPath}/${color}-donut.png`} />
        <meta name='apple-mobile-web-app-capable' content='no' />
      </Head>
      <NextSeo
        title={name}
        description={description}
        canonical='https://loop.page'
        openGraph={{
          description,
          url: 'https://loop.page',
          title: name,
          images: [
            {
              url: `https://loop.page${iconPath}/black-donut.png`,
              alt: 'Loop Logo',
            },
          ],
          site_name: name,
        }}
        twitter={{
          handle: '@nilaeus',
          site: '@loop_revolution',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}
