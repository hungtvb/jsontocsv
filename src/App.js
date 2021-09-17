import { useState } from "react";
import "./App.css";

function App() {
  const [json, setJson] = useState("");
  const [fileName, setFileName] = useState("result");
  const [error, setError] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const converJSONToCSV = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(json);
      if (data.constructor !== Array || data.length === 0 || Object.keys(data[0]).length === 0){
        setError("Please enter a JSON Array!");
        return;
      };

      setError("");
      let row = "";
      // set label
      if (showHeader) {
        for (let index in data[0]) {
          row += index + ",";
        }

        row = row.slice(0, -1)  + "\r\n";
      }

      // get row data
      for(let i=0; i< data.length ;i++){
        for (let index in data[0]) {
          row += (data[i][index] ? data[i][index] : "") + ",";
        } 

        row = row.slice(0, -1) + "\r\n";
      }


      // create downlad uri
      createDownloadLink(row);

    } catch (error) {
      console.log(error);
      setError("Invalid JSON format!");
    }
  };

  const createDownloadLink = (row) => {
    let csvContent = "data:text/csv;charset=utf-8," + row;

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", fileName.concat(".csv"));
      document.body.appendChild(link); // Required for FF

      link.click();
  }

  const resetData = () => {
    setError("");
    setJson([]);
  }

  const isReadyToDownload = () => {
    return json && fileName && !error;
  }

  return (
    <div className="App">
      <div className="json__container">
        <h3>Enter you JSON Array here:</h3>
        <p className="error__message">{error}</p>
        <textarea
          className="json__input"
          rows="10"
          cols="60"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="Enter JSON Array"
        ></textarea>

        <input type="text" placeholder="Enter file name" value={fileName} onChange={e => setFileName(e.target.value)} />
        <div className="checkbox__group">
          <input
            type="checkbox"
            defaultChecked={showHeader}
            onChange={(e) => setShowHeader(e.target.checked)}
          />
          <label>Show header</label>
        </div>
      </div>
      <button
        className={`donwload__button ${!isReadyToDownload ? 'hide' : ''}`}
        onClick={converJSONToCSV}
        disabled={!json}
      >
        DOWLOAD CSV
      </button>
      <button
        className={`donwload__button ${isReadyToDownload ? 'hide' : ''}`}
        onClick={resetData}
      >
        RESET
      </button>
    </div>
  );
}

export default App;
