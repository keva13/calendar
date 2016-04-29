
selectView='Month';


$( '#custom-next' ).on( 'click', function() {
	if (selectView=='Month') gotoNextMonth();
	if (selectView=='Week') {
		Week_col++; 
		selectWeek();
		if(!$('.fc-row:eq('+Week_col+')').length) {
		Week_col=0;
		gotoNextMonth();
		selectWeek();
		}
	}
	if (selectView=='Day') nextDay(2);
	BGDisplayDay();
} );
$( '#custom-prev' ).on( 'click', function() {
	if (selectView=='Month') gotoPreviousMonth();
	if (selectView=='Week') {
		Week_col--; 
		selectWeek();
		if(Week_col<0) {
		gotoPreviousMonth();
			Week_col=10;
			while(!$('.fc-row:eq('+Week_col+')').length){Week_col--}
		selectWeek();
		}
	}
	if (selectView=='Day') nextDay(-2);

	BGDisplayDay();
} );


function updateMonthYear() {		
	$month.html( cal.getMonthName() );
	$year.html( cal.getYear() );
}
function BGDisplayDay() {	
var i=1;
var j=1;
$(".fc-row > div").each(function(indx, element){
	$(this).attr("onclick",'Week_col="'+(j-1)+'"; Day_col="'+(i-1)+'"; selectDay()');
  if (i%2)$(this).css("background-color","#f6f6f6");
  if (i>=7)
  	{i=1;j++}
  else
    {i++;};
});}

$(document).ready(function(){
	BGDisplayDay();
});






function selectMonth() {	
selectView='Month';
$('.dropdown-toggle').html('Month view');
		$(".fc-row").show(); 
		$(".fc-row > div").show();
		$('.fc-row > div').css("height","150px");
		$('.fc-row > div').css("height","150px");
		$('.time-container').hide();
		$('.fc-head').show();


}
function selectWeek() {
selectView='Week';
$('.dropdown-toggle').html('Week view' );
		$('.time-container').hide();
		$('.fc-head').show();	
	$(".fc-row > div").show();
	$(".fc-row").hide();
	$('.fc-row:eq('+Week_col+')').show();
	$('.fc-row > div').css("height","80%");
}
function selectDay() {	
selectView='Day';
$('.dropdown-toggle').html('Day view') ;
	$(".fc-row > div").hide();
	$('.fc-row:eq('+Week_col+') > div:eq('+Day_col+')').show();
	$('.fc-row > div').css("height","calc(100% - 84px)");
	$('.fc-row > div').css("height","70%");
	nextDay(1);
	nextDay(2);
	nextDay(-2);
}





function nextDay(q) {	
	if (q==1){
		while(!$('.fc-row:eq('+Week_col+') > div:eq('+Day_col+') > .fc-date').length){
			if (Day_col<6) Day_col++;
			if (Day_col>6) Day_col--;
			$(".fc-row > div").hide();
			$('.fc-row:eq('+Week_col+') > div:eq('+Day_col+')').hide();
		writeTime();
		}
	}
	if (q==2){
		Day_col++;
		while ((Day_col>6) || ($('.fc-row:eq('+Week_col+') > div:eq('+(Day_col)+') > .fc-date').length==0)){
			Day_col++;
			if (Day_col>6){
			Day_col=0; 
			Week_col++;
			selectWeek();
			selectView='Day';
			if(!$('.fc-row:eq('+Week_col+')').length) {
			Week_col=0;
			gotoNextMonth();
			selectWeek();
			selectView='Day';
			}}
		}
		$(".fc-row > div").hide();
		$('.fc-row:eq('+Week_col+') > div:eq('+Day_col+')').show();
		writeTime();
	}
	if (q==-2){
		Day_col--; 
		while ((Day_col<0) || ($('.fc-row:eq('+Week_col+') > div:eq('+(Day_col)+') > .fc-date').length==0)){
			Day_col--;
			if (Day_col<0){
			Week_col--;
			Day_col=6; 
			selectWeek();
			selectView='Day';
			if(Week_col<0) {
			gotoPreviousMonth();
				Week_col=10;
				while(!$('.fc-row:eq('+Week_col+')').length){Week_col--}
			selectWeek();
			selectView='Day';
			}}

		}
		$(".fc-row > div").hide();
		$('.fc-row:eq('+Week_col+') > div:eq('+Day_col+')').show();
		writeTime();
	}
}


function writeTime() {	
	$('#custom-day').text($('.fc-row:eq('+Week_col+') > div:eq('+(Day_col)+') > .fc-date').text());
	$('.fc-row:eq('+Week_col+') > div:eq('+(Day_col)+')').hide();
	$('.fc-head').hide();
	$('.time-container').show();
	time_html="";
	time_post="";
	num_time=0;
	for (var i = 0; i <=23; i++) {
		i<10?j="0"+i:j=i;

		events=$('.fc-row:eq('+Week_col+') > div:eq('+(Day_col)+') > div > .event > .time');
		

		for (var k = 0; k < events.length; k++) {
		time_post=$('.fc-row:eq('+Week_col+') > div:eq('+(Day_col)+') > div > .event:eq('+(k)+') > .time');


		if (time_post.text().slice(0, 2)==j) {
			var margin = time_post.text().slice(3, 5)*1.6;
			time_post = time_post.parent();
			time_post = time_post.prev().get(0).outerHTML+'<div style=\'margin-top:'+margin+'px;\' class="event eventInDay">'+time_post.html()+'</div>'			
			break;
		}
		else{time_post="";}
		};
		time_html=time_html+'<div class="row"><div class="col-xs-1 time">'+j+':00</div><div class="col-xs-1"><hr class="time_line">'+time_post+'</div></div>'
	}
	$('.time-container').html(time_html);
	$('.col-xs-1.time').last().css('height','154px')
	$('hr').last().css('height','154px')

}

