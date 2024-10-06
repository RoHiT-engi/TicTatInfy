var player ="X";

class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
        return item + ' inserted'
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }
    size() {
        return this.backIndex - this.frontIndex;
    }
    get printQueue() {
        return this.items;
    }
}
const queue = new Queue()

let str = queue.printQueue;
let erase = ""

function myFunction(id) {
    if(player == "X" && document.getElementById(id).innerHTML == "")
    {
        document.getElementById(id).innerHTML = "X";
        queue.enqueue(id);
        player = "O";
        
    }
    else if(player == "O" && document.getElementById(id).innerHTML == "")
        {
        document.getElementById(id).innerHTML = "O";
        queue.enqueue(id);
        player = "X";
        
    }                                    
                                    
         
    if(queue.size() > 6)
    {
        erase = queue.dequeue();
        document.getElementById(erase).innerHTML = "";
    } 
    console.log(str)  

// [0,1,2]
if((document.getElementById("demo0").innerHTML == document.getElementById("demo1").innerHTML) && document.getElementById("demo1").innerHTML == document.getElementById("demo2").innerHTML && document.getElementById("demo1").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [3,4,5]
if((document.getElementById("demo3").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo5").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo3").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [6,7,8] 
if((document.getElementById("demo6").innerHTML == document.getElementById("demo7").innerHTML) && document.getElementById("demo7").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo7").innerHTML !="" )
{
    let win =  document.getElementById("demo6").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [0,3,6] 
if((document.getElementById("demo0").innerHTML == document.getElementById("demo3").innerHTML) && document.getElementById("demo3").innerHTML == document.getElementById("demo6").innerHTML && document.getElementById("demo6").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [1,4,7] 
if((document.getElementById("demo4").innerHTML == document.getElementById("demo1").innerHTML) && document.getElementById("demo1").innerHTML == document.getElementById("demo7").innerHTML && document.getElementById("demo1").innerHTML !="" )
{
    let win =  document.getElementById("demo1").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [2,5,8] 
if((document.getElementById("demo2").innerHTML == document.getElementById("demo5").innerHTML) && document.getElementById("demo5").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo5").innerHTML !="" )
{
    let win =  document.getElementById("demo2").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [0,4,8]
if((document.getElementById("demo0").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
// [2,4,6]
if((document.getElementById("demo2").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo6").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo2").innerHTML;
    document.getElementById("won").innerHTML = win + " Player won!" ;
}
    
}



