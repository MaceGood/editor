import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useRouter } from "next/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../pages/api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const TextEditor = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const snapshotRef = doc(db, "files", user.email, "file", id);
  const [snapshotData, setSnapshotData] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
  }, []);

  useEffect(() => {
    if (snapshotData?.data?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshotData?.data?.editorState)
        )
      );
    }
  }, [snapshotData]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDoc(
      snapshotRef,
      { editorState: convertToRaw(editorState.getCurrentContent()) },
      { merge: true }
    );
  };

  return (
    <div className="min-h-screen p-4">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-40 !justify-center mx-auto shadow"
        editorClassName="mt-6 p-10 bg-white shadow max-w-7xl mx-auto mb-12"
        wrapperClassName=""
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
