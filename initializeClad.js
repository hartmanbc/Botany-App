/**
 * Cade & Brian's Botany App
 */

//GLOBALS... will sort these into their proper scopes later
var canvas;//this is our canvas object
var context;//we draw, animate, etc. to the context of the canvas, not the canvas itself
var clad;//image of the cladogram with a transparent background
var canvasPos;//an array holding the current x-coord and y-coord of the top-left corner of the canvas

window.onload=init;

function init()
    {   //use jQuery to set the background grass of the body of the webpage
        $("body").css("background-image", "url('imgs/turf.jpeg')");

        //assign the handles to the canvas & the context
		canvas = document.getElementById("cladCanvas");
		context = canvas.getContext("2d");

        //when someone clicks, center the clad on that click
		canvas.addEventListener("click", zoomer);

		//used to keep track of the coords of the canvas for click events
		window.addEventListener("scroll", updatePos);
		window.addEventListener("resize", updatePos);

		//display initial cladogram
		clad = makeImg('imgs/clad_a.png');
        clad.alt="cladogram img";
        clad.title="cladogram";
        draw(clad);

        //record the initial coords of the canvas
        canvasPos = getPosition(canvas);
	}

//return a new image object
function makeImg(src)
{
    var img = new Image();
    img.src = src;
    return img;
}

//this only draws the clad once
function draw(clad)
{
    context.clearRect(0,0,canvas.width,canvas.height);

    clad.onload = function()
    {
        context.drawImage(clad, 0, 0, 1200, 800);
    }
}

//this draws the clad every time after the first time
function redraw(clad, xOffset, yOffset)
{
    context.drawImage(clad, 0, 0, 1200, 800);
}

//put the part of the clad that was clicked in the center of the canvas
function zoomer(event)
{
    var x = event.pageX - canvasPos.x;//canvasPos.x is the current x-coord of the canvas
    var y = event.pageY - canvasPos.y;//canvasPos.y is the current y-coord of the canvas
    //x & y now represent the coordinates of the mouse click on the canvas

    //erase old image from canvas (this happens about 60 times per second)
    context.clearRect(0,0,canvas.width,canvas.height);

    //transform the canvas coords so the clicked coords are now in the center
    context.transform(1, 0, 0, 1, -(x-(canvas.width/2)), -(y-(canvas.height/2)));

    //redraw clad in new position on the canvas (this happens about 60 times per second)
    redraw(clad, x, y);//x & y are the distances from the click to 0, 0 on the canvas

    //put "spotlight" on the center of the canvas, where the clicked coords are centered
    $("canvas").css("background", "radial-gradient(rgba(255,255,255,.1) 10px, rgba(0,0,0,.7) 200px)");

/*
    switch(true)
    {
        case (y > 425 && y < 750) && (x > 550 && x <  1050):
            context.scale(4, 4);
            context.drawImage(clad, 0, 0, 1100, 750);
            break;
    }
*/
}

//get x & y coordinates of the canvas. This allows for the detection of the coords of a click on the canvas based on the position of the canvas relative to the window
function getPosition(element)
{
    var xPos=0, yPos=0;

    while(element)
    {
        if(element.tagName == "body")
        {//if the current element is <body>
            var xScroll = element.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = element.scrollTop|| document.documentElement.scrollTop;

            xPos += (element.offsetLeft - xScroll + element.clientLeft);
            yPos += (element.offsetTop - yScroll + element.clientTop);
        }
        else
        {//for all other elements
            xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPos += (element.offsetTop - element.scrollTop + element.clientTop);
        }

        element = element.offsetParent;
    }

   // xPos += window.scrollLeft;
   // yPos += window.scrollTop;
    return {x: xPos, y: yPos};
}

//this gets called when the page moves. it keeps track of the canvas's coords on the page
function updatePos()
{
    canvasPos = getPosition(canvas);
}
