import { useState } from "react"

const Blog = ({ blog }) => {
  const [viewInfo, toggleInfo] = useState(false)
  const label = viewInfo
    ? 'hide'
    : 'view'
  return (
    <div className="blog">
      {blog.title} by {blog.author}
      <button onClick={() => toggleInfo(!viewInfo)}>{label}</button>
      <div style={{display: viewInfo ? '' : 'none'}}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button>like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
