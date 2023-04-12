import "../styles/globals.css";
import UserProvider from "../context/user/UserProvider";
import PostProvider from "../context/post/PostProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <PostProvider>
        <Component {...pageProps} />
      </PostProvider>
    </UserProvider>
  );
}

export default MyApp;
