import React from "react"
import { graphql, Link } from "gatsby"
import { kebabCase } from "lodash"

const Home = ({ data }) => {
  const posts = data.allMdx.edges
  return (
    <div>
      {posts.map(post => (
        <div key={post.node.id}>
          <h2>{post.node.frontmatter.title}</h2> 
            <div>
              <Link to={`/category/${kebabCase(`${post.node.frontmatter.category}`)}/`}>{post.node.frontmatter.category}</Link>
            </div>

          <p>{post.node.frontmatter.date}</p>
          <p>{post.node.frontmatter.excerpt}</p>
          <Link to={post.node.fields.slug}>Read More</Link>
        </div>
      ))}
    </div>
  )
}

export default Home

// Get all markdown data, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
  }
`
