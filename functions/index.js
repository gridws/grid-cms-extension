import functions from 'firebase-functions'

let firebaseConfig = null

export const server = functions.https.onRequest(async (req, res) => {
	const { NAME, SCHEMA, COLOR, LOGO, PROJECT_ID } = process.env
	const LOGIN = process.env.LOGIN_METHODS.split(',')
	if (!firebaseConfig) firebaseConfig = await fetch(`https://${PROJECT_ID}.firebaseapp.com/__/firebase/init.json`).then((e) => e.json())

	const config = {
		login: LOGIN,
		schema: SCHEMA,
		style: {
			color: COLOR,
			logo: LOGO
		}
	}

	const manifest = {
		name: NAME,
		short_name: NAME,
		theme_color: '#ffffff',
		background_color: '#ffffff',
		display: 'standalone',
		start_url: '/',
		scope: '/',
		icons: [
			{
				src: '/icons/192.png',
				type: 'image/png',
				sizes: '192x192'
			},
			{
				src: '/icons/512.png',
				type: 'image/png',
				sizes: '512x512'
			}
		]
	}

	res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        <link rel="manifest" href='data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}' />
        <link rel="apple-touch-icon" href="icons/512.png" />
        <link rel="apple-touch-startup-image" href="icons/512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body class="light">
        <div id="cms"></div>
        <noscript>Enable JS to continue.</noscript>
        <script type="importmap">{"imports": { "grid-cms": "https://esm.run/grid-cms@1"}}</script>
        <script type="module">
          import { setup } from 'grid-cms'
          setup({
            config: ${JSON.stringify(config)},
            firebaseConfig: ${JSON.stringify(firebaseConfig)}
          })          
        </script>
      </body>
    </html>`)
})
