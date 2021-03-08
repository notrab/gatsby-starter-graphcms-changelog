import React from "react"
import { graphql } from "gatsby"

import Release from "../components/Release"

const IndexPage = ({ data }) => {
  const { releases } = data

  return (
    <React.Fragment>
      <div className="px-3 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl text-gray-800 mb-8">Changelog</h1>

          <div className="space-y-4 md:space-y-6">
            {releases.nodes.map(Release)}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query IndexPageQuery {
    releases: allGraphCmsRelease(sort: { fields: createdAt, order: ASC }) {
      totalCount
      nodes {
        title
        slug
        updates {
          url
          tag {
            name
          }
          description
        }
        url
      }
    }
  }
`

export default IndexPage
