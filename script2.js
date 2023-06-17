document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 전송 이벤트 중지
    
    // 입력값 가져오기
    var name = document.getElementById('name-input').value;
    var message = document.getElementById('message-input').value;
    
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
  