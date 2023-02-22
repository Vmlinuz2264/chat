function decode(text){
var decoded = "";
var chars = "1234567890qwertyuiopasdfghjklzxcvbnm .,?!)(:;-_|";
for(var i = 0;i < text.length;i = i + 2){
var nums = parseFloat(text.charAt(i) + text.charAt(i + 1));
decoded += chars.charAt(nums - 1);
}
console.log("Decoded: " + decoded);
return decoded;
}
function refresh(){
document.getElementById("link").href = "https://scratch.mit.edu/projects/" + document.getElementById("server").value;
fetch("https://api.allorigins.win/get?url=https://clouddata.scratch.mit.edu/logs?projectid=" + document.getElementById("server").value + "&limit=40&offset=0").then(function (r){return r.json()}).then(function (j){
console.log("Fetched: " + j);
  var dataHTML = "";
for(var x = 0;x < j.length;x++){
var user = decode(j[x].value).split("|")[0];
var text = decode(j[x].value).split("|")[1];
var date = new Date(j[x].timestamp);
var datestring = timeago().format(date);
dataHTML += "<p><a href='https://scratch.mit.edu/users/" + user + "'>" + user + "</a>: " + text + " <i style='color:#ddd'>" + datestring + "</i></p>";
  console.log(user + ": " + text);
};
document.getElementById("data").innerHTML = dataHTML;
  console.log(dataHTML);
var d = new Date();
document.getElementById("refresh").innerHTML = "Refreshed at: " + d.toTimeString();
  console.log("Refreshed at: " + d.toTimeString());
})
}
window.addEventListener("load",function (){refresh();setInterval(refresh,10000)})
