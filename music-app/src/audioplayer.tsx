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
      <div className="flex space-x-4">
        {presetTracks.map((track) => (
          <button
            key={track.name}
            onClick={() => setAudioSrc(track.src)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {track.name}
          </button>
        ))}
      </div>

      <input type="file" accept="audio/*" onChange={handleFileUpload} />

      {/* This is the actual audio element */}
      <audio controls ref={audioRef}></audio>

      {/* Pass the actual audio element to the visualizer */}
      {audioRef.current && <Visualizer audio={audioRef.current} />}
    </div>
  );
}
