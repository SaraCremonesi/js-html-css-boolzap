$(document).ready(function() {
  $('.write input').keypress(function(){
    if (event.which == 13 || event.keyCode == 13) {
      sendMessage();
    };
});

// Creo una funzione per inviare i messaggi scritti nell'input della chat
  function sendMessage() {
    // Leggo il messaggio scritto
    var messageValue = $('.input-div input').val();
    // Se l'input non è vuoto,
    if (messageValue != '') {
      // clono il template precedentemente copiato nell'html
      var messageSent = $('.template .message').clone();
      // scrivo il messaggio nel mio paragrafo
      messageSent.children('p').text(messageValue);
      // gli aggiungo la classe per contrassegnare che è stato inviato
      messageSent.addClass('sent');
      // inserisco l'ora corrente
      var date = new Date();
      var currentHour = date.getHours();
      var currentMinutes = date.getMinutes();
      messageSent.children('span').text(addZero(currentHour) + '.' + addZero(currentMinutes));
      $('.space').append(messageSent);
      // lo faccio apparire nello spazio apposito della chat aperta
      $('.space').append(messageSent);
      // Svuoto la input
      $('.input-div input').val('');
    }
  }

  // Creo una funzione per aggiungere lo 0 davanti ai minuti o le ore se sono minori di 10
  function addZero(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
});
