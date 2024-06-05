import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="uppercase tracking-widest text-gray-500">
        <Spinner />
      </h1>
    </div>
  );
};

export default Loading;
