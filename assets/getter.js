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


//jquery functions: api ping and hover coloration for clear button
$(document).ready(function() {
	$("#searchbutton").click(function() { //TODO: grab list of ingredients, sorting
		//$.get("http://food2fork.com/api/search?key=c8b4412d38aeeade93c0bab3425f24ce&q=", function(data) {
		$.get("https://cz9dldanfb.execute-api.us-east-1.amazonaws.com/prod/ingredient/bread", function(data) {
			//console.log(data);
			document.getElementById("postedlist").innerHTML = "";
			document.getElementById("recipelist").innerHTML = "";
			var listofingredients = document.getElementById("list").innerHTML;
			console.log(listofingredients);
			var unparsedingredients = listofingredients.split("</li><li>");
			var parseddata = "";
			var postedingredients = "<p>You searched for: ";
			
			for (var i = 0; i < unparsedingredients.length; i++) {
				if (i === unparsedingredients.length - 1) {
					var item = unparsedingredients[i];
					item = item.substring(0, item.length-5);
					postedingredients += item;
				}
				else {
					var item = unparsedingredients[i];
					if (i===0) {
						item = item.substring(4);
					}
					postedingredients += item + " ";
				}
			}

			postedingredients += "</p>";
			
			/*THIS IS HOW YOU PARSE THE JSON
			for (var i = 0; i < data["recipes"].length; i++)
			{
				console.log(data["recipes"][i]);
			}
			*/
			
			for (var i = 0; i < data["recipes"].length; i++) {
				
				parseddata += ('<li class="recipe">'
							+'<div><a href="'+data["recipes"][i]["source_url"]+'"><img src="'+data["recipes"][i]["image_url"]+'"></img></a></div>'
							+'<div><h1><a href="'+data["recipes"][i]["source_url"]+'">'+data["recipes"][i]["title"]+'</a></h1>'
							+'<h2>by '+data["recipes"][i]["publisher"]+'</h2>'
							+'<h3>Social Rank</h3>'
							+'<span class="SOMETHING">'+data["recipes"][i]["social_rank"]+'</span></div></li>');
			}
			var modalobject = document.getElementById("recipeModal")
			document.getElementById("postedlist").innerHTML += postedingredients;
			document.getElementById("recipelist").innerHTML += parseddata;
			modalobject.style.display = "block";
		});
	});
	$(".clearer").hover(function(){
		document.getElementById("clearbutton").style.backgroundColor = "grey";
	},
	function() {
		document.getElementById("clearbutton").style.backgroundColor = "#999999";
	});
});

