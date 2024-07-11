import { collection, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { db } from "../../config/firebaseConfigure";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import { Card, Chip, Typography } from "@material-tailwind/react";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import Pagination from "../../components/pagination/Pagination";
const TABLE_HEAD = ["id", "displayname", "email", "status", "action"];

const DashboardUser = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filterUser = userList.filter((user) => user.displayName != searchTerm);

  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPostIndex = currentPage * itemPerPage;
  const firstPostIndex = lastPostIndex - itemPerPage;
  useEffect(() => {
    try {
      const userRef = collection(db, "users");
      let result = [];
      onSnapshot(userRef, (snapshot) =>
        snapshot.forEach(
          (doc) =>
            result.push({
              id: doc.id,
              ...doc.data(),
            }),
          setUserList(result)
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <DashboardHeading>Manage Product</DashboardHeading>
        <input
          type="search"
          placeholder="seach products"
          className="p-3 bg-transparent focus:border-warning max-w-[300px] w-full  border border-darkPrimary border-opacity-75 rounded-md outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Card shadow={false} className="w-full mt-10">
        <table className="w-full text-left min-w-max">
          <thead className="">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="p-4 border-b border-gray-100">
                  <Typography
                    variant="small"
                    color="gray"
                    className={
                      head === "status"
                        ? "text-sm leading-none text-center font-medium capitalize text-dark"
                        : head === "action"
                        ? "text-sm leading-none text-center font-medium capitalize text-dark"
                        : "text-sm leading-none text-left font-medium capitalize text-dark"
                    }
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterUser
              .slice(firstPostIndex, lastPostIndex)
              .map((item, index) => {
                const isLast = index === filterUser.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-50";
                return (
                  <tr
                    key={item?.id}
                    className=" hover:bg-bgColor hover:bg-opacity-60"
                  >
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        {item?.id}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span className="font-medium capitalize">
                          {item?.displayName}
                        </span>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal "
                      >
                        <span>{item?.email}</span>
                      </Typography>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center text">
                        <Chip
                          size="lg"
                          variant="ghost"
                          value={item?.role}
                          color={
                            item?.role === "admin"
                              ? "green"
                              : item?.role === "mods"
                              ? "amber"
                              : "blue"
                          }
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span className="flex items-center justify-center gap-3">
                          <ActionView></ActionView>
                          <ActionEdit></ActionEdit>
                          <ActionDelete></ActionDelete>
                        </span>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>
      <Pagination
        totalPost={filterUser?.length}
        currentPage={currentPage}
        postPerPage={itemPerPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </Fragment>
  );
};

export default DashboardUser;
