(function () {
  var appUrl = window.location.origin;
  var apiUrl = appUrl + '/api/poll';

  $('.btn-delete').click(function(e) {
    var pollId = $(this).data('poll-id');

    var data = { pollId };

    $.ajax({
      type: 'DELETE',
      url: apiUrl,
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).always(function() {
      window.location.reload();
    });
  });
}());
