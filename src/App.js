import "./App.css";
import Header from "./Header";
import JSONToCSV from "./JSONToCSV";
import { Switch, Route } from "react-router-dom";

import Format from "./Format";

function App() {
  return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={JSONToCSV} />
          <Route path="/format" component={Format}/>
        </Switch>
      </div>
  );
}

export default App;
