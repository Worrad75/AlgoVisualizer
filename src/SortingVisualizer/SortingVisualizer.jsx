import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimations } from '../algorithms/mergeSort'
import { quickSort } from '../algorithms/quickSort'
import { heapSort } from '../algorithms/heapSort'

// Change this value for the speed of the animationIndicies.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'grey';

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

    handleSortSelect(e) {
        console.log("SWITCHING TO: " + e.target.value)
        this.toggleButtons("disable")
        switch (e.target.value) {
            case 'merge': return this.mergeSort();
            case 'quick': return this.quickSort();
            case 'heap': return this.heapSort();
            case 'bubble': return this.bubbleSort();
            default: return;
        }
    }

    toggleButtons(toggle) {
        console.log("in toggle: " + toggle)
        const buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = toggle
        }
    }

    showSuccess() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = "lightgreen" }  
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
                    this.showSuccess()
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
        console.log("BASE ARRAY: " + this.state.baseArray)
        const result = heapSort(this.state.baseArray);  // returns animations
        console.log(result);
        this.toggleButtons("")  // enable buttons
    }




    bubbleSort(){
        let array = this.state.baseArray
        for (let i = 0; i < array.length; i++){

            // document.getElementById(i).style.backgroundColor = PRIMARY_COLOR

            for (let j = 0; j < array.length - i - 1; j++) {
                let a = array[j]
                let b = array[j+1]
                if (a>b) {
                    setTimeout(() => {
                        this.bubble(array, j, j + 1, i)
                        this.setState({baseArray:array})
                    }, i*j*ANIMATION_SPEED_MS)
                }
            }
        }
        console.log(array)
        setTimeout(() => {
            this.toggleButtons("")
            this.showSuccess()
        }, array.length * ANIMATION_SPEED_MS)
    }
    bubble(arr, idx1, idx2, i){  // helper method to bubbleSort that combines "swap" and color correction
        // document.getElementById(idx1).style.backgroundColor = SECONDARY_COLOR
        // document.getElementById(idx2).style.backgroundColor = SECONDARY_COLOR
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }



    render() {
        const {baseArray} = this.state;

        return <>
            <div className="buttons">
                Darrow's Sorting Visualizer
                <br/>
                <button className="button" disabled="" value="generate" onClick={() => this.resetArray()}>Generate New Array</button>
                <button className="button" value="merge" onClick={(event) => this.handleSortSelect(event)}>Merge Sort!</button>
                <button className="button" value="quick" onClick={(event) => this.handleSortSelect(event)}>Quick Sort!</button>
                <button className="button" value="heap" onClick={(event) => this.handleSortSelect(event)}>Heap Sort!</button>
                <button className="button" value="bubble" onClick={(event) => this.handleSortSelect(event)}>Bubble Sort!</button>
            </div>
            <div className="array-cont">
                {baseArray.map((val, idx) => (
                    <div    className="array-bar" id={idx} key={idx}
                            style={{
                                backgroundColor: "lightblue",
                                width: `${900/NUMBER_OF_ARRAY_BARS}px`,
                                height: `${val}px`}}>
                    </div>
                ))}
            </div>
        </>
    }
}

