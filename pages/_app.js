import "../styles/globals.css";
import RootLayout from "../layout";

require('dotenv').config()

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
