(() => {
  // version is useful to check witch script is running
  console.log('save-in-phrasebook v1.0.0');

  // code goes here
  const sel = window.getSelection();
  const selection = sel.toString();

  // Detect if selection is backwards
  const range = document.createRange();
  range.setStart(sel.anchorNode, sel.anchorOffset);
  range.setEnd(sel.focusNode, sel.focusOffset);
  const backwards = range.collapsed;
  range.detach();

  // modify() works on the focus of the selection
  const endNode = sel.focusNode;
  const endOffset = sel.focusOffset;
  sel.collapse(sel.anchorNode, sel.anchorOffset);

  let direction = [];
  if (backwards) {
    direction = ['backward', 'forward'];
  } else {
    direction = ['forward', 'backward'];
  }

  sel.modify('move', direction[0], 'character');
  sel.modify('move', direction[1], 'sentence');
  sel.extend(endNode, endOffset);
  sel.modify('extend', direction[1], 'character');
  sel.modify('extend', direction[0], 'sentence');

  const sentence = sel.toString();

  window.open(`http://localhost:5000/?front=${encodeURI(selection)}&sentence=${encodeURI(sentence)}`, '_blank');
})();

/* bookmarklet, create a bookmark with the following code as the url

javascript:(function(){window.s0=document.createElement('script');window.s0.setAttribute('type','text/javascript');window.s0.setAttribute('src','https://codepen.io/lucaslos/pen/LKqqmK.js?u='+Math.random().toString(36).substr(2, 9));document.getElementsByTagName('body')[0].appendChild(window.s0);})();

*/
