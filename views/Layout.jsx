import React from 'react';
import PropTypes from 'prop-types';

const demoName = 'SquareFive - RH360 Demo | Watson';
const DESCRIPTION = 'A simple demo to show the power of Watson AI to RH departments of the entire world.';

export default function Layout(props) {
  return (
    <html lang="en">
      <head>
        <title>{demoName} RH360 - Demo</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content={demoName} />
        <meta name="og:description" content={DESCRIPTION} />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/css/watson-react-components.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <style date-aphrodite>{props.css.content}</style>
        <script type="text/javascript" src="scripts/bundle.js" defer async />
      </head>
      <body>
        <header>
            <h1>SquareFive</h1>
            <span> - RH360 Watson Demo.</span>
        </header>

        <div id="root">
          {props.children}
        </div>
        <script type="text/javascript" src="scripts/bundle.js" />
        { props.bluemixAnalytics ?
          <script type="text/javascript" src="scripts/analytics.js" /> : null }
      </body>
    </html>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  css: PropTypes.object.isRequired, // attaching css generated by aphrodite
  bluemixAnalytics: PropTypes.bool.isRequired,
};
