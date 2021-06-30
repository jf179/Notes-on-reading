function sumBven(str) {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] % 2 == 0) {
            num += str[i]
        }
    }
    return num;
}