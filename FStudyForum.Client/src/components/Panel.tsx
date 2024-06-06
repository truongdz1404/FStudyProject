import { Card } from "@material-tailwind/react";
import { FC, PropsWithChildren } from "react";

const Panel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card className="min-h-[20rem] mx-4 rounded-sm shadow-sm bg-blue-gray-50 p-4">
      {children}
    </Card>
  );
};

export default Panel;
