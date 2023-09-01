/* eslint-disable react/prop-types */
import Fab from "@mui/material/Fab";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Final = ({ submitFunction, setUrl }) => {
  const handleCopyClick = () => {
    const textBox = document.getElementById("textbox");
    textBox.select();
    document.execCommand("copy");
  };

  console.log(setUrl);

  return (
    <>
      <form className="form-area">
        <h1 className="heading">URL Shortener</h1>
        <div className="back-btn">
          <Fab aria-label="back" onClick={() => submitFunction(false)}>
            <KeyboardBackspaceIcon />
          </Fab>
        </div>
        <div className="text-area">
          <input
            type="text"
            className="text-box"
            id="textbox"
            value={`https://url-shortener-53nl.onrender.com/${setUrl.current}`}
            readOnly
          />
          <img
            src="./paste-regular.svg"
            alt="paste"
            className="icon"
            onClick={handleCopyClick}
            draggable="false"
          />
        </div>
        <h3 className="gretting">Thanks For Using our service </h3>
      </form>
    </>
  );
};

export default Final;
