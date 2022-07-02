/**
 * DO NOT EDIT
 */

import React from 'react';
import type { NextPage } from 'next';
import Prism from 'prismjs';
import Link from 'next/link';

import styles from './Index.module.scss';
import IconChevron from '../components/IconChevron';
import IconChatBubble from '../components/IconChatBubble';

const Home: NextPage = () => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <React.Fragment>
      <p className={styles.alert}>
        ⚠️ Please don&apos;t communicate this test nor your implementation
        publicly! ⚠️
      </p>
      <div className={styles.wrapper}>
        <h1>Goal:</h1>
        <p>
          Use a GraphQL API to build a page listing the restaurant for a given
          city.
        </p>
        <ul>
          💡 Things you should know:
          <li>
            The browser supported is{' '}
            <a
              href="https://browserslist.dev/?q=bGFzdCAxIHZlcnNpb24gYW5kID4gMSUsIG5vdCBpZSAxMQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              defined here
            </a>
            , and that&apos;s it 🤯.
          </li>
          <li>There is no need to support SSR for this exercise.</li>
          <li>
            This exercise is not time-boxed, take the time to send us something
            that your are proud of. ✨
          </li>
        </ul>
        <ul>
          📖 Documentation you may need:
          <li>
            <a
              href="https://nextjs.org/docs/getting-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
          </li>
          <li>
            <a
              href="https://www.apollographql.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apollo
            </a>
          </li>
          <li>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
          </li>
        </ul>
        <h2>How to contribute:</h2>
        <p>
          First, the project is built on top of{' '}
          <a href="https://nextjs.org">Next.js</a>.
        </p>
        <ul>
          Your work should show:
          <li>Your coding best practices.</li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Glossary/SEO"
              target="_blank"
              rel="noopener noreferrer"
            >
              SEO
            </a>{' '}
            best practices.
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accessibility
            </a>{' '}
            best practices.
          </li>
        </ul>
        <p>
          And you can find more information about how you can contribute to this
          exercise below.
        </p>
        <h3>Design:</h3>
        {/* @todo - Add the breakpoints */}
        <p>
          You can find the design on{' '}
          <a
            href="https://www.figma.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Figma
          </a>
          .
        </p>
        <ul>
          <li>
            You can{' '}
            <a
              href="https://www.figma.com/file/hV9JMaoC9hSCVOjsNKZlgI/Front-End-Exercise?node-id=0%3A1"
              target="_blank"
              rel="noopener noreferrer"
            >
              inspect the styles here
            </a>
            .
          </li>
          <li>
            You can{' '}
            <a
              href="https://www.figma.com/file/hV9JMaoC9hSCVOjsNKZlgI/Front-End-Exercise?node-id=0%3A1"
              target="_blank"
              rel="noopener noreferrer"
            >
              see the interaction here
            </a>
            .
          </li>
        </ul>
        <ol className={styles.noteList}>
          💡 Things you should know about the city card list:
          <li>The city card list is always present in the DOM.</li>
          <li>
            The modify button toggle the visibility of the city card list.
          </li>
          <li>
            The city corresponding to the city page should not be listed in the
            city card list.
          </li>
          <li>
            Each city card should be clickable. And the link should sent to the
            corresponding city page (e.g.{' '}
            <a href="http://localhost:3000/city/[cityID]">
              http://localhost:3000/city/[cityID]
            </a>
            ).
          </li>
        </ol>
        <ol className={styles.noteList}>
          💡 Things you should know about the restaurant card list:
          <li>
            Each restaurant card should be clickable, and the link should sent
            to the corresponding restaurant page on{' '}
            <a href="https://www.thefork.com/">https://www.thefork.com/</a>. We
            have created for you the{' '}
            <code className="language-md">RestaurantLink</code> component to
            generate this link 😊.
          </li>
        </ol>
        <h3>Styling:</h3>
        <ul>
          For this exercise you can style with:
          <li>
            <a
              href="https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSS Modules
            </a>
          </li>
          <li>
            <a
              href="https://nextjs.org/docs/basic-features/built-in-css-support#sass-support"
              target="_blank"
              rel="noopener noreferrer"
            >
              SASS
            </a>
          </li>
          <li>
            <a
              href="https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSS in JS with `styled-jsx`.
            </a>
          </li>
        </ul>
        <p>It&apos;s your choice, take the one you are more confident with.</p>
        <ol className={styles.noteList}>
          💡 Things you should know about the styling:
          <li>
            The components should be fluid, and take the space available in his
            wrapper.
          </li>
          <li>The card height should NOT be fixed.</li>
          <li>
            Icons are already extracted: <IconChevron /> and <IconChatBubble />{' '}
            (and they are accessible as component in{' '}
            <code className="language-md">components/</code>).
          </li>
          <li>
            We have defined some variables to help you 😊{' '}
            <pre className="line-numbers">
              <code className="language-css">
                {`
--color-special-white: white;
--color-special-black: black;
--color-green-xxs: #e8f0e5;
--color-green-xs: #b4cfaa;
--color-green-s: #83b073;
--color-green-m: #589442;
--color-green-l: #437132;
--color-green-xl: #28431e;
--color-gray-xs: #ecedef;
--color-gray-m: #959ba7;
--color-gray-xl: #3c4048;
--color-red-m: #cb1a23;

--font-weight-normal: 300;
--font-weight-semi-bold: 400;
--font-weight-bold: 600;

--container-max-width: 62rem;
						`.trim()}
              </code>
            </pre>
          </li>
        </ol>

        <h3>API:</h3>
        <p>
          We used the Next.js{' '}
          <a
            href="https://nextjs.org/docs/api-routes/introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            API routes
          </a>
          , to create a simple GraphQL server in order to retrieve data from our
          public API.
        </p>
        <p>
          🔍 You can take a look at the schema created in{' '}
          <code className="language-md">pages/api/schemas/index.ts</code>.
        </p>
        <ul>
          In this schema, you will find the two queries needed for this
          exercise:
          <li>
            <code className="language-md">getCities</code>: to retrieve all
            cities.
          </li>
          <li>
            <code className="language-md">getRestaurants</code>: to retrieve
            restaurants of a city.
          </li>
        </ul>
        <p>
          📣 <code className="language-md">@apollo/client</code> is already
          installed on the project. So you can use the{' '}
          <a
            href="https://www.apollographql.com/docs/react/api/react/hooks/#usequery"
            target="_blank"
            rel="noopener noreferrer"
          >
            useQuery
          </a>{' '}
          hook to retrieve the data you need.
        </p>
        <p>
          🚀 The GraphQL endpoint is available{' '}
          <a
            href="http://localhost:3000/api/graphql"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:3000/api/graphql
          </a>
          .
        </p>
        <h3>Routing:</h3>
        <p>
          We used the{' '}
          <a
            href="https://nextjs.org/docs/routing/dynamic-routes"
            target="_blank"
            rel="noopener noreferrer"
          >
            dynamic-routes
          </a>{' '}
          mechanism, to create a the route for the city page.
        </p>
        <p>
          📣 We already injected the <code className="language-md">cityID</code>{' '}
          params from the router context to the{' '}
          <code className="language-md">CityPage</code> component.
        </p>
        <pre className="line-numbers">
          <code className="language-typescript">
            {`
// file - pages/city/cityID.tsx

const CityPage: NextPage<CityPageProps> = (props) => {
	const cityID = props.cityID; // here you go 🚀
						`.trim()}
          </code>
        </pre>
        <h2>Let&apos;s start 🚀</h2>
        <p>
          👉{' '}
          <Link href="/city/415144">
            <a>http://localhost:3000/city/415144</a>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Home;
