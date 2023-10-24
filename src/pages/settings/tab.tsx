import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Irp from "./irp";
// import Collab from "./collab";
// import Summarizer from "./summariser";
// import Analyser from "./analyser";
// import Factcher from "./factchecker";
// import Interrogator from "./interrogator";
// import DeepChat from "./deepchat";

function BasicTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(Number(newValue)); // Convert newValue to a number
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="tab"
        className="border-bottom"
      >
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Audit Log
            </div>
          }
        />
        {/* <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Collab
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Summarizer
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Analyser
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Factchecker
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              Interrogator
            </div>
          }
        />
        <Tab
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              DeepChat
            </div>
          }
        /> */}
      </Tabs>
      {activeTab === 0 && <Irp />}
      {/* {activeTab === 1 && <Collab />}
      {activeTab === 2 && <Summarizer />}
      {activeTab === 3 && <Analyser />}
      {activeTab === 4 && <Factcher />}
      {activeTab === 5 && <Interrogator />}
      {activeTab === 6 && <DeepChat />} */}
    </div>
  );
}

export default BasicTabs;
