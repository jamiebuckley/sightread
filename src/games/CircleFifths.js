import React from "react";
import { Link } from "react-router-dom";

export const CircleFifths = () => {
    return <div className="container is-widescreen">
    <h1 className="title" style={{textAlign:"center"}}>
        Clef Notes
    </h1>
    <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li className="is-active"><a href="#" aria-current="page">Circle of Fifths</a></li>
        </ul>
    </nav>
    <h1 class="title" style={{textAlign: "center"}}>Not yet implemented</h1>
    </div>
}