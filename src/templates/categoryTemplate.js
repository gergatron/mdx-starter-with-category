import React from "react"
import { Link, graphql } from "gatsby"

const Category = ({ data, pageContext }) => {
  const { category } = pageContext
  const { edges } = data.allMdx;
  
  return (
    
      <div>
        <h1>{category}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { title, date } = node.frontmatter;
            const { slug } = node.fields;
            return (
              <li key={slug}>
                <Link to={slug}>
                  {title} ({date})
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    
  );
};

export default Category;

export const pageQuery = graphql`
  query($category: String!) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
