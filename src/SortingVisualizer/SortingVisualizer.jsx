import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimations } from '../algorithms/mergeSort'
import { quickSort } from '../algorithms/quickSort'
import { heapSort } from '../algorithms/heapSort'

// Change this value for the speed of the animationIndicies.
const ANIMATION_SPEED_MS = .5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'blue';

// This is the color of array bars that are being compared throughout the animationIndicies.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            baseArray: [],
            sorting: false
        }
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const baseArray = [];
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            baseArray.push(Math.floor(Math.random() * (600 - 10 + 1) + 5));
            if(arrayBars[i]) arrayBars[i].style.backgroundColor = "lightblue";
        }
        this.setState({baseArray})
    }

    handleSort(e) {
        console.log("SWITCHING TO: " + e.target.value)
        this.toggleButtons("disable")
        switch (e.target.value) {
            case 'merge': return this.mergeSort();
            case 'quick': return this.quickSort();
            case 'heap': return this.heapSort();
            case 'bubble': return this.bubbleSort();
        }
    }

    toggleButtons(toggle) {
        console.log("in toggle: " + toggle)
        const buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = toggle
        }
    }

    mergeSort() {
        const animationIndicies = getMergeSortAnimations(this.state.baseArray);
        for (let i = 0; i < animationIndicies.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animationIndicies[i];    // get relevant indicies for each array bar
                const barOneStyle = arrayBars[barOneIdx].style;         // isolate the style attribute of each array bar
                const barTwoStyle = arrayBars[barTwoIdx].style;         // isolate the style attribute of each array bar
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; // 
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS); // sets a timeout for each array bar. the further into the array, the longer the timeout
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animationIndicies[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS); // sets a timeout for each array bar. the further into the array, the longer the timeout
            }
            if (i === animationIndicies.length - 2) {
                setTimeout(() => {
                    this.toggleButtons("")
                }, i * ANIMATION_SPEED_MS)
            }
            
        }        
    }

    quickSort(){
        const result = quickSort(this.state.baseArray, 0, this.state.baseArray.length-1);
        this.setState({baseArray:result})
        this.toggleButtons("")  // enable buttons
    }

    heapSort(){
        const result = heapSort(this.state.baseArray);
        // this.setState({ baseArray: result })
        // this.toggleButtons("")  // enable buttons
    }

    bubbleSort(){

    }

    // findHeight(num) {
    //     let result = Math.floor(num / 600) * 100
    //     console.log(result)
    //     return result
    // }

    render() {
        const {baseArray} = this.state;

        return <>
            <div className="buttons">
                Darrow's Sorting Visualizer
                <br/>
                <button className="button" disabled="" value="generate" onClick={() => this.resetArray()}>Generate New Array</button>
                <button className="button" value="merge" onClick={(event) => this.handleSort(event)}>Merge Sort!</button>
                <button className="button" value="quick" onClick={(event) => this.handleSort(event)}>Quick Sort!</button>
                <button className="button" value="heap" onClick={(event) => this.handleSort(event)}>Heap Sort!</button>
                <button className="button" value="bubble" onClick={(event) => this.handleSort(event)}>Bubble Sort!</button>
            </div>
            <div className="array-cont">
                {baseArray.map((val, idx) => (
                    <div    className="array-bar" key={idx}
                            style={{
                                backgroundColor: "lightblue",
                                height: `${val}px`}}>
                    </div>
                ))}
            </div>
        </>
    }
}

