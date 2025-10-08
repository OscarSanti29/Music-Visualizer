import "./App.css";
import Audio from "./audioplayer";

function App() {
  return (
    <>
      <div>
        <h1 className="text-5xl text-center font-semibold m-10">
          Music Visualizer
        </h1>
        <Audio />
      </div>
    </>
  );
}

export default App;
