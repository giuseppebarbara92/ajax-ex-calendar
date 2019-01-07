$(document).ready(function(){
// ATTRAVERSO LA DATA SIAMO RIUSCITI A PREDNERE I RISPETTIVI GIORNI
// E ABBIAMO CREATO UNA LISTA (LI)PER QUANTI SONO I GIORNI
// Tutto questo procedimento ovviamento è inseribile all'interno di una funzione che ci andiamo a creare

  var date = moment('2018-01-01');
  // Aggiungo maxdate perchè l'esercizio prevede che non vada oltre il 2018
  var maxDate = moment('2018-11-01');
   printList(date);
   addHolidays(date);



// AL CLICK SU NEXT MI AGGIUNGERà UN MESE A DATE E VISUALIZZERO IL MESE SUCCESSIVO
  $('#next').click(function(){
      date = date.add(1, 'months');
// controllo se il nuovo mese è nel futuro rispetto alla data massima
if (date.diff(maxDate, 'days') > 0) {
  alert('Data futura');
// questo mi impedisce di andare avanti
  date = date.subtract(1, 'months');
}
else {
  printList(date);
     addHolidays(date);
}
console.log(date.diff(maxDate, 'days'));
  });


  $('#prev').click(function(){
      date = date.subtract(1, 'months');
      console.log(date);
      printList(date);
         addHolidays(date);
  });

});

// FUNZIONE CHE RICHIAMA IL PROCEDIMENTO PER CREARE LA LISTA
function printList(date){
  $('.container h1').text(date.format('MMMM YYYY'));

  var daysInMonth = date.daysInMonth();
  console.log(daysInMonth);

// RESETTIAMO IL CONTENUTO DELL'UL, ALTRIMENTI OGNI VOLTA CHE VADO AVANTI O INDIETRO CON I MESI
// MI AGGIUNGE I GIORNI
$('.container ul').html('');
  for (var i = 1; i <= daysInMonth; i++) {
  var liTemplate = $('.templates li').clone();
  liTemplate.text(i + ' ' + date.format('MMMM'));

  $('.container ul').append(liTemplate);


  }
}

function addHolidays(date)
{
  // ANDIAMO A VERIFICARE SE ESISTE UNA FESTIVITà PER IL MESE CORRENTE
  $.ajax({
    url: 'https://holidayapi.com/v1/holidays',
    method: 'GET',
    data: {
      key: '64d182fe-315e-4d56-bd20-301b95d97520',
      country: 'IT',
      month: date.format('MM'),
      year: date.format('YYYY'),

    },
    success: function(data)
    {
     var holidays = data.holidays;
     console.log(holidays);
     $('.container ul li').each(function(){
      console.log($(this).text());
      var thisLidate = $(this).text();
      for (var i = 0; i < holidays.length; i++) {
        var holidayDate = moment(holidays[i].date);
        console.log(holidayDate.format('D MMMM'));
        if (thisLidate == holidayDate.format('D MMMM')) {
        $(this).css('color', 'red');
        $(this).append(' / ' + holidays[i].name);
        }
      }
     });
    },
    error: function()
    {
      alert('si è verificato un errore');
    }
  });
}
