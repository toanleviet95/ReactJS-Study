// import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout';


// Use withRouter to get router.query
// const Content = withRouter((props) => (
//   <div>
//     <h1>{props.router.query.title}</h1>
//     <p>This is the blog post content.</p>
//   </div>
// ))

// const Post = (props) => (
//   <Layout>
//     <Content/>
//   </Layout>
// )

// Use fetch API for server rendering
const Post = (props) => (
  <Layout>
    <h1>{props.show && props.show.name ? props.show.name : ''}</h1>
    <p>{props.show && props.show.summary ? props.show.summary.replace(/<[/]?p>/g, '') : ''}</p>
    <img src={props.show && props.show.image && props.show.image.medium ? props.show.image.medium : ''}/>
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { id } = context.query

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)
  return { show }
}

export default Post;