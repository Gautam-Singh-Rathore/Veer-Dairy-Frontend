import React from 'react'
import { useParams, Link } from 'react-router'
import { content } from '../utils/BlogContent'

const BlogDetailPage = () => {
  const { id } = useParams()
  const blog = content.find((b) => b.id === parseInt(id))

  if (!blog) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Link to="/blog" className="text-blue-500 hover:underline">Back to Blog List</Link>
      </div>
    )
  }

  return (
    <div className="py-[12vh] max-w-4xl mx-auto px-4">
      <Link to="/blogs" className="text-blue-500 hover:underline mb-4 inline-block">← Back to Blogs</Link>

      {/* Category and Date */}
      <p className="text-sm text-gray-500">{blog.category} • {blog.date}</p>

      {/* Title */}
      <h1 className="text-4xl font-bold mt-1 mb-4">{blog.by}</h1>

      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.by}
          className="rounded-xl w-full object-cover max-h-[400px] mb-6 shadow-md"
        />
      )}

      {/* Content */}
      <p className="whitespace-pre-line text-gray-700 leading-7">{blog.content}</p>
    </div>
  )
}

export default BlogDetailPage
