🎵 Music Visualizer

A real-time music visualizer built with React, TypeScript, and the Web Audio API.
Upload a song or connect a Spotify track and watch the visuals move to the rhythm of your music.

🚀 Features

🎧 Upload your own MP3 or use a live audio source

🌈 Real-time visualizations using Canvas and the Web Audio API

⚙️ Adjustable visual styles (bars, waves, circles, etc.)

💻 Built with React + TypeScript for scalability and type safety

📱 Responsive layout — works on desktop and mobile

🧠 How It Works

The app uses the Web Audio API to analyze audio data in real time:

Creates an AudioContext and connects it to the uploaded audio file.

Uses an AnalyserNode to capture frequency and waveform data.

Draws shapes on an HTML <canvas> element that react to the music’s energy levels.

Updates frames continuously with requestAnimationFrame() for smooth animation.

🛠️ Installation
# Clone the repository
git clone https://github.com/yourusername/music-visualizer.git

# Navigate into the project folder
cd music-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev

🎮 Usage

Click one of the tracks or upload a file from your computer.

Play the audio — the visualization will automatically begin.

Experiment with different tracks and enjoy the visuals!

🧩 Tech Stack

React + TypeScript

Vite (for fast development)

TailwindCSS (for styling)

Web Audio API

Canvas API
🤝 Contributing

Contributions, feedback, and ideas for new visualization modes are welcome!
Feel free to fork the repo and open a pull request.

📄 License

MIT License © 2025 [Oscar Santiesteban]
