import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1 className="title" style={{textAlign:"center"}}>
        Clef Notes
      </h1>

      <div className="tile is-ancestor is-vertical" style={{height: "60%"}}>
        <div className="tile">
          <div className="tile is-parent">
              <Link to="/bassnotes" className="tile is-child notification is-primary">
                <p className="title">Bass Notes</p>
                <p className="subtitle">Learn the notes of the bass clef</p>
              </Link>
            </div>
            <div className="tile is-parent">
              <Link to="/treblenotes" className="tile is-child notification is-primary">
                <p className="title">Treble Notes</p>
                <p className="subtitle">Learn the notes of the treble clef</p>
              </Link>
            </div>
        </div>

        <div className="tile is-parent">
          <Link to="/circlefifths" className="tile is-child notification is-primary">
            <p className="title">Circle of Fifths</p>
            <p className="subtitle">Learn the circle of fifths</p>
          </Link>
        </div>
      </div>


    </div>
  );
}

export default App;
