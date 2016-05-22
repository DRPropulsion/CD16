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
			var unparsedingredients = document.getElementById("list");
			var parseddata = "";
			var postedingredients = "";
			for (var key in datatoparse) {
				//you can (and should!) change this
				//parseddata += datatoparse[key]["publisher"] + " " + datatoparse[key]["title"] + " " + datatoparse[key]["source_url"] + "BREAK" + '<br/>';
				
				parseddata += ('<li class="WHATEVER">'
							+'<h1><a href="'+datatoparse[key]["source_url"]+'">'+datatoparse[key]["title"]+'</h1>'
							+'<img src="'+datatoparse[key]["image-url"]+'"></img>'
							+'<h2>'+datatoparse[key]["publisher"]+'</h2>'
							+'<h3>'+datatoparse[key]["social_rank"]+'</h3>'
							+'<span class="SOMETHING">'+datatoparse[key]["social_rank"]+'</span></li>');
			}
			document.getElementById("postedlist").innerHTML += postedingredients;
			document.getElementById("recipeList").innerHTML += parseddata;
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
