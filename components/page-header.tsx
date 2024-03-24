import { gradientTwClasses } from "@/lib/utils";

const PageHeader = () => {
  return (
    <h1
      className={
        "text-8xl text-center text-transparent bg-clip-text mt-4 leading-normal " +
        gradientTwClasses[2] +
        " bg-gradient-to-b"
      }
    >
      Instalog
    </h1>
  );
};

export default PageHeader;
