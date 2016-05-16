(function () {
  const appUrl = window.location.origin;
  const apiUrl = `${appUrl}/api/polls`;

  $('#poll-form').submit(e => {
    e.preventDefault();

    const title = $('#poll-title').val();
    const choices = $('#poll-choices').val();

    const poll = {
      title,
      choices: choices.split('\n').map(choice => ({ name: choice, votes: 0 }))
    };

    $.ajax({
      type: 'POST',
      url: apiUrl,
      data: JSON.stringify(poll),
      contentType: 'application/json'
    }).always(() => {
      window.location.replace(appUrl);
    });
  });
}());
