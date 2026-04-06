# Music Visualizer

A real-time music visualizer built with **React**, **TypeScript**, **Vite**, and the **Web Audio API**.  
This project analyzes audio frequency data and turns it into animated canvas visuals that react to music in real time.

## Overview

The app lets users:
- Play from preset tracks
- Upload their own audio file
- Watch a live audio visualization update as the music plays

This project was built to practice working with:
- Browser audio APIs
- Canvas rendering
- React state and refs
- TypeScript in a more interactive UI project

## Features

- Real-time music visualization using the **Web Audio API**
- Audio analysis through **AnalyserNode**
- Animated canvas rendering with `requestAnimationFrame`
- Preset music tracks included in the app
- File upload support for local audio playback
- Built with **React + TypeScript**
- Styled with **Tailwind CSS**

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Web Audio API**
- **HTML Canvas**

## How It Works

When audio is played, the app:

1. Creates an `AudioContext`
2. Connects the audio element to a `MediaElementSource`
3. Passes the audio through an `AnalyserNode`
4. Reads frequency data from the analyser
5. Draws animated bars on a canvas
6. Continuously updates the visualization using `requestAnimationFrame`

## Why I Built This

I wanted to build a project that was more interactive than a standard CRUD app and would help me practice working with browser APIs in a visual way.

This project helped me improve my understanding of:
- Audio processing in the browser
- React refs for DOM/audio handling
- Animation loops
- Rendering dynamic visuals from live data
- Structuring a TypeScript React app

## Challenges

Some of the main challenges in this project included:

- Connecting the audio element correctly to the Web Audio API
- Avoiding repeated creation of audio nodes
- Keeping canvas animation smooth
- Handling browser autoplay restrictions
- Managing uploaded audio files alongside preset tracks

## Live Demo
https://seeingmusic.netlify.app

## Installation

Clone the repository:

```bash
git clone https://github.com/OscarSanti29/Music-Visualizer.git
