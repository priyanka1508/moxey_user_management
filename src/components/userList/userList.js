import React, { Fragment, useState } from "react";
import Header from "../header/header";
import "./userList.css";
import UserCreation from "../userCreation/userCreation";
import { USERS_LIST, SETTINGS, PLUS, ADD_NEW_USER, ACTIVE, INACTIVE, ACTIONS, ALT_IMAGE, REMOVE } from "../../constants/constants";

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
    const users = [...savedUsers];
    const updatedUsers = users.map((each) => {
      if (each.id === userObj.id) {
        return {
          ...each,
          showActionDropdown: !userObj.showActionDropdown,
        };
      }
      return each;
    });
    setSavedUsers(updatedUsers);
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
        <div className="font-bold text-l flex flex-col gap-10">{SETTINGS}</div>
        <div className="flex flex-row items-center justify-between">
          {USERS_LIST}
          <div
            className="add-new-bunit text-sm"
            onClick={() => setOpenDrawer(true)}
          >
            <span>{`${PLUS} ${ADD_NEW_USER}`}</span>
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
                    <option value="someOption">{ACTIVE}</option>
                    <option value="otherOption">{INACTIVE}</option>
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
                    <td align="center">
                      <b>{user.role}</b>
                    </td>
                    <td align="center">{user.expiryBy || "-"}</td>
                    <td align="center">
                      <button
                        className="flex flex-row items-center dropdown-icon action-button"
                        onClick={() => {
                          handleActionClick(user);
                        }}
                      >
                        {ACTIONS}{" "}
                        <img src="assets/icons/dropdown.png" alt={ALT_IMAGE} />
                      </button>
                      {user.showActionDropdown && (
                        <div className="dropdown cursor-pointer">
                          <ul>
                            <li onClick={() => onRemoveUser(user)}>{REMOVE}</li>
                          </ul>
                        </div>
                      )}
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
