import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Irp from "./irp";


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
              Enquiries
            </div>
          }
        />
       
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
