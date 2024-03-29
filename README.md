# GRID/CMS EXTENSION

**Author**: GRID (**[https://cms.grid.ws](https://cms.grid.ws)**)

**Description**: Add simple CMS for your project.

**Details**: Use this extension to add one more more instances of [GridCMS](https://cms.grid.ws).

[GridCMS](https://cms.grid.ws) is a simple headless CMS based on Firestore, which allows you to define data types that can easily be managed directly in the system.

The schema is stored in Firestore (`_CMS_/schema` as default) and can be modified either by code or directly in the interface.

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

You'll also need to [deploy Firebase hosting](https://firebase.google.com/docs/firestore/quickstart), for the auto-load of web SDK to work. This can be done via the Firebase CLI.

#### Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 18+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))

**Configuration Parameters:**

- Name of your project: What should the title be?

- Login methods: Which login methods should be activated? (Make sure they are also activated in project settigns)

- OAuth domain: Only relevant if you selected OAuth as login provider.

- OAuth tenant: Only relevant if you selected OAuth as login provider.

- Highlight color: What color should be used in the UI for highlights and buttons?

- Path to logo: Want a custom logo?

- Schema doc path: What's the path to the schema doc?

- Cloud Functions location: Where do you want to host the extension? Preferably it should be the same as your Firestore instance.

**Other Resources**:

- server (firebaseextensions.v1beta.v2function)
