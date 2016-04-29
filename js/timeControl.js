
function getCaretPosition(obj){
    var cursorPos = null;
    if (document.selection){
        var range = document.selection.createRange();
        range.moveStart('textedit', -1);
        cursorPos = range.text.length;
    }
    else 
    {
        cursorPos = obj.selectionStart;
    }
  return cursorPos;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

$('body').on('keyup', '.add_HH', function(e){
	TimeChange(this)
});
$('body').on('keydown', '.add_HH', function(e){
	TimeChange(this)
});

function TimeChange (this_el) {
 
myCursorPosition=getCaretPosition(this_el);
if (myCursorPosition==3)
	myCursorPosition=4;

    var val = $(this_el).val(),
    	hh = val.replace(":","").replace(/[^0-9]/gim,'').slice(0,2),
    	mm = val.replace(":","").replace(/[^0-9]/gim,'').slice(2,4);

if (hh>23) 
	hh=23;

if (mm>60) 
	mm=60;

if (val.length>2 && $(this_el).val()!=(hh+':'+mm)) 
	$(this_el).val(hh+':'+mm);

setCaretToPos(this_el, myCursorPosition);
 } 


$('body').on('blur', '.add_HH', function(e){
  if ($(this).val().length<5){
    $(this).val('')
  }
  $(this).val($(this).val().substring(5,-1))
});