import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1 class="title" style={{textAlign:"center"}}>
        Clef Notes
      </h1>

      <div class="tile is-ancestor is-vertical" style={{height: "60%"}}>
        <div className="tile">
          <div class="tile is-parent">
              <Link to="/bassnotes" className="tile is-child notification is-primary">
                <p class="title">Bass Notes</p>
                <p class="subtitle">Learn the notes of the bass clef</p>
              </Link>
            </div>
            <div class="tile is-parent">
              <Link to="/treblenotes" className="tile is-child notification is-primary">
                <p class="title">Treble Notes</p>
                <p class="subtitle">Learn the notes of the treble clef</p>
              </Link>
            </div>
        </div>

        <div className="tile is-parent">
          <Link to="/circlefifths" className="tile is-child notification is-primary">
            <p class="title">Circle of Fifths</p>
            <p class="subtitle">Learn the circle of fifths</p>
          </Link>
        </div>
      </div>


    </div>
  );
}

export default App;
