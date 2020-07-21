export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const dupArr = array.slice();
    mergeSortHelper(array, 0, array.length - 1, dupArr, animations);
    return animations;
}


function mergeSortHelper(arrToSort, srtIdx, endIdx, dupArr, animations) {
    if (srtIdx === endIdx) return;

    const midIdx = Math.floor((srtIdx + endIdx) / 2);
    mergeSortHelper(dupArr, srtIdx, midIdx, arrToSort, animations);
    mergeSortHelper(dupArr, midIdx + 1, endIdx, arrToSort, animations);

    doMerge(arrToSort, srtIdx, midIdx, endIdx, dupArr, animations);
}


function doMerge(arrToSort, srtIdx, midIdx, endIdx, dupArr, animations) {

    let k = srtIdx;         // arrToSort index
    let i = srtIdx;         // animation index 1
    let j = midIdx + 1;     // animation index 2

    while (i <= midIdx && j <= endIdx) {

        animations.push([i, j]);    // These are the values that we're comparing; we push them the first
        // time to change their color.

        animations.push([i, j]);    // These are the values that we're comparing; we push them a second
        // time to revert their color.

        if (dupArr[i] <= dupArr[j]) {       // if the 
            animations.push([k, dupArr[i]]);    // We overwrite the value at index k in the original array with the
            // value at index i in the dupped array. We are grabbing the smaller value
            arrToSort[k++] = dupArr[i++];
            //--> increment pointer for both arrToSort and animations,  
        } else {
            animations.push([k, dupArr[j]]);    // We overwrite the value at index k in the original array with the
            // value at index j in the dupped array. We are grabbing the smaller value

            arrToSort[k++] = dupArr[j++];
        }
    }

    while (i <= midIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, dupArr[i]]);
        arrToSort[k++] = dupArr[i++];
    }

    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, dupArr[j]]);
        arrToSort[k++] = dupArr[j++];
    }
}


// NEW IMPLEMENTATION
// ////////////////////////////////////


// Merge Sort Implentation (Recursion)
function mergeSort(unsortedArray) {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    );
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
        }
    }

    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}


/////////////

function divide(collection) {
    if (collection.length < 2) {
        return collection;
    } else {
        let midpoint = Math.floor(collection.length / 2);
        var left = collection.slice(0, midpoint);
        var right = collection.slice(midpoint);
    }
    return merge(
        divide(left), divide(right)
    );
}
function merge(leftArr, rightArr) 
    let sorted = [];
    while (leftArr.length > 0 && rightArr.length > 0) {
        if (leftArr[0] < rightArr[0]) {
            let data = leftArr.shift();
            sorted.push(data)
        } else {
            let data = rightArr.shift();
            sorted.push(data)
        }
    return sorted.concat(leftArr).concat(rightArr);
}