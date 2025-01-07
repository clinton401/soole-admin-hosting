"use client"

import React from "react";
import InboxList from "../components/InboxList";
import InboxContent from "../components/InboxContent";
const Inbox = () => {

  return (
    <div>
      <h2 className="ff-Mabry-Pro-bold fs-32">Inbox</h2>
      <div className="d-flex gap-1">

<InboxList />
<InboxContent />
      </div>
    </div>
  );
};

export default Inbox;
