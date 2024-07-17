import React from "react";
import { Select, Option, Spinner} from "@material-tailwind/react";
import { StatisticsPost } from "@/types/post";
import PaymentService from "@/services/PaymentService";
import { StatisticsDonate } from "@/types/donate";
import PostService from "@/services/PostService";
import useSignalR from "@/hooks/useSignalR";

interface SelectDateProps {
  setDataPost: React.Dispatch<React.SetStateAction<StatisticsPost[]>>;
  setDataDonate: React.Dispatch<React.SetStateAction<StatisticsDonate[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalLogin: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;
const currentMonth = new Date().getMonth() + 1;
const options = [
  { label: "Last 7 days", value: "7 day" },
  { label: "Last 28 days", value: "28 day" },
  { label: "Last 90 days", value: "90 day" },
  { label: "Last 365 days", value: "365 day" },
  { label: currentYear.toString(), value: `${currentYear.toString()} year` },
  { label: previousYear.toString(), value: `${previousYear.toString()} year` },
  {
    label: new Date().toLocaleString("en-US", { month: "long" }),
    value: `${currentMonth.toString()} month`
  },
  {
    label: new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).toLocaleString("en-US", { month: "long" }),
    value: `${(currentMonth - 1).toString()} month`
  },
  {
    label: new Date(
      new Date().setMonth(new Date().getMonth() - 2)
    ).toLocaleString("en-US", { month: "long" }),
    value: `${(currentMonth - 2).toString()} month`
  }
];

const SelectDate: React.FC<SelectDateProps> = ({
  setDataPost,
  setDataDonate,
  setLoading,
  setTotalLogin,
  loading
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const { on, off, invokeMethod } = useSignalR();
  const handleChange = async (value: string | undefined) => {
    setLoading(true);
    setError(null);
    try {
      const data: string[] = value ? value.trim().split(/\s+/) : [];
      const dataPost = await PostService.getStatisticsPost(
        `${data[1]}`,
        Number(data[0])
      );
      setDataPost(dataPost.data);
      const dataDonate = await PaymentService.getStatisticsDonate(
        `${data[1]}`,
        Number(data[0])
      );
      setDataDonate(dataDonate);

    } catch (e) {
      setError("Failed to fetch Analytics data");
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    invokeMethod("GetAllConnection");
    const handleChange = (data: number) => {
      setTotalLogin(data);
    }
    on("GetAllConnection", handleChange);
    return () => {
      off("GetAllConnection", handleChange);
    }
  }, [on, off, invokeMethod]);
  React.useEffect(() => {
    handleChange("7 day");
  }, []);

  if (loading) return <Spinner className="mx-auto" />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Select color="blue" label="Select Date Range" onChange={handleChange}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectDate;
