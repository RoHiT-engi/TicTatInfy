
        // let BasseIP = import.meta.env.BasseIP; 
        console.log(import.meta.env.VITE_API_BASE_URL);
        let sessionId = '';
        let BasseIP = 'http://localhost:8090'
        let creatURI = BasseIP + '/create'
        let creatp2URI = BasseIP + '/createp2/'
        let fetchSessionURI = BasseIP + '/getSession/'
        
        async function createGame() {
            // Establish WebSocket connection
            const payload = { player1: document.getElementById("name").value };
            const res = await sendData(creatURI, payload);
            // createSocketChannel(res);
            sessionId = res.sessionID;
            document.getElementById("create").disabled = true;
            document.getElementById("sessionID").innerText = "Session Created with ID : "+sessionId;
            document.getElementById("SessionGo").style.display = "block";
        }


        async function joinGame() {
            const joinSessionId = document.getElementById("joinSessionId").value;
            if (joinSessionId.trim() === "") {
                alert("Please enter a session ID.");
                return;
            }
            const payload = { player2: document.getElementById("name").value };
            const res = await sendData(creatp2URI+joinSessionId, payload);
            localStorage.setItem("game",JSON.stringify(res[0].grid));
            localStorage.setItem("sessionID",res[0].session_id);
            localStorage.setItem("p1",res[0].player1);
            localStorage.setItem("p2",res[0].player2);
            localStorage.setItem("lastPlayed",res[0].lastPlayed);
            // createSocketChannel(res);
            document.getElementById("sessionID").innerText = "Joined session: " + res[0].session_id;
            sessionId = res[0].session_id;
            setCurrPlayer(document.getElementById("name").value);
            window.location.href = `index.html`;
        }

        async function startGame() {
            if (!sessionId) {
                alert("You need to create or join a session first!");
                return;
            }
            const res = await fetchData(fetchSessionURI+sessionId);
            localStorage.setItem("game",JSON.stringify(res[0].grid));
            localStorage.setItem("sessionID",res[0].session_id);
            localStorage.setItem("p1",res[0].player1);
            localStorage.setItem("p2",res[0].player2);
            localStorage.setItem("lastPlayed",res[0].lastPlayed)
            document.getElementById("sessionID").innerText = "Game started with session: " + sessionId;
            setCurrPlayer(document.getElementById("name").value);
            window.location.href = `index.html`;
        }

        function setCurrPlayer(name){
            if(name == localStorage.getItem("p1")){
                localStorage.setItem("currName",'p1');
            }else if(name == localStorage.getItem("p2")){
                localStorage.setItem("currName",'p2');
            }else{
                alert("Unknown Error Occured")
                window.location.href = `index.html`;
            }
        }
