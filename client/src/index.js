/* global document */
import { createElement } from 'react';
import { render } from 'react-dom';
import AppRoutes from './AppRoutes';

render(createElement(AppRoutes), document.getElementById('app'),
);
