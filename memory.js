//simulates a block of memmory
//ptr short for pointer: contains memory address
class Memory {
    constructor() {
      this.memory = new Float64Array(1024);
      this.head = 0;
    }
  
    //size = number of boxes needed
    //reserves a contiguous block of memory consisting of "size" boxes that can be modified, returns a pointer to the first box or null if the allocation fails
    allocate(size) {
      if (this.head + size > this.memory.length) {
        return null;
      }
  
      let start = this.head;
  
      this.head += size;
      return start;
    }
    
    //frees the block of memory reserved using allocate
    free(ptr) {}
  
    //copies "size" boxes of data from pointer from Idx to pointer toIdx (for example, copy(10, 0, 3) would copy the values at boxes 0, 1 and 2 to the boxes at 10, 11 and 12 respectively)
    copy(toIdx, fromIdx, size) {
      if (fromIdx === toIdx) {
        return;
      }
  
      if (fromIdx > toIdx) {
        // Iterate forwards
        for (let i = 0; i < size; i++) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      } else {
        // Iterate backwards
        for (let i = size - 1; i >= 0; i--) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      }
    }
  
    //returns the value stored at a certain memory address
    get(ptr) {
      return this.memory[ptr];
    }
  
    //sets the values stored at a certain memory address
    set(ptr, value) {
      this.memory[ptr] = value;
    }
  }
  
  module.exports = Memory;