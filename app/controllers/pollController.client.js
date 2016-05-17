(function () {
  $('#custom-form').hide();

  var appUrl = window.location.origin;
  var pollId = $('#poll-id').data('poll-id');
  var apiUrl = appUrl + '/api/poll';

  $('#choice-select').change(function() {
    var selectedId = $(this).children(':selected').attr('id');

    if (selectedId == 'choice-custom') {
      $('#custom-form').show();
      $('#input-custom').prop('required', true)
    } else {
      $('#custom-form').hide();
      $('#input-custom').removeAttr('required')
    }
  })

  $('#vote-form').submit(function(e) {
    e.preventDefault();
    var choice = $('#input-custom').val() || $('#choice-select').val();
    var data = { pollId, choice };

    $.ajax({
      type: 'POST',
      url: apiUrl,
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).always(function() {
      window.location.reload();
    });
  });
}());
