import AddTopicPopup from "@/components/topic/popup/AddTopicPopup";
import DeleteTopicPopup from "@/components/topic/popup/DeleteTopicPopup";
import UpdateTopicPopup from "@/components/topic/popup/UpdateTopicPopup";
import { cn } from "@/helpers/utils";
import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  // Chip,
  //   CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { ChevronsUpDown, Pencil, Plus, Trash } from "lucide-react";
import React from "react";

const titles = ["Name", "Description", "Action"];

const Topics = () => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [selectTopic, setSelectTopic] = React.useState<Topic | undefined>(
    undefined
  );
  const [popupOpen, setPopupOpen] = React.useState(0);

  const openAddPopup = () => {
    setPopupOpen(1);
  };

  const openEditPopup = (topic: Topic) => {
    console.log("Edit clcik");

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
    setReload(true);
  };

  const handleDelete = async () => {
    if (!selectTopic) return;
    try {
      await TopicService.Delete(selectTopic.id);
      closePopup();
      reloadTopics();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const topics = await TopicService.getActiveTopics();
        setTopics(topics);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setReload(false);
      }
    };
    fetchTopics();
  }, [reload]);
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
            <tbody className={cn(loading && "hidden")}>
              {topics.map((topic, index) => {
                const isLast = index === topics.length - 1;
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
                    {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={!topic.isDeleted ? "active" : "inactive"}
                          color={!topic.isDeleted ? "green" : "blue-gray"}
                        />
                      </div>
                    </td> */}
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
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter> */}
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
export default Topics;
