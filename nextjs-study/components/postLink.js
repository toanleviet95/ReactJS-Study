import Link from 'next/link';

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>{props.name}</a>
    </Link>
    <style jsx>
      {
        `li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }`
      }
    </style>
  </li>
)

export default PostLink;