let animations = []

function buildMaxHeap(array) {
    // console.log("in buildMaxHeap")
    let i;
    i = array.length / 2 - 1;
    i = Math.floor(i);

    while (i >= 0) {
        heapify(array, i, array.length);
        i -= 1;
    }
}


function heapify(heap, i, max) {
    // console.log("in heapify")
    animations.push("heapify")

    var index, leftIdx, rightIdx;
    while (i < max) {
        index = i;

        leftIdx = 2 * i + 1;
        rightIdx = leftIdx + 1;
        leftIdx = i * 2 + 1;
        rightIdx = i * 2 + 2;

        if (leftIdx < max && heap[leftIdx] > heap[index]) {
            index = leftIdx;
        }

        if (rightIdx < max && heap[rightIdx] > heap[index]) {
            index = rightIdx;
        }

        if (index === i) {
            return;
        }

        swap(heap, i, index);

        i = index;
    }
}

function swap(items, idx1, idx2) {
    // console.log("in swap")
    animations.push("swap")

    let temp = items[idx1];
    items[idx1] = items[idx2]
    items[idx2] = temp
}

////////////////////////////////////////////////////////////////////


export function heapSort(array) {       // will return a list of animations
    console.log("in heapSort")
    // Build our max heap.
    buildMaxHeap(array);

    // Find last element.
    let lastElement = array.length - 1;

    // Continue heap sorting until we have
    // just one element left in the array.
    while (lastElement > 0) {
        swap(array, 0, lastElement);
        
        heapify(array, 0, lastElement);
        
        lastElement -= 1
        // console.log("decrementing")
        animations.push("decrement")
        
    }
    console.log(570 - Math.pow(array.length, 2))
    return array;
    // return animations;
}