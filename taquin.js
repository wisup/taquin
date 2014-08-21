document.addEventListener("click", function(event){ button.clickOnIt(event.target.id || event.target.parentNode.id); });

var game = {
	init: function(){
		_("NewGame").style.display = "none";
		_("game").style.display = "block";
		//Building game
		var sequence = [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
		
		var level = convertLevel(game.level);
		game.nbrLvl = level;
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
				var border = "";
				border = border + "border-top: 3px solid black; border-left: 3px solid black; ";
				if(j==level)
					border = border + "border-bottom: 3px solid black;";
				if(i==level)
					border = border + "border-right: 3px solid black;";
					
				if(i==level && j == level)
					border = border +"background-color: brown; color: brown; cursor: auto;";
				table = table+"<div id='l"+j+"-col"+i+"' class='ligne' style='"+border+"'>"+nbr+"</div>";		
					
			}
			table = table+"</div>";
		}
		table = table+"</div>";
		
		_("game").innerHTML = table;
		
		game.start = 1;
	},
	moveTile: function(coor, coorF){
		var id = "l"+coor.y+"-col"+coor.x;
		var idF = "l"+coorF.y+"-col"+coorF.x;
		
		var tile = _(id);
		var tileF = _(idF);
		
		var value = tile.innerHTML;
		
		tileF.innerHTML = value;
		tile.innerHTML = "0";
		
		tile.style.background = "brown";
		tileF.style.background = "white";
		
		tile.style.color = "brown";
		tileF.style.color = "black";
	},
	wellPlaced: function(coor){
	},
	win: function(){
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
		var div = _(lvl);
		div.children[0].className = "opSelected";
		game.level = lvl;
	},
	unselectLevel: function(lvl){
		var div = _(lvl);
		div.children[0].className = "op";
		game.level = "";
	},
	clickOnIt: function(id){
		if(id == "start")
			button.start();
		else if(id == "easy" || id == "medium" ||  id == "hard")
			button.selectLevel(id);
		else if(game.start && game.start == 1)
		{
			//if game is started
			var coor = checkIdButton(id);
			if(coor)
			{
				//if what we clicked on was a button (with regular id
				var coorF = checkFreeTile(coor);
				if(coorF)
				{
					//if there was a free tile near it
					game.moveTile(coor, coorF);
				}
			}
		}
	}
}

//ARG: level string
//FUNCTION: convert textual level into number
//RETURN: lvl in number
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


//ARG: id button clicked
//FUNCTION: check if it is a button of the game
//RETURN: object with the coordonate of the button
function checkIdButton(id){
	var testL = id.indexOf("l");
	var testCol = id.indexOf("col");
	
	if(testL != -1 && testCol != -1)
	{
		var ligne = parseInt(id[testL+1]);
		var colonne = parseInt(id[testCol+3]);
		
		return {y: ligne, x: colonne};
	}
}

//ARG: Object coordinate of a tile
//FUNCTION: Tell if there is a free tile near it
//RETURN: False or coor
function checkFreeTile(coor){
	//check TOP
	var x = coor.x;
	var y = coor.y -1;
	var test = check(x, y);
	if(test)
		return test;
	
	//check BOTTOM
	var x = coor.x;
	var y = coor.y +1;
	var test = check(x, y);
	if(test)
		return test;
	
	//check LEFT
	var x = coor.x -1;
	var y = coor.y;
	var test = check(x, y);
	if(test)
		return test;
	
	//check RIGHT
	var x = coor.x +1;
	var y = coor.y;
	var test = check(x, y);
	if(test)
		return test;
	
	function check(x, y){
		if(x>0 && y>0 && x<=game.nbrLvl && y<=game.nbrLvl)
		{
			var id = "l"+y+"-col"+x;
			if(_(id).innerHTML == "0")
				return {x: x, y:y};
		}
	}
	
}

function _(id){
	return document.getElementById(id);
}


