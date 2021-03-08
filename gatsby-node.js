exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    {
      releases: allGraphCmsRelease(sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
    }
  `)

  if (errors) throw errors

  data.releases.edges.forEach(({ node: { slug }, next, previous }) =>
    createPage({
      path: `/${slug}`,
      component: require.resolve("./src/templates/ReleasePage.js"),
      context: {
        slug,
        next,
        previous,
      },
    })
  )
}
