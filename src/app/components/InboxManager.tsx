"use client";
import React, { useState } from "react";
// import InboxList from "./InboxList";
// import InboxContent from "./InboxContent";

const InboxManager = () => {
  const totalMessages = 100; // Total messages
  const [activeMenu, setActiveMenu] = useState("All Inbox");
  const [starred, setStarred] = useState(Array(totalMessages).fill(false)); // Initialize for all messages

  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleStarToggle = (index: number) => {
    const updatedStarred = [...starred];
    updatedStarred[index] = !updatedStarred[index];
    setStarred(updatedStarred);
  };

  const starredCount = starred.filter(Boolean).length;

  return (
    <div className="inbox-manager">
      {/* <InboxList
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
        starredCount={starredCount}
      /> */}
      {/* {activeMenu === "All Inbox" && (
        <InboxContent starred={starred} onStarToggle={handleStarToggle} />
      )} */}
      {activeMenu === "Sent" && <div>Sent Content Component</div>}
      {activeMenu === "Bin" && <div>Bin Content Component</div>}
    </div>
  );
};

export default InboxManager;
