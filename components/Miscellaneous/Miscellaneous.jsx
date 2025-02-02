import React, { lazy } from 'react';
import WorldMap from '../TravelMap/TravelMap';
import { Violin } from '@/icon/violin';
import { Running } from '@/icon/running';
import { Reading } from '@/icon/reading';
import { Coding } from '@/icon/coding';
import { Photography } from '@/icon/photography';
// import WorldMap from "../WorldMap/WorldMap";
// const WorldMap = lazy(() => import("../WorldMap/WorldMap"));

export default function Miscellaneous() {
  return (
    <section id="miscellaneous" className="section section-text">
      <div className="animate-up ">
        <h2 className="section-title">Miscellaneous</h2>
        <div className="section-box">
          <p>
            <b>Extra Activities</b>
          </p>
          <li>
            <em>Full ThreeJS 3D Human with full mesh editable</em> (
            <a href="https://hmthanh.github.io/3d-human-model/">View</a>)
          </li>
          <li>
            <em>Pucca Runner (Dijkstra algorithm)</em> (
            <a href="https://hmthanh.github.io/pucca_runner/">Play</a>)
          </li>
          <li>
            <em>Quick Draw </em> (
            <a href="https://hmthanh.github.io/quickdraw/">Play</a>)
          </li>
          <br />
          <p>
            <b>Hobbies</b>
          </p>

          <ul className="interests-list">
            <li>
              {/* <img src="./img/coding.png" alt="Coding" /> */}
              <Coding className="w-12" />
              <span>Coding</span>
            </li>
            <li>
              {/* <img src="./img/reading.png" alt="Reading" /> */}
              <Reading className="w-12" />
              <span>Reading</span>
            </li>
            <li>
              {/* <img src="./img/photographer.png" alt="Photographer" /> */}
              <Photography className="w-12" />
              <span>Photographer</span>
            </li>
            <li>
              {/* <img src="./img/running.png" alt="Running" /> */}
              <Running className="w-12" />
              <span>Running</span>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=nNjR0pTDebA">
                {/* <img src="./img/violin.png" alt="Violin" /> */}
                <Violin className="w-12" />
              </a>
              <span>Violin</span>
            </li>
          </ul>
          <br />
          <p>
            "The World is a book and those who do not travel read only one page"
            <br />
          </p>
          <WorldMap />

          {/* <WorldMap></WorldMap> */}
        </div>
      </div>
    </section>
  );
}
