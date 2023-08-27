import { onRequest } from 'firebase-functions/v1/https'

let firebaseConfig = null

export const server = onRequest(async (req, res) => {
	const { NAME, SCHEMA, COLOR, LOGO, PROJECT_ID, OAUTH_TENANT, OAUTH_DOMAIN } = process.env
	const LOGIN = process.env.LOGIN_METHODS.split(',')
	if (!firebaseConfig) firebaseConfig = await fetch(`https://${PROJECT_ID}.firebaseapp.com/__/firebase/init.json`).then((e) => e.json())

	const config = {
		login: LOGIN,
		oauth_tenant: OAUTH_TENANT,
		oauth_domain: OAUTH_DOMAIN,
		schema: SCHEMA,
		style: {
			color: COLOR,
			logo: LOGO
		}
	}

	const manifest = {
		name: NAME,
		short_name: NAME,
		start_url: '/',
		scope: '/',
		theme_color: '#ffffff',
		background_color: '#ffffff',
		display: 'standalone',
		icons: [
			{
				src: 'https://cdn.jsdelivr.net/npm/grid-cms@1/dist/icon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
				purpose: 'any'
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
