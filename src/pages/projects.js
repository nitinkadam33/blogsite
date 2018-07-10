import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import _ from 'lodash';
//import Bio from '../bio';

class Projects extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const group = _.groupBy(posts,(e) => new Date(e.node.frontmatter.date).getFullYear());
    const keys = Object.keys(group);
    const postKeys = _.sortBy(keys).reverse();
    return (
      <div className="section">
        <div className="top-line"></div>
        <div className="container content">
          <div className="content" style={{ display: 'flex'}} >
            <div className="inner-content" style={{ flexDirection: 'row', marginLeft: '30px' ,maxWidth: '600px' }} >
              <h1 className='rainbow' style={{ fontSize: '36px', marginBottom: '40px', fontWeight: '900' }}>Silly projects I've done </h1>
              <p style={{ fontSize: '18px' }}>
                Most of them involve emoji. The rest of them probably involve cats. All of them live on{' '}
                <a className='rainbow' href='https://github.com/notwaldorf'>GitHub.</a>
              </p>
              {postKeys.map(key => (
                <div className="content" key={key} >
                  <h3 className="rainbow" >{key}</h3>
                  {group[key].map(({node: post}) => (
                    <p key={post.id} className="content-listing" >
                      <a className="primary-text-custom" href={post.frontmatter.link}>
                        {post.frontmatter.title}:<span> {post.frontmatter.description}</span>
                      </a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )    
  }  
} 

Projects.propTypes = {
  link: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

export default Projects

export const pageQuery = graphql`
  query CodeByID {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "project" } }}
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY")
            link
            title
            description
          }
        }
      }
    }
  }
`