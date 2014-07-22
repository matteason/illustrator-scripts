/*
 * SmoothBlend.js
 * by Matt Eason - matteason.co.uk
 * License: BSD (see LICENSE file)
 *
 * Smooths the stepping effect created by blends by removing anchor points
 * that are very close together. Useful for creating extrustion effects.
 */
function remPoints (path, tolerance) {
  console.log('Tidying up the path... ');

  var curves = path.curves;
  var prevDelta = 99999;
  var pointsToRemove = new Array();

  for (var i=0; i < curves.length; i++){  
      var curve = curves[i];
      var delta = Math.sqrt(Math.pow(Math.abs(curve.point1.x-curve.point2.x),2) + Math.pow(Math.abs(curve.point1.y-curve.point2.y),2));
      if(prevDelta < tolerance && delta < tolerance) {
        pointsToRemove.push(i);
      }
      prevDelta = delta;
  }
  
  for(var j=0; j<pointsToRemove.length; j++) {
    path.remove(pointsToRemove[j]-j);
  }

  console.log('Done!');
  return pointsToRemove.length;
}

var dialogComponents = {
  tolerance: { 
    type: 'number', 
    label: 'Tolerance',
    min: 0.01,
    max: 5,
    units: 'point',
    value: 1
  },
  prompt: {
    type: 'text'
  , value: 'Anchor points that are closer\nthan this tolerance will be removed'
  }  
}

var params = Dialog.prompt('SmoothBlend', dialogComponents);
var result = 0;

if(params) {
  document.getItems({   
      type: Path,   
      hidden: false,
      selected: true  
  }).each(function (path){  
    result += remPoints(path, params.tolerance);  
  });

  if(result === 0) {
    Dialog.alert('I couldn\'t find any points to remove. Try increasing the tolerance.');
  } else {
    Dialog.alert('Removed '+result+' points');
  }  
} 