/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const Initial = ({ submitFunction, setUrl }) => {
  const [textboxValue, setTextboxValue] = useState("");

  const handlePaste = async (e) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      setTextboxValue(text);
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://url-shortener-kwke.onrender.com/postdata",
        { url: textboxValue },
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }
      );
      console.log(data);
      setUrl.current = data;
      submitFunction("true");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="form-area" onSubmit={handleSubmit}>
        <h1 className="heading">URL Shortener</h1>
        <div className="text-area">
          <input
            type="text"
            placeholder="Paste the URL"
            className="text-box"
            value={textboxValue}
            name="url"
            required
            onChange={(e) => setTextboxValue(e.target.value)}
          />
          <img
            src="./paste-regular.svg"
            alt="paste"
            className="icon"
            onClick={handlePaste}
            draggable="false"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default Initial;
