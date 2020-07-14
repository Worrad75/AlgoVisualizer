import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimations } from '../algorithms/mergeSort'
import { quickSort } from '../algorithms/quickSort'
import { heapSort } from '../algorithms/heapSort'
import { getBubbleAnimations } from '../algorithms/bubbleSort'

const PRIMARY_COLOR = 'lightblue';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            baseArray: [],
            sorting: false,
            animationSpeedMS: 50,
            array_bars: 50
        }
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const baseArray = [];
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < this.state.array_bars; i++) {
            baseArray.push(Math.floor(Math.random() * (600 - 10 + 1) + 5));
            if(arrayBars[i]) arrayBars[i].style.backgroundColor = "lightblue";
        }
        this.setState({baseArray})
    }

    handleSortSelect(e) {
        this.toggleButtons("disable")
        switch (e.target.value) {
            case 'merge': return this.mergeSort();
            case 'quick': return this.quickSort();
            case 'heap': return this.heapSort();
            case 'bubble': return this.bubbleSort();
            default: return;
        }
    }

    handleSpeedChange(e) {
        this.setState({ animationSpeedMS: e.target.value});
    }



    handleSizeChange(e) {
        this.setState({ array_bars: e.target.value},
            () => this.resetArray());
    }




    toggleButtons(toggle) {
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
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.animationSpeedMS); // sets a timeout for each array bar. the further into the array, the longer the timeout
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animationIndicies[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.animationSpeedMS); // sets a timeout for each array bar. the further into the array, the longer the timeout
            }
            if (i === animationIndicies.length - 2) {
                setTimeout(() => {
                    this.toggleButtons("");
                    this.showSuccess();
                }, i * this.state.animationSpeedMS);
            }
            
        }          
    }

    quickSort(){
        const animations = quickSort(this.state.baseArray, 0, this.state.baseArray.length - 1); // will return animations
        this.setState({ baseArray: animations }) // for testing
        this.toggleButtons("")  // enable buttons
    }

    heapSort(){
        const animations = heapSort(this.state.baseArray);  // will return animations
        this.setState({ baseArray: animations }) // for testing
        this.toggleButtons("")  // enable buttons
    }

    bubbleSort() {
        const instructions = getBubbleAnimations(this.state.baseArray); // returns array of arrays in the format of [idx1, idx2, value1, value2]
        const arrayBars = document.getElementsByClassName('array-bar');
        let i = instructions.length - 1

        setTimeout(() => {      // based on the number of items in the array, we can predict how long the animation will take
            this.toggleButtons("")
            this.showSuccess()
        }, i * this.state.animationSpeedMS + 10);

        // animate the bubbling
        for (i; i > 0; i--) {
            const [barOneIdx, barTwoIdx, height1, height2] = instructions[i];
            setTimeout(() => {
                document.getElementById(barOneIdx).style.backgroundColor = SECONDARY_COLOR
                document.getElementById(barTwoIdx).style.backgroundColor = SECONDARY_COLOR
            }, i * this.state.animationSpeedMS - (this.state.animationSpeedMS / 2));

            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${height2}px`;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barTwoStyle.height = `${height1}px`;
                document.getElementById(barOneIdx).style.backgroundColor = PRIMARY_COLOR
                document.getElementById(barTwoIdx).style.backgroundColor = PRIMARY_COLOR
            }, i * this.state.animationSpeedMS);
        }


        console.log(instructions);
        this.toggleButtons("")  // enable buttons
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

            <div>
                MS per action: {this.state.animationSpeedMS}
                <input type="range" name="slider" id="slider" min="10" max="100" onChange={(event) => this.handleSpeedChange(event)}/>
            </div>

            <div>
                Size of Array: {this.state.array_bars}
                <input type="range" name="slider" id="slider" min="10" max="100" onChange={(event) => this.handleSizeChange(event)} />
            </div>

            <div className="array-cont">
                {baseArray.map((val, idx) => (
                    <div    className="array-bar" id={idx} key={idx}
                            style={{
                                backgroundColor: "lightblue",
                                width: `${900 / this.state.array_bars}px`,
                                height: `${val}px`}}>
                    </div>
                ))}
            </div>
        </>
    }
}

