
let socket;

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON data from the response
        const data = await response.json();
        // console.log('Data received:', data);

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function sendData(url, payload) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add authorization token if needed
                'Authorization': 'Bearer your_token_here',
            },
            body: JSON.stringify(payload)
        });

        // Handle the response
        const data = await response.json();
        // console.log('Data posted successfully:', data);

        return data;
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

function createSocketChannel(sessionID){
    socket = new WebSocket("ws://localhost:8090/connect?id="+sessionID);
    socket.onopen = function() {
        console.log("Connected to the WebSocket server.");
    };

    socket.onmessage = function(event) {
        let cleanedString = event.data;
        console.log(cleanedString);
        const parsedArray = JSON.parse(cleanedString);
        const integerArray = parsedArray.map(row =>
            row.map(element => parseInt(element, 10))
        );
        fillUpGrid(integerArray)
        console.log(integerArray);
    };

    socket.onclose = function() {
        console.log("Connection closed.");
    };

    socket.onerror = function(error) {
        console.error("WebSocket error: " + error);
    };
}

function sendMessage(message) {
    // const message = document.getElementById("messageInput").value;
    if (!message) {
        alert("Please enter a message to send.");
        return;
    }
    // Send message to the server via WebSocket
    console.log(socket);
    socket.send(message);
    console.log("Message sent to server: " + message);
}
