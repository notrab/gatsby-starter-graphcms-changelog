import React from "react"
import { Link } from "gatsby"
import groupBy from "lodash.groupby"

import ReleaseUpdate from "./ReleaseUpdate"

const Release = ({ slug, title, updates }) => {
  const groupedUpdates = groupBy(updates, ({ tag: { name } }) => name)

  return (
    <div
      key={slug}
      className="bg-white rounded-md shadow-sm border-b border-gray-300 p-4 divide-y divide-gray-200"
    >
      <div className="pb-4">
        <h3 className="text-gray-800 text-xl">
          <Link to={`/${slug}`}>{title}</Link>
        </h3>
      </div>
      <div className="space-y-4 pt-4">
        {Object.keys(groupedUpdates).map(tagName => (
          <div>
            <h4 className="text-gray-800 font-medium">{tagName}</h4>

            <ul className="leading-loose">
              {groupedUpdates[tagName].map(ReleaseUpdate)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Release
