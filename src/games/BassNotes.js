import React from "react";
import { Link } from "react-router-dom";
import Vex from 'vexflow';
import './BassNotes.css';
const VF = Vex.Flow;

const cmp = (a, b) => {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
}

export class BassNotes extends React.Component {

    notes = "cdefgab"

    trebleRangeNumbers = [3,4,5,6];
    trebleRangeNotes = ["c/4", "c/6"];
    bassRangeNumbers = [1,2, 3,4];
    bassRangeNotes = ["c/2", "e/4"];

    constructor(props) {
        super();
        this.mode = props.mode;
        const newData = this.generateRandomNote();
        this.state = {
            note: newData.note,
            letter: newData.letter,
            choices: newData.choices.map(c => ({
                note: c,
                correct: null
            }))
        };
    }

    getNoteRange() {
        const numbers = (this.mode === 'bass') ? this.bassRangeNumbers : this.trebleRangeNumbers;
        const range = this.notes.split('').flatMap(note => numbers
            .map(range => [note, range])).sort((n1, n2) => { 
                const c1 = this.notes.indexOf(n1[0])
                const c2 = this.notes.indexOf(n2[0])
                return cmp(n1[1], n2[1])  || cmp(c1, c2);
            })
            .map(a => `${a[0]}/${a[1]}`);

        if (this.mode === 'bass') {
            return range.slice(range.indexOf(this.bassRangeNotes[0]), range.indexOf(this.bassRangeNotes[1]));
        } else if (this.mode === 'treble') {
            return range.slice(range.indexOf(this.trebleRangeNotes[0]), range.indexOf(this.trebleRangeNotes[1]));
        }
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    generateRandomNote() {
        const allNotes = this.getNoteRange();
        const randomNote = allNotes[Math.floor(Math.random() * allNotes.length)];
        const randomNoteLetter = randomNote.split('/')[0]

        let choices = this.notes.split('').filter(n => n !== randomNoteLetter)
        this.shuffleArray(choices)
        choices = choices.slice(0, 2)
        choices.push(randomNoteLetter)
        choices.sort()

        return {
            note: randomNote,
            letter: randomNoteLetter,
            choices: choices
        }
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate(prevProps, prevState) {
        this.draw();
    }

    draw() {
        var div = document.getElementById("boo");
        div.innerHTML = '';
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(200, 200);
        var context = renderer.getContext();
        var stave = new VF.Stave(10, 40, 100);
        stave.addClef(this.mode);
        stave.setContext(context).draw();

        var notes = [
            new VF.StaveNote({clef: this.mode, keys: [this.state.note], duration: "w" })
          ];
          
        var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
        voice.setMode(Vex.Flow.Voice.Mode.SOFT);
        voice.addTickables(notes);
        
        // Format and justify the notes to 400 pixels.
        new VF.Formatter().joinVoices([voice]).format([voice], 100);
        renderer.ctx.setViewBox(0, 50, 100, 100); //size
        // Render voice
        voice.draw(context, stave);
    }

    onChoiceMade(choice) {
        const wasChoiceCorrect = choice === this.state.letter;
        this.setState({
            choices: this.state.choices.map(c => {
                if (wasChoiceCorrect) {
                    if (c.note === choice) {
                        return { ...c, flashCorrect: true }
                    } else {
                        return { ...c, flashCorrect: null, flashWrong: null, hide: true }
                    }
                }
                else {
                    if (c.note === choice) {
                        return { ...c, flashWrong: true }
                    }
                    else if (c.note === this.state.letter) {
                        return { ...c, flashCorrect: true }
                    } else {
                        return { ...c, hide: true }
                    }
                }
            })
        })
        if (wasChoiceCorrect) {
            setTimeout(() => this.newQuestion(), 1000);
        }
    }

    newQuestion() {
        const newData = this.generateRandomNote();
        this.setState({
            note: newData.note,
            letter: newData.letter,
            choices: newData.choices.map(c => ({
                note: c,
                correct: null
            }))
        });
        console.log("In choiceMade,new note is " + newData.letter, newData)
        this.draw();
    }

    render() {
        const choiceButtons = this.state.choices.map((c, index) => {

            let className = '';
            if (c.flashCorrect) className = 'flashCorrect';
            if (c.hide) className = 'hide';
            if (c.flashWrong) className = 'flashWrong';


            return (
                <div className="tile is-parent" key={c + index}>
                    <a className={`tile is-child notification is-primary ${className}`} onClick={() => this.onChoiceMade(c.note)}>
                        <p className="title" style={{textAlign: "center"}}>{c.note}</p>
                    </a>
                </div>
            );
        })
        
        return (
            <div className="container is-widescreen">
                <h1 className="title" style={{textAlign:"center"}}>
                    Clef Notes
                </h1>
                <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><a href="#" aria-current="page">{this.mode === 'bass' ? 'Bass' : 'Treble'} Notes</a></li>
                    </ul>
                </nav>



                <div className="wrapper" style={{width:"100%", overflowX: "hidden"}}>
                <div className="notesContent" id="boo"></div>
                </div>
                
                <div className="tile is-ancestor m-1">
                    {choiceButtons}
                </div>
            </div>
        );
    }
}