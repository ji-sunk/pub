const img = document.querySelector('.chat-input img');
const sysTime = document.querySelector('.topbar-left');
const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
});
sysTime.innerHTML = currentTime;
img.addEventListener('click', () => {
    img.src = img.src.includes('user1')
    ? './img/user2.jpg'
    : './img/user1.jpg';
});
const btn = document.querySelector('#btn');
const txt = document.querySelector('#txt');
const sendMsg = () => {
    const value = txt.value;
    const chatHtml = `<div class="chat-user ${
        img.src.includes('user1') ? 'user1' : 'user2'
    }">
        <div class="user-img">
            <img src="./img/${
                img.src.includes('user1') ? 'user1' : 'user2'
            }.jpg" alt="" />
        </div>
        <div class="user-msg">
            <p>${value}</p>
            <span class="time">${currentTime}</span>
        </div>
    </div>`;
const chats = document.querySelector('.chats');
const chatPage = document.querySelector('.chat-page');
if (value !== '') {
    chats.innerHTML += chatHtml;
    txt.value = '';
    txt.focus();
    chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
}
};
btn.addEventListener('click', () => {
    sendMsg();
});
txt.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
    sendMsg();
    }
});