import {
  CheckIcon,
  DotsVerticalIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../pages/api/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { EditorState } from "draft-js";
import { convertFromRaw } from "draft-js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const File = ({ id, date, text, fileName }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [inputText, setInputText] = useState("");
  const [inputToggle, setInputToggle] = useState(false);
  const snapshotRef = doc(db, "files", user.email, "file", id);
  const [snapshotData, setSnapshotData] = useState([]);
  const textRef = snapshotData?.data?.editorState?.blocks[0]?.text;

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

  const changeFileName = async () => {
    if (!inputText) return;

    await updateDoc(doc(db, "files", user.email, "file", id), {
      fileName: inputText,
      timestamp: serverTimestamp(),
    });

    setInputToggle(false);
  };

  const deleteFile = async () => {
    await deleteDoc(doc(db, "files", user.email, "file", id));
  };

  return (
    <div className="flex flex-col cursor-pointer rounded-lg shadow hover:shadow-mt bg-gray-50 sm4:w-64 md:w-80 md:h-80 lg:w-72 xl:w-64 xl:h-96 1xl:w-72 1xl:h-80 w-5/6 h-72 sm4:h-96 m-4">
      <div
        className={
          !textRef || textRef?.length < (100 || 180)
            ? "h-52 border-b"
            : "border-b"
        }
        onClick={() => router.push(`/file/${id}`)}
      >
        {textRef?.length < 180 ? (
          <p className="p-6 hidden sm3:hidden sm:block">{textRef}</p>
        ) : (
          <p className="p-6 hidden sm3:hidden sm:block">
            {textRef?.substring(0, 180)}
            {"..."}
          </p>
        )}

        {textRef?.length < 180 ? (
          <p className="p-6 hidden sm3:block">{textRef}</p>
        ) : (
          <p className="p-6 hidden sm3:block">
            {textRef?.substring(0, 180)}
            {"..."}
          </p>
        )}

        {textRef?.length < 100 ? (
          <p className="p-6 sm:hidden text-sm sm2:text-base sm3:hidden">
            {textRef}
          </p>
        ) : (
          <p className="p-6 sm:hidden text-sm sm2:text-base sm3:hidden">
            {textRef?.substring(0, 100)}
            {"..."}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between px-6 mt-3">
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
            {fileName?.length < 15 ? (
              <p className="text-base sm2:text-lg">{fileName}</p>
            ) : (
              <p
                onClick={() => router.push(`/file/${id}`)}
                className="text-base sm2:text-lg"
              >
                {fileName?.substring(0, 15)}
                {"..."}
              </p>
            )}
          </>
        )}

        <Menu as="div" className="relative inline-block text-left ml-8 z-50">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              <DotsVerticalIcon className="h-6 w-6 cursor-pointer" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item onClick={() => setInputToggle(true)}>
                  <button
                    className={classNames(
                      "hover:bg-gray-100 hover:text-gray-900 text-gray-700 w-full flex items-center text-left px-4 py-2 text-base"
                    )}
                  >
                    <PencilIcon className="h-6 w-6 mr-2" />
                    Edit
                  </button>
                </Menu.Item>
                <Menu.Item onClick={deleteFile}>
                  <button
                    className={classNames(
                      "hover:bg-gray-100 hover:text-gray-900 text-gray-700 w-full flex items-center text-left px-4 py-2 text-base"
                    )}
                  >
                    <TrashIcon className="h-6 w-6 mr-2" />
                    Delete
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <p
        onClick={() => router.push(`/file/${id}`)}
        className="px-6 mt-3 text-sm sm2:text-base"
      >
        {date?.toDate().toLocaleString()}
      </p>
    </div>
  );
};

export default File;
