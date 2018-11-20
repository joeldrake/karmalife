import NextHead from 'next/head';

const defaultTitle = 'Karma';
const defaultDescription =
  'The app that helps you rescue unsold food from being wasted';
const defaultOGURL = 'https://karma.life';
const defaultOGImage = '/static/img/Karma-Icon-Pink.png';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="manifest" href="/static/manifest.json" key="manifest" />
    <link rel="icon" href="/static/img/Karma-Icon-Pink.png" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || defaultTitle} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <link rel="icon" href={props.ogImage || defaultOGImage} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    {/*<link rel="stylesheet" href="/_next/static/style.css" />*/}
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"
      key="polyfill"
    />
  </NextHead>
);

export default Head;
