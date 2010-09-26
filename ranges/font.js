/*
Deals with discrepancies between different browsers’ idea of where HTML
entities should reside in the document object.  It goes, roughly from
most modern to oldest.  See http://www.dhtmlzone.com/articles/.
*/
function
getDocumentElementByID( id )
{
	if( document.getElementById )
		return document.getElementById( id );	// DOM
	else if( document.all )
		return document.all[ id ];	// old MSIE
	else
		return document[ id ];	// old NS
}
/*
Deals with discrepancies as to whether CSS style information is top
level information in a JavaScript object or is in a sub-object called
"style".
*/
function
getStyles( obj )
{
	return obj.style ? obj.style: obj;	// MSIE and DOM : NS 4
}
var weight = 'normal';
var style = 'normal';
var transform = 'none';
/* FIXME should be more flexible */
var face = 'freeserif';
/* named functions passed around as variables */
var setFontWeight = function( obj )
{
	var styles = getStyles( obj );
	styles.fontWeight = weight;
};
var setFontStyle = function( obj )
{
	var styles = getStyles( obj );
	styles.fontStyle = style;
};
var setFontFamily = function( obj )
{
	var styles = getStyles( obj );
	styles.fontFamily = face;
};
var setFontTransform = function( obj )
{
	var styles = getStyles( obj );
	styles.textTransform = transform;
};

function
switchStyleOfElementsOfClass( cls )
{
	if( style == 'normal' )
		style = 'italic';
	else
		style = 'normal';
	forElementsOfClassDo( cls, setFontStyle );
}
function
switchWeightOfElementsOfClass( cls )
{
	if( weight == 'normal' )
		weight = 'bold';
	else
		weight = 'normal';
	forElementsOfClassDo( cls, setFontWeight );
}
function
switchTransformOfElementsOfClass( cls )
{
	if( transform == 'none' || transform == '' )
		transform = 'uppercase';
	else if( transform == 'uppercase' )
		transform = 'capitalized';
	else if( transform == 'capitalized' )
		transform = 'lowercase';
	else
		transform = 'none';
	forElementsOfClassDo( cls, setFontTransform );
}
function
switchFamilyOfElementsOfClass( cls, buttonID )
{
	obj = getDocumentElementByID( buttonID );

	if( obj )
	{
		if( obj.value )
		{
			face = obj.value;
			forElementsOfClassDo( cls, setFontFamily );
		}
	}
}
function initializeFonts( cls, contrl_id )
{
	switchFamilyOfElementsOfClass( cls, contrl_id )
}
function
forElementsOfClassDo( cls, ftn )
{
	forChildrenOfClassDo( document.documentElement, cls, ftn );
}
/* recursion through DOM elements */
function
forChildrenOfClassDo( node, cls, ftn )
{
	var children = node.childNodes;
	for( var i = 0; i < children.length; i++ )
	{
		var child = children.item( i );
		if( child.nodeType == Node.ELEMENT_NODE )
		{
			if( child.className == cls )
				ftn( child );
			else
				forChildrenOfClassDo( child, cls, ftn );
		}
	}
}
