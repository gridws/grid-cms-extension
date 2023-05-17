import functions from 'firebase-functions'

let config = null

export const server = functions.https.onRequest(async (req, res) => {
	const name = process.env.NAME
	const login = process.env.LOGIN_METHODS.split(',')
	const projectId = process.env.PROJECT_ID
	if (!config) config = await fetch(`https://${projectId}.firebaseapp.com/__/firebase/init.json`).then((e) => e.json())

	const manifest = {
		name: name,
		short_name: name,
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
        <title>${name}</title>
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
        <script type="importmap">{"imports": { "grid-cms": "https://esm.run/grid-cms@alpha"}}</script>
        <script type="module">
          import { setup } from 'grid-cms'
          setup({
            config: {
              login: ${JSON.stringify(login)}
            },
            firebaseConfig: ${JSON.stringify(config)}
          })          
        </script>
      </body>
    </html>`)
})
