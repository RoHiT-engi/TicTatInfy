
let socket;

export async function fetchData(url) {
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

export async function sendData(url, payload) {
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

export function createSocketChannel(sessionID){
    socket = new WebSocket("wss://tictatinfy.onrender.com/connect?id="+sessionID);
    // socket = new WebSocket("wss://localhost:8090/connect?id="+sessionID);

    socket.onopen = function() {
        console.log("Connected to the WebSocket server.");
    };

    socket.onmessage = function(event) {
        let cleanedString = event.data;
        localStorage.setItem("lastPlayed",cleanedString.charAt(cleanedString.length -1,10));
        cleanedString = cleanedString.split("]]")[0] + ']]';
        const parsedArray = JSON.parse(cleanedString);
        const integerArray = parsedArray.map(row =>
            row.map(element => parseInt(element, 10))
        );
        fillUpGrid(integerArray)
    };

    socket.onclose = function() {
        localStorage.clear();
        console.log("Connection closed.");
    };

    socket.onerror = function(error) {
        console.error("WebSocket error: ");
        console.log(error)
    };
}

export function sendMessage(message) {
    if (!message) {
        alert("Please enter a message to send.");
        return;
    }
    socket.send(message);
}
