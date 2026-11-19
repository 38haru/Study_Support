
import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("学習状況");
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <BottomNav
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);

          if (page === "home") {
            setActiveTab("学習状況");
          }
        }}
      />
    </>
  );
}

export default App;
