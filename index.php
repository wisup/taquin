<html>
	<head>
		<link href="taquin.css" type="text/css" rel="stylesheet"/>
		<script src="taquin.js"></script>
		<script type='text/javascript'>
			function load(){
			game.level = "medium";
			game.init();
			}
		</script>
	</head>
	
	<body onload="load()">
		<div id="window">
			<h1>Taquin</h1>
			
			<div id="NewGame">
				<h2>New Game:</h2>
				<p>Choose difficulty:</p>
				<div id="chooseDifficulty">
					<div id="easy" class="button"><div class="op"></div>EASY</div>
					<div id="medium" class="button"><div class="op" style></div>MEDIUM</div>
					<div id="hard" class="button"><div class="op"></div>HARD</div>
				</div>
				<div id="start" class="button">Start</div>
			</div>
			
			<div id="game">
			</div>
		</div>
	</body>
</html>
