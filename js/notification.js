function nitificationReload(){
if($(".notification").length>0) {$(".notification").remove();}
var countNotification=1;
for (var i = 0; i <= localStorage.length-1; i++) {
	loc="";
		loc=localStorage.getItem(localStorage.key(i));
		loc_date=loc.substr(0,10);
		loc_data=loc.substr(loc.indexOf("<"));

	if (loc.indexOf("notification")+1)
	{
		var now = new Date();
		var symdol=loc.indexOf("notification:")+14;
		var lastSymbol=loc.indexOf("<");
// витягуємо час коли нагадати
		for (var j = symdol - 1; j <= lastSymbol-1; ) {
			var notificationTimeRemind = loc.substr(j,(loc.indexOf(";",j))-j);
			notificationTimeRemind=Number(notificationTimeRemind.substr(0,2))+Number(notificationTimeRemind.substr(3,2))/60;//за скільки годин нагадати

			// вказуємо дату нагадування
			var dateNotification = new Date(Number(loc.substr(6,4)), Number(loc.substr(0,2))-1, Number(loc.substr(3,2)), Number(loc.substr(loc.indexOf("none;\">")+7,2)),Number(loc.substr(loc.indexOf("none;\">")+10,2)) );
			// дізнаємоємось скільки годин лишилось до сповіщення про нагадування
			var hour=(dateNotification.getTime()-now.getTime())/(1000*60*60)
			// нагадування відображається протягом двох хвилин
			if (hour<notificationTimeRemind+0.0166667 && hour>notificationTimeRemind-0.0166667){
				//свторюємо блок для сповіщень, якщо його ще немає
				if(!$(".notification").length>0) {$("body").append("<div class='notification'><span class='countNotification'>"+countNotification+"<span></div>");}

				//створюємо блок сповіщення
				$(".notification").append("<div class='notification-event'><span class='noti_time'>"+loc_date+" "+loc.substr(loc.indexOf("none;\">")+7,5)+"</span><br><span class='content'><span class=\"id_el\">"+i+"</span>"+loc_data+"</span></div>");
				$(".notification > .countNotification").html(countNotification);// записуємо кількість сповіщень
				
				countNotification++;

				// відтворюємо звук
				audio = new Audio(); 
				audio.src = 'event.wav';
				audio.autoplay = true;
				break;
			} 
			//передаєо в наступну ітерацію початок наступногї строки часу часу  
			j=(loc.indexOf(";",j))+1;
		};
	}
};}

nitificationReload();//викликаємо функцію
setInterval(nitificationReload,60000); //запускаэмо повторення функції