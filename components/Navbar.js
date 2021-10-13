import {
  DocumentTextIcon,
  SearchIcon,
  PencilIcon,
  XIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import Menu from "./Menu";
import { auth, db } from "../pages/api/firebase";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";

const Navbar = ({ fileName }) => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [inputText, setInputText] = useState("");
  const [inputToggle, setInputToggle] = useState(false);

  const changeFileName = async () => {
    if (!inputText) return;

    await updateDoc(doc(db, "files", user.email, "file", id), {
      fileName: inputText,
      timestamp: serverTimestamp(),
    });

    setInputToggle(false);
  };

  return (
    <div className="flex w-full py-4 px-6 justify-between items-center z-50 bg-white">
      <h1
        onClick={() => router.push("/")}
        className="text-4xl cursor-pointer text-gray-900"
      >
        txm
      </h1>

      {router.pathname != "/" ? (
        <div className="sm3:flex hidden items-center px-3 py-2">
          <DocumentTextIcon className="h-10 w-10 text-gray-900" />
          {inputToggle ? (
            <>
              <input
                type="text"
                placeholder={fileName}
                className="w-3/5 bg-gray-50 p-1 rounded ring-2 ring-indigo-500"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && changeFileName()}
              />
              <CheckIcon
                onClick={changeFileName}
                className="h-10 w-10 text-gray-900 ml-2 cursor-pointer hover:bg-gray-100 p-1 rounded-md"
              />
              <XIcon
                className="h-10 w-10 text-gray-900 ml-3 cursor-pointer hover:bg-gray-100 p-1 rounded-md"
                onClick={() => {
                  setInputToggle(false);
                  setInputText("");
                }}
              />
            </>
          ) : (
            <>
              {fileName?.length < 30 ? (
                <p>{fileName}</p>
              ) : (
                <p>
                  {fileName?.substring(0, 30)}
                  {"..."}
                </p>
              )}
              <PencilIcon
                className="h-10 w-10 text-gray-900 ml-3 cursor-pointer hover:bg-gray-100 p-1 rounded-md"
                onClick={() => setInputToggle(true)}
              />
            </>
          )}
        </div>
      ) : (
        <div className="md:flex hidden items-center px-3 py-2 rounded-xl bg-gray-100 max-w-md w-1/2">
          <SearchIcon className="h-7 w-7 text-gray-900" />
          <input
            placeholder="Search"
            type="text"
            className="border-0 outline-none ml-2 text-gray-900 text-lg bg-transparent w-full"
          />
        </div>
      )}

      <div className="flex items-center">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="h-12 w-12 rounded-full ring-gray-900 ring-1 hover:opacity-80 hidden sm:block"
        />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
