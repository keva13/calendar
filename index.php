<html>
<head>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	
	<script type="text/javascript" src="js/bootstrap.js"></script>
	<title></title>
</head>
<body>

<div class="container-fluid fix_top">
	<div class="row">
		<div class="col-xs-6">
		<div class="dropdown">
		  <button class="dropdown-select dropdown-toggle" type="button" data-toggle="dropdown">Month view</button>
		  <ul class="dropdown-menu">
		    <li><a onclick='selectMonth()' >Month view</a></li>
		    <li><a onclick='selectWeek()' >Week view</a></li>
		    <li><a onclick='selectDay()' >Day view</a></li>
		  </ul>
		</div>
		</div>

		<div class="col-xs-3 col-xs-offset-3">
			<span id="custom-next" class="custom-next glyphicon glyphicon-chevron-right"></span>
			<span class="head-group-label">
				<span id="custom-day" class="custom-month"></span>
				<span id="custom-month" class="custom-month"></span>
			</span>
			<span id="custom-prev" class="custom-prev glyphicon glyphicon-chevron-left"></span>
		</div>
	</div>
	<hr>
</div>


<div class="container-fluid time-container"></div>

<a href="#modal1" class="open_modal"><div class="add_event">+</div></a>

<div id="calendar1">
  <div class="fc-head">
    <div>Monday</div><div>Tuesday</div><div>Wednesday</div><div>Thursday</div><div>Friday</div><div>Saturday</div><div>Sunday</div>
   </div>
  <div class="fc-calendar fc-five-rows"></div>
</div>



<!--{{{{{{{{{{{{{{{{СТВОРЕННЯ}}}}}}}}}}}}}}}}  -->
<div id="modal1" class="modal_div"> <!-- скрытый див с уникaльным id = modal1 -->
	<span class="modal_close">X</span>
	Введіть дату:
         <input type="number" class="MM" name="MM" maxlength="2" placeholder="MM" max="12" min="1">-
         <input type="number" class="DD" name="DD" maxlength="2" placeholder="DD" max="31" min="1">-
         <input type="number" class="YYYY" name="YYYY" maxlength="4" placeholder="YYYY" min="1"><br><br>
         Нагадати за <span class="add_notification">+</span><br>
         <input class="add_HH HH"   id='add_HH0' name="add_HH0" placeholder="hh:mm" value="00:00" min="0">годин<br><br>

	Введіть час:
         <input id='add_HH' class="add_HH HH" name="HH"  placeholder="hh:mm" value="00:00" min="1"><br><br>
    Текст:<br>     
         <textarea name="content"></textarea>
         <input id="add_date" type="submit" class="submit">
</div>
<div id="overlay"></div>

<!--{{{{{{{{{{{{{{{{РЕДАГУВАННЯ}}}}}}}}}}}}}}}}  -->
<div id="modal2" class="modal_div"> 
	<span class="modal_close">X</span>
		<input name="id" class="id_el"></input>
		<label class="text"></label><br>
         <input id="delete" type="submit" class="submit" value="Удалить">
</div>
<script>
	add_HH_number=0;
	var data=[];
	var content=[];

	var codropsEvents = new Object();
	col=localStorage.getItem("0");

for (var i = 0; i <= localStorage.length-1; i++) 
{
	loc=localStorage.getItem(localStorage.key(i));
		loc_date=loc.substr(0,10);
		loc_data=loc.substr(loc.indexOf("<"));
	q=-1;
	for (j=0; j < data.length; j++) { 
		if (loc.substr(0,10) == data[j]) {q=j; content[j]=content[j]+"<span class=\"id_el\">"+localStorage.key(i)+"</span>"+loc_data;}
	}
	if (q==-1) { data.push(loc.substr(0,10)); content.push("<span class=\"id_el\">"+localStorage.key(i)+"</span>"+loc_data) }
};

for (i=0; i < data.length ; i++) { 
	codropsEvents[data[i]]=content[i];
};
	</script>
	<script type="text/javascript" src="js/my_calendar.js"></script>
	<script type="text/javascript" src="js/my.js"></script>
	<script type="text/javascript" src="js/timeControl.js"></script>
	<script type="text/javascript" src="js/notification.js"></script>
<script>
$(document).ready(function() { 

     overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
    var close = $('.modal_close, #overlay'); 
    var modal = $('.modal_div'); 

     open_modal.click( function(event){
         event.preventDefault(); 
         var div = $(this).attr('href');
         overlay.fadeIn(400,
             function(){
                 $(div)
                     .css('display', 'block') 
                     .animate({opacity: 1, top: '50%'}, 200);
         });
     });

     close.click( function(){ 
            modal
             .animate({opacity: 0, top: '45%'}, 200, 
                 function(){
                     $(this).css('display', 'none');
                     overlay.fadeOut(400); 
                 }
             );
     });

    now = new Date();
	$('.YYYY').val(now.getFullYear())
	$('.MM').val(now.getMonth()+1)
	$('.DD').val(now.getDate())

});  
$(document).on('click','.event', function(){

	event.preventDefault(); 
		overlay.fadeIn(400,
			function(){
			$("#modal2") 
			.css('display', 'block') 
			.animate({opacity: 1, top: '50%'}, 200);
		});

	$("#modal2  > .id_el").val($(this).prev().text());
	$("#modal2  > .text").html($(this).find(".time").text()+'<br>'+$(this).find("span:not(.time)").text());

});

$(document).on('click','#delete', function(){
	localStorage.removeItem($("#modal2  > .id_el").val().toString());
	location.reload();
});

$(document).on('click','#add_date', function(){


	MM=('0' + $("#modal1  > .MM").val()).slice(-2);
	DD=('0' + $("#modal1  > .DD").val()).slice(-2);
	HH=$("#modal1  > #add_HH").val();
	YYYY=('0' + $("#modal1  > .YYYY").val()).slice(-4);
	content=$("#modal1  > textarea").val()
	time_notification="notification:";
	for (var i =0; i <=add_HH_number; i++) {
		if ($("#add_HH"+i).length && $("#add_HH"+i).val().length) time_notification+=$("#add_HH"+i).val()+';';
	};
	if (time_notification.length==13) {time_notification="";}

	thisEvent=MM+'-'+DD+'-'+YYYY+time_notification+'<div class="event"><span class="time" style="display:none;">'+HH+'</span><span >'+content+'</span></div>';

	
	for (var i = 0; i <= localStorage.length; i++) {
		if (!!!localStorage.getItem(i)){
			localStorage.setItem(i,thisEvent);
			i=localStorage.length;
			if (parseInt(localStorage.getItem("0"))<i) {
				localStorage.setItem("0", i);
			}
			location.reload();
			break;
		}		
	};
});

$(document).on('click','.add_notification', function(){
	add_HH_number++;
	$(".add_notification").next().after('<span class="spanHH'+add_HH_number+'"><input class="add_HH HH" class="add_HH'+add_HH_number+'" name="add_HH'+add_HH_number+'" placeholder="hh:mm" value="00:00" min="0">годин<span onclick="$(\'.spanHH'+add_HH_number+'\').remove()" class="delete_time">x</span><br>');
         

});
</script>
</body>
</html>