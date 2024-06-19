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
    <div className="relative w-full ">
      <iframe
        src={src}
        className="w-full aspect-video rounded-md"
        loading="lazy"
      />
    </div>
  );
};

export default CustomEmbedOutput;
