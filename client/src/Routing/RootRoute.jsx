import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class RootRoute extends Component {
  render() {
    return (
      <div>
        {this.props.location.search.includes('code') ? (<div>temp</div>) : (<div>main</div>)}
      </div>
    )
  }
}

export default RootRoute;
