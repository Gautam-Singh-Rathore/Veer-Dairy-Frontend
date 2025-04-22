import React from 'react'
import { content } from '../utils/BlogContent'
import { useNavigate } from 'react-router'

const BlogPage = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-[12vh] max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-8 text-center text-green-600">Our Stories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            {/* Image */}
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.by}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Text Content */}
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-1">{blog.category} • {blog.date}</p>
              <h2 className="text-xl font-semibold mb-2">{blog.by}</h2>
              <p className="text-gray-600 line-clamp-3">{blog.content}</p>
              <p className="mt-4 text-blue-600 font-medium hover:underline">Read More →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
