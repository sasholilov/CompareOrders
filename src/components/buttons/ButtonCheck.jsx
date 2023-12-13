import("./ButtonCheck.css");

const ButtonCheck = ({ onCheck }) => {
  return <button onClick={onCheck}>Провери</button>;
};

export default ButtonCheck;
