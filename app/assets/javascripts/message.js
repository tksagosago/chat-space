$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chatmessage__contents">
          <div class="chatmessage__contents__user">
            ${message.user_name}
          </div>
          <div class="chatmessage__contents__time">
            ${message.date}
          </div>
        </div>
        <div class="chatmessage__message">
          <img class="lower-message__image" src${message.image}>
        </div>`
      return html;
    } else {
      var html =
       `<div class="chatmessage__contents">
          <div class="chatmessage__contents__user">
            ${message.user_name}
          </div>
          <div class="chatmessage__contents__time">
            ${message.date}
          </div>
        </div>
        <div class="chatmessage__message">
          ${message.content}
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
      console.log(data)
      var html = buildHTML(data);
      console.log(html)
      $('.chatmessage').append(html);
      $('.chatmessage').animate({ scrollTop: $('.chatmessage')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
})
