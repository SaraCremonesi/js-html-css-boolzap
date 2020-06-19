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
    //Controllo che il dropdown che sto esaminando sia visibile con is(':visible')
    var visible = $(this).siblings('.dropdown').is(':visible');
    //Chiudo tutti i dropdown (compreso quello che sto esaminando)
    $('.icon').siblings('.dropdown').hide();
    if (visible === false) {
      $(this).siblings('.dropdown').show();
    }
  }
  );

  // Gestione eliminazine messaggi
  $(document).on('click', '.delete',
  function() {
    $(this).parents('.message').addClass('hidden');
  }
  );

  // Gestione scelta chat
  $(document).on('click', '.chat-avatar',
  function() {

    // gestione classe active su chat attiva
    $(this).siblings('.chat-avatar').removeClass('active');
    $(this).addClass('active');

    //?
    $('.window').removeClass('active');
    var contact = $(this).attr('data-chat');
    $('.window[data-window="' + contact + '"]').addClass('active');

    // gestione del cambio di immagine e nome dell'avatar nel profilo in alto in base alla chat rispettiva selezionata
    var contactName = $(this).find('p:first-child').text();
    var contactImage = $(this).find('img').attr('src');
    var current = $('.current');
    current.find('p:first-child').text(contactName);
    current.find('img').attr('src', contactImage);
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
      // scrivo il valore del messaggio letto nel mio paragrafo
      messageSent.children('p').text(messageValue);
      // gli aggiungo la classe per contrassegnare che fa parte dei messaggi inviati (quelli verdi)
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
