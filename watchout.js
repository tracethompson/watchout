//initialize
//game container
var canvasSize = {'x' : 1000, 'y' : 1000}
var gameCanvas = 
	d3.select(".gameCanvas")
	  .append('svg')
	    .attr('width', canvasSize.x)
	    .attr('height', canvasSize.y);


//ENEMY STUFF
//number of enemies
var enemyNum = 10;
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
      .duration(2000)
	  	.attr('cx', function(d){ return d.x})
	  	.attr('cy', function(d){ return d.y});		
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
















//run enemy updater passing in enemy array
enemyUpdate(enemyArray(enemyNum));

setInterval( function(){enemyUpdate(enemyArray(enemyNum))} , 1000);