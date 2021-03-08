# gatsby-starter-changelog

![Changelog](./preview.png)

## Generating schema

This project uses a specific GraphCMS schema. Before anything else, you'll want to create a GraphCMS project, and obtain your API endpoint, and a Management API token.

Then, run:

```bash
node ./migrations/schema.js -e YOUR_ENDPOINT -t YOUR_TOKEN
```

Once this completes, it will create all the necessary models + fields inside GraphCMS for you automatically.
