$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message_place" data-message-id=` + message.id + `>
          <div class="chatmessage__contents">
            <div class="chatmessage__contents__user">
              ${message.user_name}
            </div>
            <div class="chatmessage__contents__time">
              ${message.date}
            </div>
          </div>
          <div class="chatmessage__message">
            ${message.content}
            <img class="lower-message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      var html =
      `<div class="message_place" data-message-id=` + message.id + `>
         <div class="chatmessage__contents">
           <div class="chatmessage__contents__user">
             ${message.user_name}
           </div>
           <div class="chatmessage__contents__time">
             ${message.date}
           </div>
         </div>
         <div class="chatmessage__message">
           ${message.content}
         </div>
       </div>`
      return html;
    };
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatmessage').append(html);
      $('.chatmessage').animate({ scrollTop: $('.chatmessage')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  $(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var reloadMessages = function() {
      last_message_id = $('.message_place:last').data('message-id')
        $.ajax({
          url: 'api/messages',
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          if (messages.lengs !== 0){
          var insertHTML = '';
          $.each(messages, function(i, message){
            insertHTML += buildHTML(message)
          });
          $('.chatmessage').append(insertHTML);
          $('.chatmessage').animate({ scrollTop: $('.chatmessage')[0].scrollHeight})
         }
        })
        .fail(function() {
          alert('error!');
        });
      };
      $(function(){
        setInterval(reloadMessages, 7000);
      });
    } else {
      return false;
    }
    });
})
