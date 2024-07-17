import UserService from "@/services/UserService";
import DefaultUser from "@/assets/images/user.png";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Spinner
} from "@material-tailwind/react";
import { ChevronsUpDown, Pencil, Search } from "lucide-react";
import React from "react";
import useSearchParam from "@/hooks/useSearchParam";
import { useQuery } from "@tanstack/react-query";

const tableHead = ["Member", "Role", "Action"];
const PAGE_SIZE = 10;
const MembersPage = () => {
  const [maxPage, setMaxPage] = React.useState(0);
  const [pageNumber, setPageNumber] = useSearchParam<string>({
    key: "page",
    defaultValue: "1"
  });

  const { data: users } = useQuery({
    queryKey: ["USER_LIST", { pageNumber }],
    queryFn: async () => {
      const result = await UserService.getAll(+pageNumber, PAGE_SIZE);
      setMaxPage(Math.ceil(result.totalCount / PAGE_SIZE));
      return result.data;
    }
  });

  const handlePrev = () => {
    let n = +pageNumber;
    if (n > 1) n--;
    setPageNumber("" + n);
  };

  const handleNext = () => {
    let n = +pageNumber;
    if (n < maxPage) n++;
    setPageNumber("" + n);
  };

  if (!users) return <Spinner className="mx-auto" />;

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div className="text-blue-gray-700">
            <p className="font-semibold text-lg">Members list</p>
            <p className="mt-1 text-sm">See information about all members</p>
          </div>
        </div>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<Search className="h-5 w-5" />}
            crossOrigin={undefined}
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== tableHead.length - 1 && (
                      <ChevronsUpDown strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(({ avatar, username, roles }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={username}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={avatar || DefaultUser} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {username}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <span className="font-normal opacity-70 text-xs uppercase">
                      {roles.length ? roles : "NO ROLE"}
                    </span>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <Pencil className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {pageNumber} of {maxPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePrev}
            disabled={+pageNumber == 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleNext}
            disabled={+pageNumber == maxPage}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default MembersPage;
