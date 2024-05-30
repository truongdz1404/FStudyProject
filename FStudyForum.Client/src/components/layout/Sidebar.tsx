import { List, ListItem, ListItemPrefix, Card } from "@material-tailwind/react";
import { Home, StickyNote, Tags } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  enum TabType {
    HOME = 1,
    POST = 2,
    TOPIC = 3,
  }
  const [activeTab, setActiveTab] = React.useState<TabType | number>(1);
  const changeTab = (buttonType: TabType) => {
    switch (buttonType) {
      case 1:
        navigate("/home");
        break;
      case 2:
        navigate("/posts");
        break;
      case 3:
        navigate("/topics");
        break;
      default:
        navigate("/");
        break;
    }
    setActiveTab(buttonType);
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full rounded-none shadow-xl shadow-blue-gray-900/5"
    >
      <List>
        <ListItem
          onClick={() => changeTab(TabType.HOME)}
          selected={activeTab == TabType.HOME}
        >
          <ListItemPrefix>
            <Home className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>

        <ListItem
          onClick={() => changeTab(TabType.POST)}
          selected={activeTab == TabType.POST}
        >
          <ListItemPrefix>
            <StickyNote className="h-5 w-5" />
          </ListItemPrefix>
          Post
        </ListItem>

        <ListItem
          onClick={() => changeTab(TabType.TOPIC)}
          selected={activeTab == TabType.TOPIC}
        >
          <ListItemPrefix>
            <Tags className="h-5 w-5" />
          </ListItemPrefix>
          Topic
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
      </List>
    </Card>
  );
};

export default Sidebar;
