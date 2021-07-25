const Memory = require('./memory')
const memory = new Memory()

class Array {
    constructor() {
        //array starts out with length of 0
        this.length = 0;
        this._capacity = 0;
        //pointer to start of memory block (in this case, 0)
        this.ptr = memory.allocate(this.length)
    }

    //push a new element to the end of the array
    push(value){
        //triple the amount of memory you have reserved (so you have space for new item) if over capacity
        if(this.length >= this._capacity) {
            this._resize(this.length + 1) * Array.SIZE_RATIO
        }
        //set the value of the final block to contain new value
        memory.set(this.ptr + this.length, value)
        this.length++
    }

    //Ideally, you would be able to ask for some extra space directly at the end of your currently allocated space. 
    //Unfortunately, that is not possible; it is likely that the space directly after what you allocated for the array will have already been allocated for some other purpose.
    //Hence the resize function: allocate a new, larger chunk of memory, copy any existing values from the old to the new chunk, and free the old chunk
    _resize(size){
        const oldPtr = this.ptr
        this.ptr = memory.allocate(size)
        if(this.ptr === null){
            throw new Error('Out of memory')
        }
        memory.copy(this.ptr, oldPtr, this.length)
        memory.free(oldPtr)
        this._capacity = size
    }

    get(index){
        if(index < 0 || index >= index.length){
            throw new Error('Index error')
        }
        //adds the index offset from the start of the memory block to find appropriate memory address
        //returns value at memory address
        return memory.get(this.ptr + index)
    }

    //pop value from end of an array by decreasing length (extra space in memory will be filled with next push)
    pop(){
        if(this.length == 0){
            throw new Error('Index error')
        }
        const value = memory.get(this.ptr + this.length - 1)
        this.length--
        return value
    }

    //to insert a value into any point in an array (not just the middle): need to shift all of the values after the new value back 1 position
    //Then you put the new value in its correct place
    insert(index, value){
        //accounts for incorrect index
        if(index < 0 || index >= this.length){
            throw new Error('Index error')
        }
        //allocates more memory if new insert makes array longer than capacity
        if(this.length >= this._capacity){
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }
        //copy(toIdx, fromIdx, size) -- we're shifting the values behind the inserted index back one
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index )
        //creates new value at memory address
        memory.set(this.ptr + index, value)
        this.length++
    }

    remove(index){
        if(index < 0 || index >= this.length){
            throw new Error('Index error')
        }
        //copy(toIdx, fromIdx, size) -- we're shifting the values behind the deleted index up one
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
        this.length--
    }
}

Array.SIZE_RATIO = 3

module.exports = Array;