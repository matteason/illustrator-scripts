/*
 * SmoothBlend
 * by Matt Eason (matteason.co.uk)
 * http://creativecommons.org/licenses/by-sa/4.0/
 *
 * v1.1
 * 
 * Smooths the stepping effect created by blends by removing anchor points
 * that are very close together. Useful for creating extrustion effects.
 */

// Create a progress bar window.
var w = new Window("palette");
var progress = w.add("progressbar", undefined, 1, 100);
progress.preferredSize = [300, 20];
var statusText = w.add("statictext");
statusText.text = "Getting tolerance value";
w.show();

var deltaCounts = new Array();
        
//Pass 1 - get tolerance value
for(var i=0; i<app.activeDocument.pathItems.length; i++) {
    pi=app.activeDocument.pathItems[i];
    if(pi.selected) {
        for(var j=0; j<pi.pathPoints.length; j++) {
            var pt1 = pi.pathPoints[j];
            var pt2 = (j==pi.pathPoints.length-1) ? pi.pathPoints[0] : pi.pathPoints[j+1];
            var delta = Math.sqrt(Math.pow(Math.abs(pt1.anchor[0]-pt2.anchor[0]),2) + Math.pow(Math.abs(pt1.anchor[1]-pt2.anchor[1]),2));
            deltaCounts[delta] = (deltaCounts[delta] == undefined) ? 1 : deltaCounts[delta] + 1;
            progress.value = j/pi.pathPoints.length * 50;
        } 
    }
}

var tolerance = 0;
for(var delta in deltaCounts) {
    if(deltaCounts[delta] > 10 && tolerance < delta) {
        tolerance = delta;
    }
}

tolerance = tolerance *1.1;
statusText.text = "Removing points";

var remCount = 0;
//Pass 2 - remove points
for(var i=0; i<app.activeDocument.pathItems.length; i++) {
    pi=app.activeDocument.pathItems[i];
    if(pi.selected) {
        var pointsToRemove = new Array();
        var prevDelta = 99999;
        for(var j=0; j<pi.pathPoints.length; j++) {
            var pt1 = pi.pathPoints[j];
            var pt2 = (j==pi.pathPoints.length-1) ? pi.pathPoints[0] : pi.pathPoints[j+1];
            var delta = Math.sqrt(Math.pow(Math.abs(pt1.anchor[0]-pt2.anchor[0]),2) + Math.pow(Math.abs(pt1.anchor[1]-pt2.anchor[1]),2));
            if(prevDelta <= tolerance && delta <= tolerance) {
                pointsToRemove.push(j);
            }
            prevDelta = delta;
            progress.value = 50 + j/pi.pathPoints.length * 25;
        }
        for(var k=0; k<pointsToRemove.length; k++) {
          pi.pathPoints[pointsToRemove[k]-k].remove();
          remCount++;
          progress.value = 75 + k/pointsToRemove.length * 25;
        }    
    }
}
progress.parent.close();