import TimePage from "@/components/Time/Page";

const Page = ({
  params: { time },
}: {
  params: {
    time: string;
  };
}) => {
  return <TimePage time={time} />;
};

export default Page;
