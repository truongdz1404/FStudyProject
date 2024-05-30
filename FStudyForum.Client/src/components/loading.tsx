import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500">
        <Spinner />
      </h1>
    </div>
  );
};

export default Loading;
