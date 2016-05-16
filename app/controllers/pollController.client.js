(function () {
  const appUrl = window.location.origin;
  const pollId = $('#poll-id').data('poll-id');
  const apiUrl = `${appUrl}/api/poll`;

  $('#submit-vote').click(e => {
    e.preventDefault();
    const choice = $('#choice-select').val();
    const data = {
      pollId: pollId.slice(1, pollId.length - 1), // Removing double-double quotes
      choice
    };

    $.ajax({
      type: 'POST',
      url: apiUrl,
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).always(() => {
      window.location.reload();
    });
  });
}());
