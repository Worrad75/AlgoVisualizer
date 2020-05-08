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