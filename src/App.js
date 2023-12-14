import "./App.css";
import ButtonCheck from "./components/buttons/ButtonCheck";
import ButtonFile from "./components/buttons/ButtonFile";
import { splitStringToArray } from "./utils/dataUtils";
import { useState } from "react";

function App() {
  const [orderIds, setOrderIds] = useState([]);
  const [econtIds, setEcontIds] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [result, setResult] = useState([]);

  function handleFileOrdersChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const data = splitStringToArray(reader.result);
      const newArray = data.map((e) => e.split(";"));
      newArray.shift();
      const arrayWithOrders = newArray.map((o) => o[0]);
      setOrderIds(arrayWithOrders);
    };
  }

  function handleEcontOrdersChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const data = splitStringToArray(reader.result);
      const newDataArray = data.map((a) => a.split("\t"));
      newDataArray.shift();
      const arrayWithOrdersId = newDataArray.map((o) => {
        if (!!Number(o[42].slice(10, 15))) {
          return o[42].slice(10, 15);
        } else return o[42];
      });
      setEcontIds(arrayWithOrdersId);
    };
  }

  const handleOnCheck = function () {
    setClicked(true);
    let diffArray = [];
    if (econtIds.length > orderIds.length) {
      diffArray = econtIds.filter((x) => !orderIds.includes(x));
    } else {
      diffArray = orderIds.filter((x) => !econtIds.includes(x));
    }
    setResult(diffArray);
  };

  return (
    <div>
      <div className="button-file-container container">
        <ButtonFile
          text="Качете CSV файл с поръчките от сайта"
          type="file"
          onHandleChange={handleFileOrdersChange}
        />
        <ButtonFile
          text="Качете CSV файл с пратките от Econt"
          type="file"
          onHandleChange={handleEcontOrdersChange}
        />
      </div>
      <ButtonCheck onCheck={handleOnCheck} />
      {clicked && orderIds.length > 0 && econtIds.length > 0 && (
        <div className="result container">
          <h2 className="result-title">
            Поръчки за проверка{" "}
            <div className="result-count">
              <span>{result.length}</span>
            </div>
          </h2>
          <div className="span-wrapper">
            {result.map((e) => (
              <span>{e}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
