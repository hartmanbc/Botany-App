window.onload=init;

function init()
{
  var labelsBkgnd = new Image();
  labelsBkgnd.src = "imgs/newClad2_a.png";
  labelsBkgnd.title = "Drag each label from the pile below onto its proper place on the cladogram.";
  labelsBkgnd.className = "cvs";
  labelsBkgnd.id ="labelsBkgnd";

  var parent = document.getElementById("canvasDiv");
  parent.appendChild(labelsBkgnd);

  /************** NOW POSITION DROPPABLE DIVS OVER BLANK LABEL AREAS **************/

  //this code creates the divs and puts them on the DOM. they are positioned in the CSS file
  var divs = [];//an array of divs
  var NUM_LABELS = 12;
  var id;
  for(var i=0; i<NUM_LABELS; i++)
  {
    id = "div" + i;//results in "div1", for example
    divs[i] = document.createElement("div");

    divs[i].id = id;
    divs[i].className = "droppable " + i;//multiple classes for an element are separated by a space, "droppable" is one class
                                        //the value in i will become the second class that this element belongs to
    divs[i].ondrop = drop;//drop() is a method we defined
    divs[i].ondragover = allowDrop;//allowDrop() is a method we defined

    //parent already points to the canvasDiv
    parent.appendChild(divs[i]);
  }
}

function allowDrop(e)
{
    //default is for an element to disallow dropping onto it
    e.preventDefault();
}

function drag(e)
{
    //set the data of dataTransfer to the id of the label being dragged
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e)
{   //get the data that was set by the drag() method. the data is just the id of the label being dragged
    var data = e.dataTransfer.getData("text");
    e.preventDefault();

//NOW MAKE EACH DROPPABLE ONLY ACCEPT ITS CORRECT LABEL
    var dragClasses = document.getElementById(data).className.split(" ");//array of the label's classes
    var dropClasses = e.target.className.split(" ");//array of the droppable div's classes

    if(dragClasses[1] == dropClasses[1])
    {//if the second class of the label matches that of the droppable div, that label belongs on that div
        e.target.appendChild(document.getElementById(data));//append the label to the div

        //check the div containing the unused labels. when its # of children reaches 0, the student is done placing the labels
        var labelContainer = document.getElementById("infoWindow");
        if(labelContainer.children.length == 0)
        {//student is done placing the labels at this point

            alert("You have successfully labelled the cladogram. Now look around the new clads for info and click the \"Start Quiz\" button when you're ready!");
            switchToCanvas();
        }

    //$("#" + data).css("transform", "rotate(10deg)");
    //$(".labels").animate({
    //                        transform: "rotate(359deg)";
    //                     }, 1000);
    }
}

function switchToCanvas()
{
  //remove label background, divs, and labels from DOM
  var labelId;
  var deletedLabel;

    //Loop will remove all 13 divs(0-12) from the DOM
  for(var i=0; i<12; i++)
  {

    labelId= "label"+i;

    deletedLabel = document.getElementById(labelId);

    deletedLabel.parentNode.removeChild(deletedLabel);

      $("#div" +i).remove();
  }

    //removes the cladogram background from the canvas
    var thing= document.getElementById("labelsBkgnd");
    thing.parentNode.removeChild(thing);

    //Creates and sets a new background for the canvas
    var newBkgnd = new Image();

    //This
    newBkgnd.src = "imgs/cladIdea.png";
    newBkgnd.title = "Please select a display from the right menu";
    newBkgnd.className = "cvs";
    var parent = document.getElementById("canvasDiv");
    parent.appendChild(newBkgnd);


    //Makes the quiz window visible
    var quizWndw= document.getElementById("quizWindow");
    quizWndw.style.display="block";
    //put "start quiz" button up
    var button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "START QUIZ";
    quizWndw.appendChild(button);

    var displayControl= document.getElementById("displayControl");
    displayControl.style.display="block";

  //create tree canvas and box canvas & hide one of them

  //create "start quiz" button. when clicked, it unhides the quiz window and pulls the first question from DB
}

function treeClad()
{

    //Hides the block diagram and then makes the cladogram appear
    var oldImage= document.getElementById("boxControlImg");
    /*
    image.src = "imgs/clad_a.png";
    image.alt = "Tree Clad Image Map";
    image.style.top = "100px";
    image.style.left = "30px";
*/
    //image.id= "treeClad";
    
    oldImage.style.display="none";
   

    var newImage = document.getElementById("cladControlImg");

    newImage.style.display="block";

    newImage.addEventListener("click", displayCoords);


    //document.getElementById("treeClad").addEventListener("click", displayCoords);
    //image.usemap = "treeMap";
}

function boxClad()
{

    //Hides the cladogram and then makes the block diagram appear
    var oldImage = document.getElementById("cladControlImg");

    oldImage.style.display="none";

    var newImage= document.getElementById("boxControlImg");

    newImage.style.display="block";

    //newImage.addEventListener("click", displayCoords);
    /*
    image.src = "imgs/BoxDiagram.png";
    image.alt = "Box Clad Image Map";
    image.style.top = "25px";
    image.style.left = "20px";
    image.id= "boxDiagram";


    //image.usemap = "boxMap";
    document.getElementById("boxDiagram").addEventListener("click", displayCoords);

*/
}

function displayCoords(event){


    //offset based on location of the image in the displayControl window
    var xOffset= 36;
    var yOffset= 191;

    var x= event.clientX-xOffset;
    var y= event.clientY-yOffset;

    alert("X coords: "+x+ ", Y coords: "+y);

}

function cladTest(num){

    alert (num);

}

function boxTest(num){

    alert (num);
}
