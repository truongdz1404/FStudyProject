type EmbedOutputData = {
  embed: string;
  width?: number;
  height?: number;
  caption?: string;
};

type CustomEmbedProps = {
  data: EmbedOutputData;
};
const CustomEmbedOutput = ({ data }: CustomEmbedProps): JSX.Element => {
  const src = data.embed;
  return (
    <div className="relative w-full min-h-[15rem]">
      <iframe src={src} className="w-full aspect-video rounded-md"></iframe>
    </div>
  );
};

export default CustomEmbedOutput;
