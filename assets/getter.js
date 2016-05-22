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

//jquery functions: api ping and hover coloration for clear button
$(document).ready(function() {
	$("#searchbutton").click(function() {
		$.get("http://food2fork.com/api/search?key=c8b4412d38aeeade93c0bab3425f24ce&q=bread", function(data) {
			var actualdata = data.substring(24, data.length - 1);
			document.getElementById("statement").innerHTML = "";
			var datatoparse = JSON.parse(actualdata);
			var parseddata = "";
			for (var key in datatoparse) {
				parseddata += datatoparse[key]["publisher"] + " " + datatoparse[key]["title"] + " " + datatoparse[key]["source_url"] + "BREAK" + '<br/>';
			}
			document.getElementById("statement").innerHTML += parseddata;
		});
	});
	$(".clearer").hover(function(){
		document.getElementById("clearbutton").style.backgroundColor = "grey";
	},
	function() {
		document.getElementById("clearbutton").style.backgroundColor = "#999999";
	});
});

//checks to see if keypress is enter
function checkForEnter() {
	if (event.keyCode == 13)
	{
		addToList();
	}
}

//adds object to pantry list
function addToList() {
	var input = document.getElementById("inputBox").value.trim();
	if (input !== "")
	{
		document.getElementById("inputBox").value = "";
		document.getElementById("list").innerHTML += ('<li><span class="libg">'+input+'</li>');
	} 
}

//clears the pantry list
function clearList() {
	document.getElementById("list").innerHTML = "";
}
