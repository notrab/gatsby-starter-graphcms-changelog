#!/usr/bin/env node

const meow = require("meow")
const {
  newMigration,
  FieldType,
  Renderer,
  RelationType,
} = require("@graphcms/management")

const cli = meow(
  `
Options:
  --endpoint,   -e    Your GraphCMS endpoint
  --token,      -t    Your GraphCMS auth token
`,
  {
    flags: {
      endpoint: {
        type: "string",
        alias: "e",
        isRequired: true,
      },
      token: {
        type: "string",
        alias: "t",
        isRequired: true,
      },
    },
  }
)

async function main(cli) {
  const { endpoint, token } = cli.flags

  const migration = newMigration({ authToken: token, endpoint })

  const tag = migration.createModel({
    apiId: "Tag",
    apiIdPlural: "Tags",
    displayName: "Tag",
  })

  tag.addSimpleField({
    apiId: "name",
    displayName: "Name",
    type: FieldType.String,
    isTitle: true,
    description: "New? Improved? Enhancement? Fixed? etc.",
  })

  const update = migration.createModel({
    apiId: "Update",
    apiIdPlural: "Updates",
    displayName: "Update",
  })

  update.addSimpleField({
    apiId: "description",
    displayName: "Description",
    type: FieldType.String,
    formRenderer: Renderer.MultiLine,
    isRequired: true,
    isTitle: true,
  })

  update.addSimpleField({
    apiId: "url",
    displayName: "URL",
    type: FieldType.String,
    displayName: "Can people read more about this specific update?",
  })

  const release = migration.createModel({
    apiId: "Release",
    apiIdPlural: "Releases",
    displayName: "Release",
  })

  release.addSimpleField({
    apiId: "title",
    displayName: "Title",
    type: FieldType.String,
    isRequired: true,
    isTitle: true,
    description: "What's the title of the release? Could be day, semver, etc.",
  })

  // Currently not possible to create slugs via the Management SDK:
  // release.addSimpleField({
  //   apiId: "slug",
  //   displayName: "Slug",
  //   type: FieldType.String,
  //   formRenderer: "GCMS_SLUG",
  //   formConfig: {
  //     isLowercase: true,
  //     automaticSlug: "{title}-slug",
  //     shouldGenerateAutomatically: true,
  //   },
  //   isUnique: true,
  // })

  release.addSimpleField({
    apiId: "slug",
    displayName: "Slug",
    type: FieldType.String,
    isUnique: true,
  })

  release.addSimpleField({
    apiId: "url",
    displayName: "URL",
    type: FieldType.String,
    displayName: "Is there an external link to view more about this release?",
  })

  update.addRelationalField({
    apiId: "releases",
    displayName: "Releases",
    relationType: RelationType.OneToMany,
    model: "Release",
    reverseField: {
      apiId: "update",
      displayName: "Update",
    },
  })

  tag.addRelationalField({
    apiId: "updates",
    displayName: "Updates",
    relationType: RelationType.OneToMany,
    model: "Update",
    reverseField: {
      apiId: "tag",
      displayName: "Tag",
    },
  })

  migration
    .run(true)
    .then(() => console.log("Done!"))
    .catch(e => {
      console.log("Something went wrong performing the migration")
      console.error("error:", e)
    })
}

main(cli)
