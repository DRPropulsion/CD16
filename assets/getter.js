/*function getRecipes(url, callback) {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
            cfunc(xhttp);
        }
    };
	xhttp.open("GET", url, true);
	xhttp.send();
}*/

$(document).ready(function() {
	$("#searchbutton").click(function() {
		$.get("http://food2fork.com/api/search?key=c8b4412d38aeeade93c0bab3425f24ce&q=bread", function(data) {
			//document.getElementById("statement").innerHTML += data;
			var parsedData = JSON.parse(data);
			document.getElementById("statement").innerHTML += parsedData;
		});
	});
});