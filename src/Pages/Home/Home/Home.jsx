import loading from "../../../assets/loading/loading.gif";
const Home = () => {
  return (
    <div>
      <h2 className="text-2xl bg-yellow-300 text-red-800 text-center font-lora">
        Hello World
      </h2>
      <div className="flex justify-center items-center">
        <img src={loading} alt="" />
      </div>
    </div>
  );
};

export default Home;
