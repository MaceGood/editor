import { doc, getDoc } from "@firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Editor from "../../components/Editor";
import Navbar from "../../components/Navbar";
import { auth, db } from "../api/firebase";
import Login from "../login";

const FileId = () => {
  const [user] = useAuthState(auth);
  if (!user) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const snapshotRef = doc(db, "files", user.email, "file", id);
  const [snapshotData, setSnapshotData] = useState([]);

  useEffect(() => {
    async function getDocData() {
      const docSnap = await getDoc(snapshotRef);
      if (docSnap) {
        setSnapshotData({
          data: docSnap.data(),
        });
      }
    }
    return getDocData();
  }, [snapshotData]);

  return (
    <div className="max-w-screen-2xl w-full h-screen mx-auto">
      <Head>
        <title>txm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar fileName={snapshotData?.data?.fileName} />
      <Editor />
    </div>
  );
};

export default FileId;
