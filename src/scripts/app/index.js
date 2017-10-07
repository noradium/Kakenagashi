import React from 'react';
import { render } from 'react-dom';
import { Root } from './components/Root';
import Context from './Context';

/**
 * @param {string} selector
 * @param {object} context
 * @param {string} context.oauthAccessToken
 */
export default function renderRoot(selector, context) {
  Context.init(context);
  render(<Root/>, document.querySelector(selector));
}
