import React from "react"
import { graphql } from "gatsby"
import groupBy from "lodash.groupby"

const Release = ({ slug, title, updates }) => {
  const groupedUpdates = groupBy(updates, ({ tag: { name } }) => name)

  return (
    <div
      key={slug}
      className="bg-white rounded-md shadow-sm border-b border-gray-300 p-4 divide-y divide-gray-200"
    >
      <div className="pb-4">
        <h3 className="text-gray-800 text-xl">{title}</h3>
      </div>
      <div className="space-y-4 pt-4">
        {Object.keys(groupedUpdates).map(tagName => (
          <div>
            <h4 className="text-gray-800 font-medium">{tagName}</h4>
            <ul className="leading-loose">
              {groupedUpdates[tagName].map(({ description, url }, index) => (
                <li key={index} className="text-gray-500">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      className="inline-flex items-center space-x-1 group"
                    >
                      <span>{description}</span>
                      <svg
                        className="w-3 h-3 fill-current group-hover:text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                      </svg>
                    </a>
                  ) : (
                    description
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const { releases } = data

  return (
    <React.Fragment>
      <div className="bg-gray-100 py-12">
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
