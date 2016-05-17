(function () {
  var appUrl = window.location.origin;
  var apiUrl = appUrl + '/api/polls';

  $('#poll-form').submit(function(e) {
    e.preventDefault();

    var title = $('#poll-title').val();
    var choices = $('#poll-choices').val();

    var poll = {
      title,
      choices: choices.split('\n').map(function(choice) {
        return { name: choice, votes: 0 }
      })
    };

    $.ajax({
      type: 'POST',
      url: apiUrl,
      data: JSON.stringify(poll),
      contentType: 'application/json'
    }).always(function() {
      window.location.replace(appUrl);
    });
  });
}());
