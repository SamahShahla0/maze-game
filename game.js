window.onload = function(){
	/* get mouse direction */ 
	var bodyElement = document.querySelector("body");
	bodyElement.addEventListener("mousemove", getMouseDirection, false);
	var xDirection = "";
	var oldX = 0;
	 
	function getMouseDirection(e) {
		if (oldX < e.pageX) {
			xDirection = "right";
		} else {
			xDirection = "left";
		}
		oldX = e.pageX;
	}
	 
	var boundaries = document.getElementsByClassName("boundary");
	var start = document.getElementById("start");
	var end = document.getElementById("end");
	var from_start = 0
    var lost = 0;
	localStorage.setItem("score", 0);
	
	start.onclick = function restart(){
		localStorage.setItem("score", 0);
		document.getElementById("status").innerHTML = 'Begin by moving your mouse over the "S".';
		for(var i = 0; i < boundaries.length; i++){
			boundaries[i].style.backgroundColor  = '#eeeeee';
		}
	};
	//while (test == false){
        start.onmouseover = function beginTimer(){
            //console.log(setTimeout(beginTimer, 3000))
            console.log(lost); 
            if (xDirection == 'right' && lost == 0){
                from_start = 1;
                var score = localStorage.getItem("score");
                // if (score > 0){
                    // document.getElementById("status").innerHTML = '<span style="color: #49bf5a">Your Score: '+ score + '</span>';
                // }
                for(var i = 0; i < boundaries.length; i++){
                    var boundary = boundaries[i];
                    if (boundary.classList.contains("example") == false) {
                        boundary.onmouseover = function ColorRed(){
                            from_start = 0;
                            lost = 1;
                            for(var j = 0; j < boundaries.length; j++){
                                boundaries[j].style.backgroundColor  = '#ff0000';
                            }
                            if (score > 0){
                                score = parseInt(score) - 10;
                            }
                            //else{
                                //score = 0;
                            //}
                            localStorage.setItem("score", score);
                            document.getElementById("status").innerHTML = '<span style="color: #ff0000">You Lost!<br/> Your Score: '+ score + '</span>';
                            
                            //console.log(test);
                        };
                    }
                }
            }
        };
    //}
    
	
	end.onmouseover = function reachedEnd(){
		if (xDirection == 'right' && from_start == 1){
			from_start = 0;
			var score = localStorage.getItem("score");
			score = parseInt(score) + 10;
			localStorage.setItem("score", score);
			document.getElementById("status").innerHTML = '<span style="color: #49bf5a">You Won!<br/> Your Score: '+ score + '</span>';
		}
	};
	
};