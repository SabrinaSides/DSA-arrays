const Array = require('./array');
//using Array class created above, add an item to the array

function main() {
  Array.SIZE_RATIO = 3;

  //create an instance of the Array class
  let arr = new Array();

  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  //Push() method:
    //What is the length, capacity and memory address of your array? Length= 6, capacity= 6, ptr = 15

  arr.pop();
  arr.pop();
  arr.pop();

  //Pop() method:
    //What is the length, capacity and memory address of your array? Length= 3, capacity= 6, ptr = 15

  //print the 1st item in the array arr.
  console.log('1st item', arr.get(0))

  // Empty the array and add just 1 item: arr.push("tauhida");
  arr.pop()
  arr.pop()
  arr.pop()
  arr.push("tauhida")

  //Print this 1 item that you just added. What is the result? Can you explain your result?
  //undefined b/c Memory class only accepts numbers

  //What is the purpose of the _resize() function in your Array class?
  //It allows us to allocate more memory for the array when we reach the array's capacity, copying the existing values into the new memory addresses

  console.log(arr);
}

console.log(main());

//5. URLify a string

function URLify(string){
    return string.split(' ').join('%20')
}

console.log('Urlify:', URLify('tauhida parveen'))
console.log('Urlify:', URLify('www.thinkful.com /tauh ida parv een'))

//6. Filtering an array- remove all numbers less than 5
function filterArray(number, array){
    let filteredArray = []

    for(let i = 0; i < array.length; i++){
        if(array[i] >= number){
            filteredArray.push(array[i])
        }
    }
    return filteredArray
}

console.log('filterArray:', filterArray(5, [4, 9, 8, 2]))

//7. Max sum in the array
function maxSum(arr){
    let sum = 0
    let maxSum = 0
    for(let i = 0; i < arr.length; i++){
        sum = arr[i]
        i++
        for(let j = 1; j < arr.length; j++){
            sum += arr[j]
            if(sum > maxSum){
                maxSum = sum
            }
        }
    }
    return maxSum
}

console.log('Max Sum: ', maxSum([4,6,-3,5,-2,1]))

// 8. Merge arrays

function mergeArrays(arr1, arr2){
    let mergedArray = []
    arr1.forEach(number => mergedArray.push(number))
    arr2.forEach(number => mergedArray.push(number))
    return mergedArray.sort((a, b) => a - b)
}

