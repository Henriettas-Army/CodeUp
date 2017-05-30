import React from 'react';

const RootRoute = () => (
  <div>
    {this.props.location.search.includes('code') ? (<div>temp</div>) : (<div>main</div>)}
  </div>
);

export default RootRoute;
