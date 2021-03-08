import React from "react"
import { Link, graphql } from "gatsby"
import groupBy from "lodash.groupby"

import ReleaseUpdate from "../components/ReleaseUpdate"

const ReleasePage = ({ pageContext, data }) => {
  const { next, previous } = pageContext
  const { release } = data

  const groupedUpdates = groupBy(release.updates, ({ tag: { name } }) => name)

  return (
    <React.Fragment>
      <div className="px-3 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl text-gray-800 mb-8">{release.title}</h1>

          <div className="bg-white rounded-md shadow-sm border-b border-gray-300 p-4 space-y-4">
            {Object.keys(groupedUpdates).map(tagName => (
              <div>
                <h4 className="text-gray-800 font-medium">{tagName}</h4>
                <ul className="leading-loose">
                  {groupedUpdates[tagName].map(ReleaseUpdate)}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between py-6">
            {previous && (
              <Link
                to={`/${previous.slug}`}
                className="inline-flex items-center space-x-1 group"
              >
                <svg
                  className="w-5 h-5 fill-current group-hover:text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
                </svg>
                <span>{previous.title}</span>
              </Link>
            )}

            {next && (
              <Link
                to={`/${next.slug}`}
                className="inline-flex items-center space-x-1 group"
              >
                <span>{next.title}</span>
                <svg
                  className="w-5 h-5 fill-current group-hover:text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                </svg>
              </Link>
            )}
          </div>

          <div>
            <Link
              to="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 text-center font-medium p-1.5 rounded-md block transition-colors"
            >
              View all changes
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query ReleasePageQuery($slug: String!) {
    release: graphCmsRelease(slug: { eq: $slug }) {
      title
      url
      updates {
        description
        url
        tag {
          name
        }
      }
    }
  }
`

export default ReleasePage
