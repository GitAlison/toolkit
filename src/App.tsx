import { useState } from "react";
import Panel from "./Panel";
import PrivacyPolicy from "./PrivacyPolicy";


function App() {
  const [route] = useState(window.location.pathname);

  const renderPage = () => {

    switch (route) {
      case "/toolkit/privacy-policy":
        return <PrivacyPolicy />;
      default:
        return <Panel />;
    }
  };

  return (
    <>
      {renderPage()}
      <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4 fixed bottom-0">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Alison Aguiar</p>
        </aside>
      </footer>
    </>
  )
}

export default App
