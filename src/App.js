import React from 'react';
// import './SortingVisualizer/SortingVisualizer.jsx'
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* shout out to Clément Mihailescu, whom I drew from for the structure
      of the project and Merge Sort animation implementation:
      https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial */}
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
