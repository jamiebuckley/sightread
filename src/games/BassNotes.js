import React from "react";
import { Link } from "react-router-dom";
import Vex from 'vexflow';
const VF = Vex.Flow;

export class BassNotes extends React.Component {

    notes = [
        "c/5",
        "d/5",
        "c/4",
        "b/4",
        "a/4",
        "g/4",
        "f/4",
        "e/4",
        "d/4",
        "c/4",
    ]

    componentDidMount() {
        var div = document.getElementById("boo")
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(200, 200);
        var context = renderer.getContext();
        //context.scale(2, 2);
        var stave = new VF.Stave(10, 40, 100);
        stave.addClef("treble");
        stave.setContext(context).draw();

        const randomNote = this.notes[Math.floor(Math.random() * this.notes.length)];
        var notes = [
            new VF.StaveNote({clef: "treble", keys: [randomNote], duration: "q" })
          ];
          
        var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
        voice.setMode(Vex.Flow.Voice.Mode.SOFT);
        voice.addTickables(notes);
        
        // Format and justify the notes to 400 pixels.
        var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);
        renderer.ctx.setViewBox(0, 50, 100, 100); //size
        // Render voice
        voice.draw(context, stave);
    }

    render() {
        return (
            <div className="container is-widescreen">
                <h1 className="title" style={{textAlign:"center"}}>
                    Clef Notes
                </h1>
                <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><a href="#" aria-current="page">Bass Notes</a></li>
                    </ul>
                </nav>



                <div className="wrapper" style={{width:"100%", overflowX: "hidden"}}>
                <div className="notesContent" id="boo"></div>
                </div>
                
                <div className="tile is-ancestor m-1">
                    <div className="tile is-parent">
                        <a className="tile is-child notification is-primary">
                        <p class="title" style={{textAlign: "center"}}>A</p>
                        </a>
                    </div>
                    <div className="tile is-parent">
                        <a className="tile is-child notification is-primary">
                        <p class="title" style={{textAlign: "center"}}>B</p>
                        </a>
                    </div>
                    <div className="tile is-parent">
                        <a className="tile is-child notification is-primary">
                        <p class="title" style={{textAlign: "center"}}>C</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}