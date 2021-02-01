import { NextSeo } from "next-seo"
import ReactGA from "react-ga"
import Head from "next/head"

const description = `The next generation app platform.`

/**
 * Everything needed in the header.
 * Adds icons, metadata, Google Analytics
 */
export const Metadata: React.FC<{ ga?: boolean }> = ({ ga = true }) => {
	ga && ReactGA.initialize("G-V7WFFJCYCW")
	return (
		<>
			<Head>
				<base href='/' />
				<meta charSet='utf-8' />

				<meta
					name='viewport'
					content='viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='format-detection' content='telephone=no' />
				<meta name='msapplication-tap-highlight' content='no' />
				<meta name='author' content='Loop' />
				<meta name='theme-color' content='#000' />
				<meta name='mobile-web-app-capable' content='no' />
				<link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
				<link rel='manifest' href='/icons/site.webmanifest' />
				<link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#466efd' />
				<link rel='shortcut icon' href='/icons/favicon.ico' />
				<meta name='apple-mobile-web-app-title' content='Loop' />
				<meta name='application-name' content='Loop' />
				<meta name='msapplication-TileColor' content='#466efd' />
				<meta name='msapplication-config' content='/icons/browserconfig.xml' />
				<meta name='theme-color' content='#ffffff'></meta>

				<meta name='apple-mobile-web-app-capable' content='no' />
			</Head>
			<NextSeo
				title='Loop'
				description={description}
				canonical='https://loop.page'
				openGraph={{
					description,
					url: "https://loop.page",
					title: "Loop",
					images: [
						{
							url: `https://app.loop.page/light-logo.svg`,
							alt: "Loop Logo",
						},
					],
					site_name: "Loop",
				}}
				twitter={{
					handle: "@loop_revolution",
					site: "https://loop.page",
					cardType: "summary_large_image",
				}}
			/>
		</>
	)
}
