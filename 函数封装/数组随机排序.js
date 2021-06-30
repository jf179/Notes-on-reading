function randomSort(arr) {
    var result = [];
    while (arr.length > 0) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        result.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }

    return result;
}


// 方法二
function randomSort(array) {
    let length = array.length;

    if (!Array.isArray(array) || length <= 1) return;

    for (let index = 0; index < length - 1; index++) {
        let randomIndex = Math.floor(Math.random() * (length - index)) + index;

        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
}