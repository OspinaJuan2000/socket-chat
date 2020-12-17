const params = new URLSearchParams(window.location.search);
const divUsers = document.querySelector('#divUsuarios');
const divMessages = document.querySelector('#divChatbox');
const textGroupChat = document.querySelector('#groupChat');
const formSendMessage = document.querySelector('#form-sendMessage');

const userParams = params.get('name');
const roomParams = params.get('room');

const renderInfoUsers = (users) => {
    textGroupChat.innerHTML = URLparams.get('room');

    let htmlChat = '';

    htmlChat += `
        <li>
        <a href="javascript:void(0)" class="active"> Group chat: <span> ${roomParams}</span> </a>
        </li>
    `;

    users.forEach(user => {
        htmlChat += `
            <li>
                <a data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${user.name} <small class="text-success">online</small></span></a>
            </li>
        `;
    });

    divUsers.innerHTML = htmlChat;
};

const renderMessages = (infoMessage, option) => {
    const {
        name,
        message
    } = infoMessage;

    let adminClass = 'info';
    if (infoMessage.name === 'Administrator') {
        adminClass = 'danger';
    }

    const date = new Date(infoMessage.date);
    const messageHour = `${date.getHours()}: ${date.getMinutes()}`;

    const li = document.createElement('li');

    if (option) {
        li.innerHTML = `
            <div class="chat-content">
                <h5>${name}</h5>
                <div class="box bg-light-inverse">${message}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${messageHour}</div>
            `;
        li.classList.add('reverse');
    } else {

        li.innerHTML = `
        ${infoMessage.name === 'Administrator' ? '' : '<div class="chat-img"><img src="assets/images/users/3.jpg" alt="user" /></div>'}
        <div class="chat-content">
            <h5>${name}</h5>
            <div class="box bg-light-${adminClass}">${message}</div>
        </div>
        <div class="chat-time">${messageHour}</div>
        `;
    }

    li.classList.add('animated', 'fadeIn');


    divMessages.appendChild(li);
};

divUsers.addEventListener('click', (e) => {

    if (e.target.dataset.id) {
        const id = e.target.dataset.id;
        console.log(id);
    }
});


formSendMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = formSendMessage['message'];

    if (message.value.trim() === '') {
        return;
    }

    socket.emit('sendMessage', {
        user: userParams,
        message: message.value
    }, (resp) => {
        message.value = '';
        message.focus();
        renderMessages(resp, true);
    });
});