import React, { useState, useRef, useEffect } from "react";
import Visualizer from "./visualizer";
import track1 from "./assets/music/track1.mp3";
import track2 from "./assets/music/track2.mp3";
import track3 from "./assets/music/track3.mp3";
import track4 from "./assets/music/track4.mp3";

export default function Audio() {
  const presetTracks = [
    { name: "Track 1", src: track1 },
    { name: "Track 2", src: track2 },
    { name: "Track 3", src: track3 },
    { name: "Track 4", src: track4 },
  ];

  const [audioSrc, setAudioSrc] = useState<string>(presetTracks[0].src);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play or update audio when source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      audioRef.current.play().catch(() => {
        // autoplay may be blocked in some browsers
      });
    }
  }, [audioSrc]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAudioSrc(fileUrl);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center gap-4">
        {/* Pass the actual audio element to the visualizer */}
        {audioRef.current && <Visualizer audio={audioRef.current} />}
        <audio controls ref={audioRef} className="m-auto p-2"></audio>
      </div>
      <div className="flex space-x-4">
        {/* This is the actual audio element */}
        {presetTracks.map((track) => (
          <button
            key={track.name}
            onClick={() => setAudioSrc(track.src)}
            className=" rounded-2xl text-xl text-white font-semibold shadow-xl p-2 bg-[#00a4f6] cursor-pointer transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            {track.name}
          </button>
        ))}
      </div>{" "}
    </div>
  );
}
