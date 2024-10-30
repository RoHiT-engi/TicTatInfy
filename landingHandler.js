
        let sessionId = '';
        let BasseIP = 'http://localhost:8090'
        let creatURI = BasseIP + '/create'
        let creatp2URI = BasseIP + '/createp2/'
        let fetchSessionURI = BasseIP + '/getSession/'
        
        async function createGame() {
            // Establish WebSocket connection
            const payload = { player1: 'john' };
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
            sessionStorage.setItem("game",JSON.stringify(res[0].grid));
            sessionStorage.setItem("sessionID",res[0].session_id);
            sessionStorage.setItem("p1",res[0].player1);
            sessionStorage.setItem("p2",res[0].player2);
            sessionStorage.setItem("currName",document.getElementById("name").value);
            // createSocketChannel(res);
            document.getElementById("sessionID").innerText = "Joined session: " + res[0].session_id;
            sessionId = res[0].session_id;
            window.location.href = `index.html`;
        }

        async function startGame() {
            if (!sessionId) {
                alert("You need to create or join a session first!");
                return;
            }
            const res = await fetchData(fetchSessionURI+sessionId);
            sessionStorage.setItem("game",JSON.stringify(res[0].grid));
            sessionStorage.setItem("sessionID",res[0].session_id);
            sessionStorage.setItem("p1",res[0].player1);
            sessionStorage.setItem("p2",res[0].player2);
            sessionStorage.setItem("currName",document.getElementById("name").value);
            document.getElementById("sessionID").innerText = "Game started with session: " + sessionId;
            window.location.href = `index.html`;
        }
