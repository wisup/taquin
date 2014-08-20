document.addEventListener("click", function(event){ clickOnButton(event.target.id || event.target.parentNode.id); });

var game = {
	init: function(){
		document.getElementById("NewGame").style.display = "none";
		document.getElementById("game").style.display = "block";
		//Building game
		var sequence = [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
		
		var level = convertLevel(game.level);
		var table = "<div id='table'>";
		for(var i = 1; i <= level; i++)
		{
			table = table+"<div id='col"+i+"' class='colonne'>";
			for(var j = 1; j <= level; j++)
			{
				//it's complicated but it works!!
				var nbr = (i)+j*level;
				switch(game.level)
				{
					case "easy":
						nbr = nbr + 12;
						break;
						
					case "medium":
						nbr = nbr + 4;
						break;
						
					case "hard":
						nbr= nbr -6;
						break;
				}
				nbr = sequence[nbr]
				table = table+"<div id='l"+j+"-col"+i+"' class='ligne'>"+nbr+"</div>";				
			}
			table = table+"</div>";
		}
		table = table+"</div>";
		
		document.getElementById("game").innerHTML = table;
	}
};

var button = {
	start: function(){
		if(game.level)
		{
			game.init();	
		}
		else
		{
			alert('Choose a level before beginning!');
		}
	},
	selectLevel: function(lvl){
		if(game.level) button.unselectLevel(game.level);
		var div = document.getElementById(lvl);
		div.children[0].style.opacity = "0";
		game.level = lvl;
	},
	unselectLevel: function(lvl){
		var div = document.getElementById(lvl);
		div.children[0].style.opacity = "0.6";
		game.level = "";
	}
}

function clickOnButton(id){
	if(id == "start")
		button.start() 
	else if(id == "easy" || id == "medium" ||  id == "hard")
		button.selectLevel(id);
	//else
		//alert(id);
}

function convertLevel(lvl){
	switch(lvl){
		case "easy":
			lvl = 3;
			break;
			
		case "medium":
			lvl = 4;
			break;
			
		case "hard":
			lvl = 5;
			break;
	}
	
	return lvl;
}
