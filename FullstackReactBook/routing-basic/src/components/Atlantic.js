import React from 'react';
import { Link } from 'react-router-dom';

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the surface of the earth
      <br/>
      <Link to='atlantic/ocean' ><code>More</code></Link>
    </p>
  </div>
);

export default Atlantic;