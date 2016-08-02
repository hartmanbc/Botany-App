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
  
  var divs;
  for(i=0; i<12; i++)
  {//var parent still points to the canvasDiv
    divs[i] = document.createElement("div");
    divs[i].id = "div" + i;
    parent.apendChild(divs[i]);
  }
  
  //THEN PUT LABELS IN THE PILE
  
  //THEN TEST

  if(allLabelsPlaced)
  {
    switchToCanvas();
  }
}

function switchToCanvas()
{
  //remove label background, divs, and labels from DOM
  
  //create tree canvas and box canvas & hide one of them
  
  //create "start quiz" button. when clicked, it unhides the quiz window and pulls the first question from DB
}