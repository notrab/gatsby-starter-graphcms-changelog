import React from "react"

const ReleaseUpdate = ({ description, url }, index) => {
  return (
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
  )
}

export default ReleaseUpdate
