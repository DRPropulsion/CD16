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
		document.getElementById("inputBox").placeholder = "";
	}
}

//adds object to pantry list
function addToList() {
	var input = document.getElementById("inputBox").value.trim();
	if (input !== "")
	{
		document.getElementById("inputBox").value = "";
		document.getElementById("list").innerHTML += ('<li><span class="libg">'+input+'</span></li>');
	} 
}

//clears the pantry list
function clearList() {
	document.getElementById("list").innerHTML = "";
}


//jquery functions: api ping and hover coloration for clear button
$(document).ready(function() {
	$("#searchbutton").click(function() { 
		//$.get("http://food2fork.com/api/search?key=c8b4412d38aeeade93c0bab3425f24ce&q=", function(data) {
		var listofingredients = document.getElementById("list").innerHTML;
		//console.log(listofingredients);
		var unparsedingredientsquery = listofingredients.split(('</span></li><li><span class="libg">'));
		var ingredientquery = "";
		var postedingredients = "<p>You searched for: ";
		for (var i = 0; i < unparsedingredientsquery.length; i++) {
			if (i === unparsedingredientsquery.length - 1) {
				var item = unparsedingredientsquery[i];
				item = item.substring(0, item.length - 12);
				if (i===0) {
					item = item.substring(23);
				}
				postedingredients += ('<span class="libg">'+item+'</span>');
				ingredientquery += item;
			}
			else {
				var item = unparsedingredientsquery[i];
				if (i===0) {
					item = item.substring(23);
				}
				postedingredients += ('<span class="libg">'+item+'</span>') + " ";
				ingredientquery += item + "%2C%20";
			}
		}
		postedingredients += "</p>";
		if (ingredientquery==="") {
			document.getElementById("inputBox").placeholder = "You can't cook without ingredients!";
		}
		else {
			$.get("https://cz9dldanfb.execute-api.us-east-1.amazonaws.com/prod/ingredient/"+ingredientquery, function(data) {
				//console.log(data);
				document.getElementById("postedlist").innerHTML = "";
				document.getElementById("recipelist").innerHTML = "";
				var parseddata = "";
	/* 			var unparsedingredients = listofingredients.split("</li><li>");
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

				postedingredients += "</p>"; */
				
				/*THIS IS HOW YOU PARSE THE JSON
				for (var i = 0; i < data["recipes"].length; i++)
				{
					console.log(data["recipes"][i]);
				}
				*/
				
				for (var i = 0; i < data["recipes"].length; i++) {
					
					parseddata += ('<li class="recipe">'
								+'<a href="'+data["recipes"][i]["source_url"]+'"><img src="'+data["recipes"][i]["image_url"]+'"></img></a>'
								+'<span><h1><a href="'+data["recipes"][i]["source_url"]+'">'+data["recipes"][i]["title"]+'</a></h1>'
								+'<h2>by '+data["recipes"][i]["publisher"]+'</h2>'
								+'<h3>Social Rank</h3>'
								+'<span class="rank">'+data["recipes"][i]["social_rank"]+'</span></span></li>');
				}
				if (data["recipes"].length === 0) {
					parseddata += '<span class="error">Alphabet Soup!  It looks like there\'s nothing containing all of your ingredients.  Please try a less detailed search.</span>';
				}
				var modalobject = document.getElementById("recipeModal")
				document.getElementById("postedlist").innerHTML += postedingredients;
				document.getElementById("recipelist").innerHTML += parseddata;
				modalobject.style.display = "block";
			});
		}
	});
	$(".clearer").hover(function(){
		document.getElementById("clearbutton").style.backgroundColor = "grey";
	},
	function() {
		document.getElementById("clearbutton").style.backgroundColor = "#999999";
	});
});

