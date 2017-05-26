/* global document */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './Router';

ReactDOM.render(createElement(AppRoutes), document.getElementById('app'));
