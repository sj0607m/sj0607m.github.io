// script.js
document.addEventListener('DOMContentLoaded', function() {
    loadEntries();

    document.getElementById('guestbook-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 전송 이벤트 중지
        
        // 입력값 가져오기
        var name = document.getElementById('name-input').value;
        var message = document.getElementById('message-input').value;
        
        // 로컬 스토리지에 저장
        var entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.push({ name: name, message: message });
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
        
        // 방명록 항목 생성
        var entry = document.createElement('div');
        entry.classList.add('guestbook-entry');
        entry.innerHTML = '<strong>' + name + '</strong>: ' + message;
        
        // 방명록 목록에 추가
        var guestbookEntries = document.getElementById('guestbook-entries');
        guestbookEntries.appendChild(entry);
        
        // 입력 필드 초기화
        document.getElementById('name-input').value = '';
        document.getElementById('message-input').value = '';
    });
});

function loadEntries() {
    var entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    var guestbookEntries = document.getElementById('guestbook-entries');
    guestbookEntries.innerHTML = '';
    entries.forEach(function(entry) {
        var entryDiv = document.createElement('div');
        entryDiv.classList.add('guestbook-entry');
        entryDiv.innerHTML = '<strong>' + entry.name + '</strong>: ' + entry.message;
        guestbookEntries.appendChild(entryDiv);
    });
}

function sayHello() {
    var name = prompt("이름을 입력하세요:");
    var greetingElement = document.getElementById("greeting");
    greetingElement.textContent = "안녕하세요, " + name + "님!";
}
