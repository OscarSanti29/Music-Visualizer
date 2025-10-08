import { useEffect, useRef } from "react";

interface VisualizerProps {
  audio: HTMLAudioElement;
}

export default function Visualizer({ audio }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audio) return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create AudioContext only once
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const audioCtx = audioCtxRef.current;

    // Create AnalyserNode only once
    if (!analyserRef.current) {
      analyserRef.current = audioCtx.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    const analyser = analyserRef.current;

    // Create MediaElementSource only once
    if (!sourceRef.current) {
      sourceRef.current = audioCtx.createMediaElementSource(audio);
      sourceRef.current.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx!.clearRect(0, 0, WIDTH, HEIGHT);

      const barWidth = WIDTH / bufferLength;
      dataArray.forEach((value, i) => {
        const barHeight = (value / 255) * HEIGHT;
        ctx!.fillStyle = `rgb(${value}, 100, 200)`;
        ctx!.fillRect(i * barWidth, HEIGHT - barHeight, barWidth, barHeight);
      });
    }

    draw();

    // Cleanup not needed for MediaElementSource, we reuse it
  }, [audio]);

  return <canvas ref={canvasRef} width={1300} height={500}></canvas>;
}
