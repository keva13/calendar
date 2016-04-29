
function Calendar1(id, year, month) {
caldata : codropsEvents;
var Dlast = new Date(year,month+1,0).getDate(),
    D = new Date(year,month,Dlast),

    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
    calendar = '<div class="fc-row">',
    month=[ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];


if (DNfirst==1) calendar = '';
if (DNfirst != 0) {
  for(var  i = 1; i < DNfirst; i++) calendar += '<div></div>';
}else{
  for(var  i = 0; i < 6; i++) calendar += '<div></div>';
}

for(var  i = 1; i <= Dlast; i++) {
  var dat = new Date();
  var now_dat = (D.getMonth() + 1 < 10 ? '0' + (D.getMonth() + 1) : D.getMonth()) + '-' + (i<10? "0" + i : i) + '-' + D.getFullYear();


  if ((i+DNfirst-2)%7==0) {
    if (DNfirst || i>2) calendar += '<div class="fc-row">';
  }
  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<div  class="fc-today"><span class="fc-date">' + i +"</span>";
  }else{
    calendar += '<div><span class="fc-date">' + i + "</span>";
  }
  if (!!codropsEvents[now_dat]) calendar += '<div style="overflow:visible;z-index: 1;margin:5px;float:left;height:auto;width: auto;border:0px;">' + codropsEvents[now_dat] + "</div>";
  calendar+="</div>"
    
    if (DNfirst==0 && i==1) calendar += '</div><div class="fc-row">';
  if ((i+DNfirst-2)%7==6) {
    calendar += '</div>';
  }
}
for(var  i = DNlast; i < 7; i++) calendar += '<div></div>';
document.querySelector('.fc-calendar').innerHTML = calendar;
document.querySelector('#custom-month').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
document.querySelector('#custom-month').dataset.month = D.getMonth();
document.querySelector('#custom-month').dataset.year = D.getFullYear();

}
Calendar1("calendar1", new Date().getFullYear(), new Date().getMonth());
function gotoPreviousMonth() { 
  Calendar1("calendar1", document.querySelector('#custom-month').dataset.year, parseFloat(document.querySelector('#custom-month').dataset.month)-1);
}

function gotoNextMonth() { 
  Calendar1("calendar1", document.querySelector('#custom-month').dataset.year, parseFloat(document.querySelector('#custom-month').dataset.month)+1);
}