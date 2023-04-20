import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";

import styles from "@/styles/Home.module.css";

type Data = {
  klub: Record<string, string>[];
};

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  let klubs;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
        },
        body: JSON.stringify({
          query: `query {
            klub {
              id
              name
            }
          }`,
        }),
      }
    );

    const result = await response.json();

    const data: Data = result.data;
    console.log("DATA", data);
    klubs = data.klub;
    console.log("KLUBS", klubs);
  } catch (e) {
    console.log(e);
  }

  return {
    props: { klubs },
  };
};

const Home: NextPage = ({
  klubs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Klub</title>
        <meta
          name="description"
          content="Klub. App for tennis players, fans and clubs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {klubs.map((klub: { id: number; name: string }) => (
          <p key={klub.id}>{klub.name}</p>
        ))}
      </main>
    </>
  );
};

export default Home;
