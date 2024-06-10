import Spinner from "@/assets/images/bread.gif";
const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <img className="w-12 h-12" src={Spinner} />
    </div>
  );
};

export default Loading;
