import React from "react";
import FileNotFound from "../common/FileNotFound";
import AddGroup from "../common/form/AddGroup";

function Group() {
  return (
    <div className="cardGrp">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Recent Groups</h1>
        <AddGroup />
      </div>
      <div className="fileNotFound">
        <FileNotFound width="100" height="100" text="Not Yet created a group" />
      </div>
    </div>
  );
}

export default Group;
