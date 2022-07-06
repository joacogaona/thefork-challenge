/**
 * DO NOT EDIT
 */

import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// add the Eric Meyer's CSS reset https://meyerweb.com/eric/tools/css/reset/
import 'reset-css';

import './globals.css';
import styles from './App.module.scss';

const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
  }),
  cache: new InMemoryCache({}),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Book best restaurants in Europe - The Fork</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/RalewayX_light.woff2"
        ></link>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/RalewayX_regular.woff2"
        ></link>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/RalewayX_semiBold.woff2"
        ></link> */}
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <Image src="/logo.svg" alt="TheFork" width={150} height={44} />
          </a>
        </Link>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <p>
          Made with ❤️ at{' '}
          <a
            href="https://www.thefork.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__logo}
          >
            <Image src="/logo.svg" alt="TheFork" width={75} height={22} />
          </a>
        </p>
      </footer>
    </ApolloProvider>
  );
}

export default MyApp;
