# scriptographer-scripts

Scripts I've written to automate Illustrator with Scriptographer - http://scriptographer.org/

## SmoothBlend.js

The easiest way to create extrusion effects in Illustrator (like in the old Netflix logo) is to create a blend, expand it and use the Pathfinder Unite tool to merge into a single compound path.

The disadvantage of this technique is that because the shape was constructed from several 'in-between' shapes, you can end up with a stepping effect on paths that are meant to be straight.

SmoothBlend.js smooths these paths and removes the extraneous anchor points. When you run this script you'll be prompted for a tolerance. Any points which are closer than this tolerance will be removed from the selected object.

