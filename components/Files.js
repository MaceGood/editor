import { PlusIcon } from "@heroicons/react/solid";
import File from "./File";
import { db, auth } from "../pages/api/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Files = () => {
  const [user] = useAuthState(auth);
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const snapshotRef = query(
    collection(db, "files", user.email, "file"),
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
    onSnapshot(snapshotRef, (snapshot) =>
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const createFile = async () => {
    await addDoc(collection(db, "files", user.email, "file"), {
      timestamp: serverTimestamp(),
      fileName: "New Document",
    });
  };

  return (
    <div className="flex flex-col w-full py-4 px-6">
      <h1 className="text-2xl">recent documents</h1>

      <div className="flex flex-wrap py-5 w-full justify-start">
        <div
          onClick={createFile}
          className="flex flex-col cursor-pointer justify-center items-center text-center rounded-lg shadow hover:shadow-mt bg-gray-50 p-6 sm4:w-64 md:w-80 md:h-80 lg:w-72 xl:w-64 xl:h-96 1xl:w-72 1xl:h-80 w-5/6 h-72 sm4:h-96 m-4"
        >
          <PlusIcon className="h-28 w-28" />
          <h1 className="text-lg cursor-pointer">create a new document</h1>
        </div>

        {files?.map((file) => (
          <File
            id={file.id}
            key={file.id}
            date={file.data.timestamp}
            fileName={file.data.fileName}
          />
        ))}
      </div>
    </div>
  );
};

export default Files;
