import AddTopicPopup from "@/components/topic/Popup/AddTopicPopup";
import DeleteTopicPopup from "@/components/topic/Popup/DeleteTopicPopup";
import UpdateTopicPopup from "@/components/topic/Popup/UpdateTopicPopup";
import { cn } from "@/helpers/utils";
import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  // Chip,
  //   CardFooter,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { ChevronsUpDown, Pencil, Plus, Trash } from "lucide-react";
import React from "react";

const titles = ["Name", "Description", "Action"];

const TopicsPage = () => {
  const openAddPopup = () => {
    setPopupOpen(1);
  };

  const openEditPopup = (topic: Topic) => {
    setSelectTopic(topic);
    setPopupOpen(2);
  };

  const openDeletePopup = (topic: Topic) => {
    setSelectTopic(topic);
    setPopupOpen(3);
  };
  const closePopup = () => {
    setPopupOpen(0);
  };

  const reloadTopics = () => {
    // setReload(true);
  };

  const handleDelete = async () => {
    if (!selectTopic) return;
    try {
      await TopicService.deleteTopic(selectTopic.name);
      closePopup();
      reloadTopics();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const [selectTopic, setSelectTopic] = React.useState<Topic | undefined>(
    undefined
  );
  const [popupOpen, setPopupOpen] = React.useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["active-topics"],
    queryFn: TopicService.getActiveTopics
  });
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Topic list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all topics
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="gradient"
                className="flex items-center gap-2 capitalize text-sm"
                color="orange"
                onClick={openAddPopup}
              >
                <Plus strokeWidth={3} className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-hidden px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {titles.map((head, index) => (
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
                      {index !== titles.length - 1 && (
                        <ChevronsUpDown strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={cn(isLoading && "hidden")}>
              {data?.map((topic, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={topic.name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {topic.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {topic.description}
                      </Typography>
                    </td>
                    <td className={cn(classes)}>
                      <Tooltip content="Edit topic">
                        <IconButton
                          variant="text"
                          onClick={() => openEditPopup(topic)}
                        >
                          <Pencil className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Delete topic">
                        <IconButton
                          variant="text"
                          onClick={() => openDeletePopup(topic)}
                        >
                          <Trash className="h-4 w-4 text-red-400" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {popupOpen === 1 && (
        <AddTopicPopup onClose={closePopup} onTopicCreated={reloadTopics} />
      )}

      {popupOpen === 2 && selectTopic && (
        <UpdateTopicPopup
          open={true}
          topic={selectTopic}
          onClose={closePopup}
          onUpdate={reloadTopics}
        />
      )}

      {popupOpen === 3 && selectTopic && (
        <DeleteTopicPopup
          open={true}
          onClose={closePopup}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
export default TopicsPage;
