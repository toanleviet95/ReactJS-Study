import Layout from '../components/layout';

// First way
const About = () => (
  <Layout>
    <p>About page</p>
  </Layout>
)

export default About

// Second way
// const About = () => (
//   <p>About page</p>
// )

// export default Layout(About)

// Third way
// const About = () => (
//   <p>About page</p>
// )

// export default () => (<Layout page={About} />)

// Another way
// const content = (<p>About page</p>)

// export default () => (<Layout content={content} />)
