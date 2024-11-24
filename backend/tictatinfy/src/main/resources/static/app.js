window.onload = initializePage;
var flag = false;
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
var queue = new Queue()

// let str = queue.printQueue;
let erase = ""

export function myFunction(id) {
    if(currPlayerXorO() == "X" && document.getElementById(id).innerHTML == "" && localStorage.getItem("lastPlayed") == "O")
    {
        document.getElementById(id).innerHTML = "X";
        queue.enqueue(id);
        localStorage.setItem("lastPlayed",'0')
    }
    else if(currPlayerXorO() == "O" && document.getElementById(id).innerHTML == "" && localStorage.getItem("lastPlayed") == "X")
    {
        document.getElementById(id).innerHTML = "O";
        queue.enqueue(id);
        localStorage.setItem("lastPlayed",'1')
    }                                    
    if(queue.size() > 6)
    {
        erase = queue.dequeue();
        updateCell(erase,-1)
        document.getElementById(erase).innerHTML = "";
    }
    checkWin();
}

export function checkWin(){
// [0,1,2]
if((document.getElementById("demo0").innerHTML == document.getElementById("demo1").innerHTML) && document.getElementById("demo1").innerHTML == document.getElementById("demo2").innerHTML && document.getElementById("demo1").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [3,4,5]
if((document.getElementById("demo3").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo5").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo3").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [6,7,8] 
if((document.getElementById("demo6").innerHTML == document.getElementById("demo7").innerHTML) && document.getElementById("demo7").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo7").innerHTML !="" )
{
    let win =  document.getElementById("demo6").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [0,3,6] 
if((document.getElementById("demo0").innerHTML == document.getElementById("demo3").innerHTML) && document.getElementById("demo3").innerHTML == document.getElementById("demo6").innerHTML && document.getElementById("demo6").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [1,4,7] 
if((document.getElementById("demo4").innerHTML == document.getElementById("demo1").innerHTML) && document.getElementById("demo1").innerHTML == document.getElementById("demo7").innerHTML && document.getElementById("demo1").innerHTML !="" )
{
    let win =  document.getElementById("demo1").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [2,5,8] 
if((document.getElementById("demo2").innerHTML == document.getElementById("demo5").innerHTML) && document.getElementById("demo5").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo5").innerHTML !="" )
{
    let win =  document.getElementById("demo2").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [0,4,8]
if((document.getElementById("demo0").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo8").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo0").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
// [2,4,6]
if((document.getElementById("demo2").innerHTML == document.getElementById("demo4").innerHTML) && document.getElementById("demo4").innerHTML == document.getElementById("demo6").innerHTML && document.getElementById("demo4").innerHTML !="" )
{
    let win =  document.getElementById("demo2").innerHTML;
    document.getElementById("won").innerHTML = win;flag = true;return;
}
    
}

export async function initializePage(){
    createSocketChannel(localStorage.getItem("sessionID"));
    const gridData = JSON.parse(localStorage.getItem('game'));
    await fillUpGrid(gridData);
}

export async function fillUpGrid(gridData){
    var i = 0;
    queue = new Queue()
    gridData.forEach(element => {
        element.forEach(elm =>{
            if(elm==0){ 
                document.getElementById("demo"+i).innerHTML = "O";
                myFunction("demo"+i)
            }else if(elm == 1){
                document.getElementById("demo"+i).innerHTML = "X";
                myFunction("demo"+i)
            }else{
                document.getElementById("demo"+i).innerHTML = "";
            }
            i++;
        })
    });
}

export function updateCell(id,value){
    if(flag){
        alert("Game is Already over");
        return;
    }
    let lastNumber = parseInt(id.charAt(id.length - 1), 10)
    let i = parseInt(lastNumber/3),j = lastNumber%3;
    myFunction(id);
    if(currPlayerXorO()=='X' && localStorage.getItem("lastPlayed") == "0"){
        sendMessage(i+"/"+j+"/"+1)
    }else if(currPlayerXorO()=='O' && localStorage.getItem("lastPlayed") == "1"){
        sendMessage(i+"/"+j+"/"+0)
    }
    if(localStorage.getItem("lastPlayed") == '-1' && currPlayerXorO()=='X'){
        sendMessage(i+"/"+j+"/"+1);
    }
    if(value == -1){
        sendMessage(i+"/"+j+"/"+-1)
    }
    // console.log(lastNumber+" sdsd"+i+" "+j);
}
export function currPlayerXorO(){
    if(localStorage.getItem("currName") == 'p1'){
        return "X";
    }else if(localStorage.getItem("currName") == 'p2'){
        return "O";
    }
}
