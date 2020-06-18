$(document).ready(function() {
  $('.write input').on('keypress', function(){
    if (event.which == 13 || event.keyCode == 13) {
      sendMessage();
      setTimeout(replyMessage,1000);
    };
  });

  searchContact();

  // Gestione menu a tendina messaggi
  $(document).on('click', '.icon',
  function() {
    $(this).siblings('.dropdown').toggle();
  }
  );

  // Gestione eliminazine messaggi
  $(document).on('click', '.delete',
  function() {
    $(this).parents('.message').addClass('hidden');
  }
  );

// *****************FUNCTIONS*****************
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

  // Creo una funzione per generare una risposta automatica dopo 2 secondi dall'invio di un messaggio
  function replyMessage() {
    // Clono il template dove inserire la risposta,
    var replyMessage = $('.template .message').clone();
    // inserisco il testo della risposta automatica
    replyMessage.children('p').text('Okay');
    // inserisco l'ora corrente
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinutes = date.getMinutes();
    replyMessage.children('span').text(addZero(currentHour) + '.' + addZero(currentMinutes));
    // la faccio apparire nello spazio apposito della chat aperta
    $('.space').append(replyMessage);
  }

  // Creo una funzione per trovare il nome di un contatto nella lista delle chat
  function searchContact() {
    //Intercetto i tasti cliccati con keyup
    $('.search input').keyup(function() {
    // Inserisco il valore dell'input cercato in una variabile e trasformo tutto in minuscolo (per una migliore esperienza utente)
    var searched = $('.search input').val().toLowerCase();
    // Controllo per ogni nome nelle chat se contengono l'input cercato
    $('.chat-avatar').each(function() {
      var contact = $(this).find('.chat-text p').text().toLowerCase();
      if (contact.includes(searched)) {
        $(this).show();
      } else {
        $(this).hide();
      };
    });
  });
};
});
