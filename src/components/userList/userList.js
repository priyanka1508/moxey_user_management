import React, { Fragment, useState } from "react";
import Header from "../header/header";
import "./userList.css";
import UserCreation from "../userCreation/userCreation";

const cellColumns = [
  "STATUS",
  "USER ID",
  "EMAIL ADDRESS",
  "FIRST NAME",
  "LAST NAME",
  "USER ROLE",
  "EXPIRY BY",
  "ACTIONS",
];

const UserList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [savedUsers, setSavedUsers] = useState([]);

  const handleActionClick = (userObj) => {
    const unChangedUsers = savedUsers.filter((user)=>userObj.id !== user.id);
    setSavedUsers([...unChangedUsers, {...userObj, showActionDropdown: !userObj.showActionDropdown}]);
  };

  const onRemoveUser = (userObj) => {
    const users = [...savedUsers];
    const updatedUsers = users.filter((user) => userObj.id !== user.id);
    setSavedUsers(updatedUsers);
  };

  return (
    <Fragment>
      <Header openDrawer={openDrawer} />
      <div className="p-8 flex flex-col gap-5">
        <div className="font-bold text-l flex flex-col gap-10">Settings</div>
        <div className="flex flex-row items-center justify-between">
          Users List
          <div
            className="add-new-bunit text-sm"
            onClick={() => setOpenDrawer(true)}
          >
            <span>+ Add New User</span>
          </div>
        </div>
        <UserCreation
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          savedUsers={savedUsers}
          setSavedUsers={setSavedUsers}
        />
        <div>
          <table className="table w-full text-sm font-thin">
            <thead className="table-head font-sans">
              <tr>
                {cellColumns.map((eachCell) => (
                  <th className="table-head">{eachCell}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <th className="user-select">
                  <select className="status-dropdown">
                    <option value="someOption">Active</option>
                    <option value="otherOption">Inactive</option>
                  </select>
                </th>
                <th></th>
                <th className="list-input ">
                  <input name="myInput" />
                </th>
                <th className="list-input ">
                  <input name="myInput" />
                </th>
                <th className="list-input ">
                  <input name="myInput" />
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              {savedUsers.map((user) => {
                return (
                  <tr>
                    <td align="center">
                      <div className="status">{user.status}</div>
                    </td>
                    <td align="center">{user.id}</td>
                    <td align="center">{user.email}</td>
                    <td align="center">{user.firstName}</td>
                    <td align="center">{user.lastName}</td>
                    <td align="center">{user.role}</td>
                    <td align="center">{user.expiryBy || "-"}</td>
                    <td align="center">
                      <button
                        className="remove flex flex-row items-center dropdown-icon"
                        onClick={() => {
                          handleActionClick(user);
                        }}
                      >
                        {"Actions"}
                        <img src="assets/icons/dropdown.png" alt="no image" />
                        {user.showActionDropdown && (
                          <div className="dropdown">
                            <ul>
                              <li onClick={() => onRemoveUser(user)}>remove</li>
                            </ul>
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default UserList;
