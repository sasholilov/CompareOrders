import("./ButtonFile.css");

const ButtonFile = ({ type, onHandleChange, text }) => {
  if (type === "file")
    return (
      <div className="btn-file container">
        <h2>{text}</h2>
        <input type="file" onChange={onHandleChange} />
      </div>
    );
};

export default ButtonFile;
