import React, { Fragment, useState } from "react";
import DashboardTitle from "../../modules/dashboard/DashboardTitle";
import { Card, Chip, Typography } from "@material-tailwind/react";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { getAllUser } from "../../service/useService";
import { useQuery } from "@tanstack/react-query";

const TABLE_HEAD = ["id", "displayname", "email", "status", "action"];

const DashboardUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllUser = async () => {
    const res = await getAllUser();
    return res;
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUser,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  // Filter users based on the search term
  const filteredUsers =
    users?.data?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <DashboardTitle>Manage Users</DashboardTitle>
        <input
          type="search"
          placeholder="Search users"
          className="p-3 bg-transparent focus:border-warning max-w-[300px] w-full border border-darkPrimary border-opacity-75 rounded-md outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Card shadow={false} className="w-full mt-10">
        <table className="w-full text-left min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 border-b border-gray border-opacity-20"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className={
                      head === "status" || head === "action"
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => {
                const isLast = index === filteredUsers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-gray border-opacity-20";
                return (
                  <tr
                    key={item?._id}
                    className="border-none hover:bg-bgColor hover:bg-opacity-60"
                  >
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        {item?._id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span className="font-medium capitalize">
                          {item?.name}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span>{item?.email}</span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Chip
                          size="lg"
                          variant="ghost"
                          value={item?.isAdmin ? "admin" : "user"}
                          color={item?.isAdmin ? "green" : "blue"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-sm font-normal"
                      >
                        <span className="flex items-center justify-center gap-3">
                          <ActionView />
                          <ActionEdit />
                          <ActionDelete />
                        </span>
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default DashboardUser;
