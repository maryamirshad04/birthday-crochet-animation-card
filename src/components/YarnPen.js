import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import hook from "../assets/hook.png";
import yarn from "../assets/yarn.png";
import hbday from "../assets/happybday.png";
import star from "../assets/star.png"; 
import cloud1 from "../assets/cloud1.png";
import happy from "../assets/happy.png";
import cloud4 from "../assets/cloud4.png";
import chaotic from "../assets/chaotic.png";
import cloud6 from "../assets/cloud6.png";
import sad from "../assets/sad.png";
import soundEffect from "../assets/opening_doraemon.mp3";

const animationFrames = [cloud1, happy, cloud4, chaotic, cloud6, sad];

const YarnPen = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const audioRef = useRef(null);

  const handleDragEnd = () => {
    setShowLoading(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    let frame = 0;
    const frameInterval = setInterval(() => {
      setCurrentFrame(frame);
      frame++;
      if (frame >= animationFrames.length) {
        clearInterval(frameInterval);
        setTimeout(() => {
          setShowLoading(false);
          setShowMessage(true);
        }, 500);
      }
    }, 600);
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-gradient-to-b from-purple-100 to-purple-300 overflow-hidden">
      <audio ref={audioRef} src={soundEffect} preload="auto" />

      {/* Hook & Yarn */}
      {!showLoading && !showMessage && !showStar && (
        <>
          <motion.div
            className="cursor-pointer absolute top-[10rem] left-[2rem]"
            drag
            whileHover={{ scale: 1.1 }}
            onDragEnd={handleDragEnd}
          >
            <img
              src={hook}
              alt="Hook"
              style={{ height: "17rem", width: "auto" }}
              className="object-contain"
              draggable="false"
            />
          </motion.div>

          <motion.div
            className="cursor-pointer absolute top-[10rem] left-[50rem]"
            drag
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={yarn}
              alt="Yarn"
              style={{ height: "17rem", width: "auto" }}
              className="object-contain"
              draggable="false"
            />
          </motion.div>
        </>
      )}

      {/*Loading Animation */}
      {showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute flex flex-col items-center justify-center"
        >
          <motion.img
            key={currentFrame}
            src={animationFrames[currentFrame]}
            alt={`Frame ${currentFrame}`}
            style={{ height: "20rem", width: "auto" }}
            className="object-contain"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="mt-4 text-lg text-gray-600 italic">...unraveling chaos</div>
        </motion.div>
      )}

      {/* 🎉 Happy Birthday */}
      {showMessage && !showStar && (
        <motion.div
          className="absolute top-[3rem] left-[10rem] cursor-pointer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          onClick={() => setShowStar(true)}
        >
          <img
            src={hbday}
            alt="Happy Birthday"
            style={{ height: "40rem", width: "auto" }}
            className="object-contain"
          />
        </motion.div>
      )}

      {/* 🌟 Star Gift Message */}
      {showStar && (
        <motion.div
          className="absolute top-[7rem] left-[32rem] text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={star}
            alt="Crocheted Star"
            style={{ height: "15rem", width: "auto" }}
            className="object-contain mx-auto"
          />
          <p className="mt-4 text-xl font-medium text-gray-700 w-[10rem]">
            As promised, a crocheted star — for now, virtually 🌟 (don't worry, you'll get the real one in uni!)
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default YarnPen;
