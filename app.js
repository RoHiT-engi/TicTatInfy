var player =currPlayerXorO();
window.onload = initializePage;
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
    if(currPlayerXorO() == "X" && document.getElementById(id).innerHTML == "" && player == "X")
    {
        document.getElementById(id).innerHTML = "X";
        queue.enqueue(id);
        player = "O";
        updateCell(id,1);
    }
    else if(currPlayerXorO() == "O" && document.getElementById(id).innerHTML == "" && player == "O")
        {
        document.getElementById(id).innerHTML = "O";
        queue.enqueue(id);
        player = "X";
        updateCell(id,0);
    }                                    
                                    
         
    if(queue.size() > 6)
    {
        erase = queue.dequeue();
        document.getElementById(erase).innerHTML = "";
    } 
    checkWin();
    console.log(str)  
}

    function checkWin(){
// [0,1,2]
if((document.getElementById("demo0").innerHTML == document.getElementById("demo1").innerHTML) && document.getElementById("demo1").innerHTML == document.getElementById("demo2").innerHTML && document.getElementById("demo1").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [3,4,5]
if((document.getElementById("demo3").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo5").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo3").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [6,7,8] 
if((document.getElementById("demo6").innerHTML == document.getElementById("demo7").innerHTML) && document.getElementById("demo7").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo7").innerHTML !="" )
{
    let win =  document.getElementById("demo6").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [0,3,6] 
if((document.getElementById("demo0").innerHTML == document.getElementById("demo3").innerHTML) && document.getElementById("demo3").innerHTML == document.getElementById("demo6").innerHTML && document.getElementById("demo6").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [1,4,7] 
if((document.getElementById("demo4").innerHTML == document.getElementById("demo1").innerHTML) && document.getElementById("demo1").innerHTML == document.getElementById("demo7").innerHTML && document.getElementById("demo1").innerHTML !="" )
{
    let win =  document.getElementById("demo1").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [2,5,8] 
if((document.getElementById("demo2").innerHTML == document.getElementById("demo5").innerHTML) && document.getElementById("demo5").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo5").innerHTML !="" )
{
    let win =  document.getElementById("demo2").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [0,4,8]
if((document.getElementById("demo0").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
// [2,4,6]
if((document.getElementById("demo2").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo6").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo2").innerHTML;
    document.getElementById("won").innerHTML = win + document.getElementById("name").value ;
}
    
}

function initializePage(){
    console.log(sessionStorage.getItem("game"));
    createSocketChannel(sessionStorage.getItem("sessionID"));
    player = "X";
    const gridData = JSON.parse(sessionStorage.getItem('game'));
    fillUpGrid(gridData);
}

function fillUpGrid(gridData){
    var i = 0;
    gridData.forEach(element => {
        element.forEach(elm =>{
            const id = "demo"+i;
            if(elm == 0){
                player = 'O';
                if(document.getElementById(id).innerHTML == "")
                    {
                    document.getElementById(id).innerHTML = "O";
                    queue.enqueue(id);
                    player = "X";
                }
            }else if(elm == 1){
                player = 'X';
                if(document.getElementById(id).innerHTML == "")
                    {
                        document.getElementById(id).innerHTML = "X";
                        queue.enqueue(id);
                        player = "O";
                    }
            }else{
                document.getElementById("demo"+i).innerHTML = ''
            }
            i++;
            // document.getElementById("demo0")
            if(queue.size() > 6)
            {
                erase = queue.dequeue();
                document.getElementById(erase).innerHTML = "";
            } 
            checkWin();
            console.log(elm+" jioji "+i)
        })
    });
}

function updateCell(id,value){
    let lastNumber = parseInt(id.charAt(id.length - 1), 10); 
    let i = parseInt(lastNumber/3),j = lastNumber%3;
    sendMessage(i+"/"+j+"/"+value);
    console.log(lastNumber+" sdsd"+i+" "+j);
}
function currPlayerXorO(){
    if(sessionStorage.getItem("p1") == sessionStorage.getItem("currName")){
        return "X";
    }else{
        return "O"
    }
}
