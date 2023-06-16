function sayHello() {
  var name = prompt("이름을 입력하세요:");
  var greetingElement = document.getElementById("greeting");
  greetingElement.textContent = "안녕하세요, " + name + "님!";
}
