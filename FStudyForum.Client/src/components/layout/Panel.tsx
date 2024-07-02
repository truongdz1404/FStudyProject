import { Card } from "@material-tailwind/react";
import { FC, PropsWithChildren } from "react";

const Panel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card className="mx-4 rounded-sm shadow-sm bg-gray-100 max-h-full overflow-y-auto no-scrollbar hover:scrollbar">
      {children}
    </Card>
  );
};

export default Panel;
