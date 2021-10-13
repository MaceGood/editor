import "tailwindcss/tailwind.css";
import Login from "./login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
