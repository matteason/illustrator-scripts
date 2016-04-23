# scriptographer-scripts

Scripts I've written to automate Illustrator with Scriptographer and native scripts

## SmoothBlend.js / SmoothBlend-1.1.jsx

The easiest way to create extrusion effects in Illustrator (like in the old Netflix logo) is to create a blend, expand it and use the Pathfinder Unite tool to merge into a single compound path.

The disadvantage of this technique is that because the shape was constructed from several 'in-between' shapes, you can end up with a stepping effect on paths that are meant to be straight.

SmoothBlend smooths these paths and removes the extraneous anchor points. 

**When you run SmoothBlend.js in Scriptographer** you'll be prompted for a tolerance. Any points which are closer than this tolerance will be removed from the selected object.

**When you run SmoothBlend-1.1.jsx in Illustrator** the script calculates the tolerance automatically. You should just be able to select an object, run it (File > Scripts > Other Script...), and all the steps will disappear. If it doesn't work, please submit an issue and I'll help you out.

[Read more about SmoothBlend](http://www.matteason.co.uk/posts/cleaning-up-points-from-blends-in-illustrator)

