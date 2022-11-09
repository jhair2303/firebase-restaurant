import ReactLoading from "react-loading";

const Loading = () => {

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-11/12 h-64 flex items-center justify-center md:max-w-lg">
        <ReactLoading
          type="spinningBubbles"
          color="blue"
          height={"20%"}
          width={"20%"}
        />
      </div>
    </div>
  );
};

export default Loading;
