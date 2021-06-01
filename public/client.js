const socket = io();

let name;

let input = document.querySelector('#input');

do {
    name = prompt('Enter you name...?');
    const username = document.querySelector('.user-name');
    username.textContent = name;
} while (!name);

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        e.target.value = '';
    }
})

const sendMessage = (msg) => {
      msg = {
        name: name,
        message:msg
      }

    //append
    appendMsg(msg, 'outgoing');
    socket.emit('message', msg);
}


const appendMsg = (msg,type) => {
    
    //messages area
    const msgArea = document.querySelector('.message-area');

    const mainDiv = document.createElement('div');
    //create msg element and append txt thn append to dom element
    let className = type === 'outgoing' ? 'text-right':'text-left';
    mainDiv.classList.add(className, className);
    
    mainDiv.innerHTML = `
        <b>${msg.name}</b>
        <p>${msg.message}</p>
    `;

    msgArea.appendChild(mainDiv);

}

// geting sms
socket.on('message', (msg) => {
    appendMsg(msg,'incoming');
})