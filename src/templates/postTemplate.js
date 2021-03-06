import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"

const PostTemplate = ({ data }) => {
  const { mdx } = data
  const { frontmatter, body } = mdx
  return (
    <section>
      <div>
        <h1>{frontmatter.title}</h1>
        <h3>{frontmatter.date}</h3>
      </div>
      <MDXRenderer>{body}</MDXRenderer>
    </section>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
