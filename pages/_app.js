import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import makeStore from './../store.js';
import { Provider } from 'react-redux';

class KarmaApp extends App {
  static async getInitialProps(data) {
    const { Component, ctx } = data;

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      pageProps,
    };
  }

  componentDidMount() {
    //console.log(this.props);
  }
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(KarmaApp);
