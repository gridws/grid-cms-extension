# GRID/CMS is installed!

You can test it out right away!
[LOGIN HERE](${function:server.url})

You can alias the function in your hosting setup for a cleaner look using your domain.

```
{
	...
	"hosting": {
		"rewrites": [
			{
				"source": "/admin**",
				"function": "${function:server.name}"
			}
		]
	}
	...
}
```

## Auth and permissions

Make sure Auth is allowed on the domain, and permissions are setup for the schema.
The schema will be saved in Firestore (`/_CMS_/schema`) and the current user will therefore need read/write access.

- If write access is given the user will be able to extend the schema.
- If only read access is given, the user will be able to login and manage data but not extend the schema.

An example of admin access for specific user:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{col}/{doc=**} {
      allow read, write: if request.auth.token.email == 'admin@e-corp.com';
    }
  }
}
```

A more detailed example of full admin and editor access using [Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{col}/{doc=**} {
      allow read: if hasRole(['admin','editor']);
      allow write: if hasRole(['admin']) || (col != '_CMS_' && hasRole(['editor']));
    }
    function hasRole(roles) {
      return request.auth != null && request.auth.token.get("role", null) in roles;
    }
  }
}
```

For further and more advanced setup, please refer the [the docs](https://cms.grid.ws).
