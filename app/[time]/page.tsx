import TimePage from "@/components/Time/Page";

const Page = ({
  params: { time },
  searchParams: { text },
}: {
  params: {
    time: string;
  };
  searchParams: {
    text: string;
  };
}) => {
  return <TimePage time={time} text={text} />;
};

export default Page;
