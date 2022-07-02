import type { GetServerSideProps, NextPage } from 'next';

type CityPageProps = { cityID: string };

const CityPage: NextPage<CityPageProps> = (props) => {
  console.log({props})
  return <div>{/* @todo Write your code here */}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (typeof query.cityID !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: { cityID: query.cityID },
  };
};

export default CityPage;
