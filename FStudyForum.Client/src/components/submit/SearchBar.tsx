import { cn } from "@/helpers/utils";
import { Input } from "@material-tailwind/react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div>
      <div className="w-1/2 lg:w-1/3 max-w-screen-md">
        <Input
          icon={<Search className="h-5 w-5" />}
          labelProps={{
            className: "hidden"
          }}
          containerProps={{ className: "min-w-full" }}
          crossOrigin={undefined}
          className={cn(
            "placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 ",
            "rounded-full !border-2 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent"
          )}
        />
      </div>
    </div>
  );
};

export default SearchBar;
