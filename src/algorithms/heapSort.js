function getLeftChildIndex(idx) {
    return (idx * 2) + 1
}

function getRightChildIndex(idx) {
    return (idx * 2) + 2
}

function getParentIndex(idx) {
    return (idx - 2) / 2
}

function hasLeftChild(idx, items) {
    return getLeftChildIndex(idx) < items.length
}

function hasRightChild(idx, items) {
    return getRightChildIndex(idx) < items.length
}

function hasParent(idx, items) {
    return getParentIndex(idx) < items.length
}

function getLeftChild(idx, items) {
    return items[getLeftChildIndex(idx)]
}

function getRightChild(idx, items) {
    return items[getRightChildIndex(idx)]
}

function getParent(idx, items) {
    return items[getParentIndex(idx)]
}

function swap(idx1, idx2, items) {
    [items[idx1], items[idx2]] = [items[idx2], items[idx1]];
    // let temp = items[idx1];
    // items[idx1] = items[idx2]
    // items[idx2] = temp
}

////////////////////////////////////////////////////////////////////

function remove(items) {
    let smallest = 0;
    items.pop()
    return [items, smallest];
}

function heapify(items) {
    return items;
}

export function heapSort(items) {
    let heap = heapify(items);
    const result = [];
    while (items.length > 1) {
        let data = remove(items)
    }
    return result
}