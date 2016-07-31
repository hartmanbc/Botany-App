window.onload=init;

function init()
{
  var labelsBkgnd = new Image();
  labelsBkgnd.src = "imgs/newClad2_a.png";
  labelsBkgnd.title = "Drag each label from the pile below onto its proper place on the cladogram.";
  labelsBkgnd.className = "cvs";
  
  var parent = document.getElementById("canvasDiv");
  parent.appendChild(labelsBkgnd);
  
  /********************************************************************************
  ************** NOW POSITION DROPPABLE DIVS OVER BLANK LABEL AREAS ***************
  ********************************************************************************/
  
  //THEN PUT LABELS IN THE PILE
  
  //THEN TEST

  if(allLabelsPlaced)
  {
    switchToCanvas();
  }
}

function doPlaceLabels()
{

  
  
}
