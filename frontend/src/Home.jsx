import { useRef, useState } from "react";
import Final from "./Final";
import Initial from "./Initial";

const Home = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const miniUrl = useRef("");

  return (
    <>
      <div className="home">
        {isSubmit ? (
          <Final submitFunction={setIsSubmit} setUrl={miniUrl} />
        ) : (
          <Initial submitFunction={setIsSubmit} setUrl={miniUrl} />
        )}
      </div>
      <span className="copyright"> Copyright © 2023 Jaseem.</span>
    </>
  );
};

export default Home;
