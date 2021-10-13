import Head from "next/head";
import Navbar from "../components/Navbar";
import Files from "../components/Files";

export default function Home() {
  return (
    <div className="max-w-screen-2xl w-full h-screen mx-auto">
      <Head>
        <title>txm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Files />
    </div>
  );
}
