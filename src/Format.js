import React, {useState} from 'react'
import './Format.css'
import JSONPretty from 'react-json-pretty';

function Format() {
    const [json, setJson] = useState("");
    const [formatedJson, setFormatedJson] = useState("");
    const [error, setError] = useState("")
    const [formated, setFormated] = useState(false);

    const formatJSON = () => {
        try{
            setFormatedJson(JSON.parse(json));
            setError("");
            setFormated(true);
        }catch(error) {
            setError("Invalid JSON format!")
        }
    }

    const copyJSON = () => {
        const text = document.getElementsByClassName("__json-pretty__")[0].textContent;
        navigator.clipboard.writeText(text);
    }

    return (
        <div className="container">
      <div className="container__inner">
        <div className="json__container">
          <h3>Format your JSON here:</h3>
          <p className="error__message">{error}</p>
          <textarea
            className="json__input"
            rows="15"
            cols="60"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder="Enter your JSON"
          ></textarea>
        </div>
        <div className="format__button__group">
            <button
            className="format__button"
            onClick={formatJSON}
            disabled={!json}
          >
            FORMAT
          </button>
        </div>
        <div className={`result__container ${formated ? '' : 'hide'}`}>
             <button onClick={copyJSON}>
                 <img src="/icons/copy.png" alt="copy_icon"/>
             </button>
             <JSONPretty data={formatedJson} style={{fontSize: "1.1em"}}/>
        </div>
      </div>
    </div>
    )
}

export default Format
