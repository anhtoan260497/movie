import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const RootLayout = ({ children }) => {
  return (
    <div>
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
  );
};

export default RootLayout;
