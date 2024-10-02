import TimePage from "@/components/Time/Page";

const Page = ({
  params: { time },
}: {
  params: {
    time: string;
  };
  searchParams: {
    text: string;
  };
}) => {
  return <TimePage time={time} />;
};

export default Page;
