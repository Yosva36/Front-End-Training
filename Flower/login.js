function login() {
  let name = document.getElementById("name-popup");
  let menu = document.getElementById("menu");

  console.log(name);
  console.log(name.style.display);

  if (name.style.display == "") {
    console.log(name.style.display);
    name.style.display = "block";
  }
}

function closePopup() {
  let name = document.getElementById("name-popup");
  let close = document.getElementById("close");
  if (name.style.display == "block") {
    name.style.display = "";
  }
}
