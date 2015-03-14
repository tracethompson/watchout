//initialize
//game container
var canvasSize = {'x' : 500, 'y' : 500}
var gameCanvas = 
	d3.select(".gameCanvas")
	  .attr('width', canvasSize.x)
	  .attr('height', canvasSize.y);
var score = 0;
var highScore = 0;
d3.select('.hero').attr('cx', canvasSize.x/2);
d3.select('.hero').attr('cy', canvasSize.y/2);

//ENEMY STUFF
//number of enemies
var enemyNum = 50;
//update enemy location
var enemyUpdate = function(data){
  //retrieve all current enemy data
  var enemies = gameCanvas.selectAll('.enemy')
  	.data(data, function(d){ return d.id });


  //make circles
  enemies.enter()
  	.append('circle')
  		.attr('class', 'enemy')
  		.attr('cx', function(d){ return d.x})
  		.attr('cy', function(d){ return d.y})
  		.attr('r', 10);

  //update position
  enemies
    .transition()
      .duration(1000)
	  	.attr('cx', function(d){ return d.x})
	  	.attr('cy', function(d){ return d.y});		


  //COLLISION STUFF
  var checkCollision = function(data){

    d3.select('.current span').text(score);
    d3.select('.high span').text(highScore);
    if(score > highScore){
      highScore = score;
    }

  	enemies.each(function() {
  	  var heroX = parseFloat(d3.select('.hero').attr('cx'));
  	  var heroY = parseFloat(d3.select('.hero').attr('cy'));
  	  var heroR = parseFloat(d3.select('.hero').attr('r'));
  	  var enemyX = parseFloat(d3.select(this).attr('cx'));
  	  var enemyY = parseFloat(d3.select(this).attr('cy'));
  	  var enemyR = parseFloat(d3.select(this).attr('r'));

  	  var dx = (heroX + heroR) - (enemyX + enemyR);
  	  var dy = (heroY + heroR) - (enemyY + enemyR);
  	  var distance = Math.sqrt(dx * dx + dy * dy);
 
      //console.log("distance: " + distance)
  	  if (distance < (heroR + enemyR)){
        score = 0;
  	  }
  	});
  }

  setInterval( checkCollision , 100);

}

//create the enemy data array
var enemyArray = function(enemyNumber){ 
  var enemyArray = [];
  //loop through number of enemies
  for(var i = 0; i < enemyNumber; i++){
    //assign id and a random position
    enemyArray.push({
    	id : i,
    	x : Math.random() * canvasSize.x,
    	y : Math.random() * canvasSize.y
    })
  }  
  //returns array of enemy objects
  return enemyArray;
}


//HERO STUFF
var dragmove = function() {
  d3.select(this)
    .attr('cx', d3.event.sourceEvent.pageX-10)
    .attr('cy', d3.event.sourceEvent.pageY-80);
}
var drag = d3.behavior.drag()
    .on("drag", dragmove);
d3.select('.hero').call(drag);



//run enemy updater passing in enemy array
enemyUpdate(enemyArray(enemyNum));

setInterval( function(){
	score += 12547;
} , 100);
setInterval( function(){enemyUpdate(enemyArray(enemyNum))} , 1000);