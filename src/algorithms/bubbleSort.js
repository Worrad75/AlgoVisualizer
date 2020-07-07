export function getBubbleAnimations(array){
    let instructions = [];

    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {
            let a = array[j]
            let b = array[j + 1]
            if (a > b) {
                bubble(array, j, j + 1, i)
                instructions.push([j, j + 1, a, b])
            }
        }
    }
    return instructions;
}

function bubble(arr, idx1, idx2, i){  // helper method to bubbleSort that combines "swap" and color correction
    var temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}