import React from "react";
import UserSearchbar from "../components/UserSearchbar";
import StatusTable from "../components/StatusTable";

type Props = {};

const users = (props: Props) => {
  return (
    <div>
      <UserSearchbar />
      <StatusTable />
    </div>
  );
};

export default users;
