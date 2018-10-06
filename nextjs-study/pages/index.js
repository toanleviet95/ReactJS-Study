import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
import Layout from '../components/layout'
import PostLink from '../components/postLink'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <div className="markdown">
    <Markdown source={`
      This is our blog post.
      Yes. We can have a [link](/link).
      And we can have a title as well.

      ### This is a title

      And here's the content.
    `} />
    </div>
    <ul>
      {props.shows.map(({ show }) => (
        <PostLink key={show.id} id={show.id} name={show.name} />
      ))}
    </ul>
    <style jsx>{
      ` h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }
      `
    }
    </style>
    <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
  `}</style>
  </Layout>
)

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index