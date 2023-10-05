import { Helmet } from "react-helmet";
import "./App.css";
import { useEffect, useState } from "react";
import $ from "jquery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
function App() {
  const [value, setValue] = useState(100);
  const handleChange = (event, newValue) => {
    setName("Volume :" + newValue);
    setValue(newValue);
  };
  const drumPad = [
    {
      key: "Q",
      name: "Heater 1",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      key: "W",
      name: "Heater 2",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      key: "E",
      name: "Heater 3",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      key: "A",
      name: "Heater 4",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      key: "S",
      name: "Clap",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      key: "D",
      name: "Open HH",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      key: "Z",
      name: "Kick Hat",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      key: "X",
      name: "Kick",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      key: "C",
      name: "Closed HH",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];
  function playAudio(key, name) {
    if (document.getElementById("switch").checked) {
      const clicked = document.getElementById(key);
      clicked.play();
      clicked.volume = value / 100;
      console.log(value);
      $(clicked).parent("button").addClass("bg-sec");
      $(clicked).parent("button").removeClass("bg-body-tertiary");
      setTimeout(() => {
        $(clicked).parent("button").removeClass("bg-sec");
        $(clicked).parent("button").addClass("bg-body-tertiary");
      }, 120);
      if (name) {
        setName(name);
      }
    }
  }
  const [name, setName] = useState(null);
  $(document).keypress((e) => {
    if (document.getElementById("switch").checked) {
      if (
        e.key.toUpperCase() == "Q" ||
        e.key.toUpperCase() == "W" ||
        e.key.toUpperCase() == "E" ||
        e.key.toUpperCase() == "A" ||
        e.key.toUpperCase() == "S" ||
        e.key.toUpperCase() == "D" ||
        e.key.toUpperCase() == "Z" ||
        e.key.toUpperCase() == "X" ||
        e.key.toUpperCase() == "C"
      ) {
        drumPad.map((pad) => {
          if (e.key.toUpperCase() == pad.key) {
            setName(pad.name);
          }
        });
        playAudio(e.key.toUpperCase());
      }
    }
  });
  return (
    <>
      <Helmet>
        <title>Drum Machine</title>
        <link
          rel="shortcut icon"
          href={require("./imgs/logo.png")}
          type="image/x-icon"
        />
      </Helmet>
      <main
        style={{ backgroundColor: "#61677A" }}
        className="vh-100 d-flex justify-content-center align-items-center"
      >
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <div className="title p-2 d-flex align-items-center gap-3 text-white mb-3">
            <img
              style={{ width: "45px" }}
              src={require("./imgs/logo.png")}
              alt="logo"
            />
            <h2 className="mb-0">Drum Machine</h2>
          </div>
          <div className="frame border rounded-3 px-4 py-5">
            <div className="row gy-5">
              <div className="col-md-7">
                <div className="row gy-3">
                  {drumPad.map((pad, idx) => {
                    return (
                      <div key={idx} className="col-4">
                        <button
                          onClick={() => playAudio(pad.key, pad.name)}
                          className="padBtn w-100 py-4 px-2 rounded-2 btn bg-body-tertiary"
                        >
                          <h6>{pad.key}</h6>
                          <audio id={pad.key} src={pad.src}></audio>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-5 d-flex justify-content-center align-items-center">
                <div className="inner d-flex flex-column justify-content-center align-items-center">
                  <div className="power mb-4 text-center">
                    {/* <h6 className="text-white mb-3">Power</h6> */}
                    <label className="switch">
                      <input id="switch" type="checkbox" />
                      <span className="slider0">
                        <svg
                          className="slider-icon"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                        >
                          <path fill="none" d="m4 16.5 8 8 16-16"></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <div
                    className="nameFrame rounded-2 d-flex justify-content-center align-items-center border"
                    style={{ width: "200px", height: "50px" }}
                  >
                    <h4 className="name text-white">{name}</h4>
                  </div>
                  <div className="volume my-4">
                    <Box sx={{ width: 200 }}>
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 1 }}
                        alignItems="center"
                      >
                        <VolumeDown />
                        <Slider
                          aria-label="Volume"
                          value={value}
                          onChange={handleChange}
                        />
                        <VolumeUp />
                      </Stack>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default App;
