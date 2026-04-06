import { useEffect, useRef, useState } from "react";

interface VisualizerProps {
  audio: HTMLAudioElement;
}

export default function Visualizer({ audio }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [isMicMode, setIsMicMode] = useState(false);

  useEffect(() => {
    if (!audio || !canvasRef.current) return;

    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const audioCtx = audioCtxRef.current;

    if (!analyserRef.current) {
      analyserRef.current = audioCtx.createAnalyser();
      analyserRef.current.fftSize = 256;
    }

    if (!sourceRef.current) {
      sourceRef.current = audioCtx.createMediaElementSource(audio);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtx.destination);
    }

    startDraw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [audio]);

  useEffect(() => {
    const audioCtx = audioCtxRef.current;
    const analyser = analyserRef.current;
    const source = sourceRef.current;
    if (!audioCtx || !analyser || !source) return;

    if (isMicMode) {
      source.disconnect();
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          micStreamRef.current = stream;
          micSourceRef.current = audioCtx.createMediaStreamSource(stream);
          micSourceRef.current.connect(analyser);
        })
        .catch(() => setIsMicMode(false));
    } else {
      if (micSourceRef.current) {
        micSourceRef.current.disconnect();
        micSourceRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      source.connect(analyser);
    }
  }, [isMicMode]);

  function startDraw() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount; // 128 bars
    const dataArray = new Uint8Array(bufferLength);
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const radius = 120; // ← inner circle radius
    const maxBarHeight = 80; // ← how tall bars can grow outward

    function draw() {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser!.getByteFrequencyData(dataArray);
      ctx!.clearRect(0, 0, W, H);

      const angleStep = (Math.PI * 2) / bufferLength;

      dataArray.forEach((value, i) => {
        const angle = i * angleStep - Math.PI / 2; // start from top
        const barHeight = (value / 255) * maxBarHeight;

        // inner point on the circle
        const x1 = cx + Math.cos(angle) * radius;
        const y1 = cy + Math.sin(angle) * radius;

        // outer point — extends outward by barHeight
        const x2 = cx + Math.cos(angle) * (radius + barHeight);
        const y2 = cy + Math.sin(angle) * (radius + barHeight);

        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = `hsl(${(i / bufferLength) * 360}, 90%, ${40 + (value / 255) * 30}%)`;
        ctx!.lineWidth = 3;
        ctx!.lineCap = "round";
        ctx!.stroke();
      });

      // subtle inner circle
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius - 2, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(255,255,255,0.1)";
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    draw();
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-black rounded-xl"
      />
      <button
        onClick={() => setIsMicMode((prev) => !prev)}
        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
          isMicMode
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {isMicMode ? "🎙️ Mic Active — Switch to Audio" : "🎵 Switch to Mic"}
      </button>
    </div>
  );
}
