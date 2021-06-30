function chunk(arr, size =1){
    let result = [];
    let tmp = [];
    arr.forEach(item =>{
        if(tmp.length === 0){
            result.push(tmp)
        }
        tmp.push(item);
        if(tmp.length === size){
            tmp = []
        }
    })
 return result
}

// 使用 将数组元素按照3个一组分配，不足一组的也算一组、也算是低级版升维数组😁
// chunk([1, 2, 5, 2, 10, 20, 30,2,1,9],3)