(function () {
  const appUrl = window.location.origin;
  const apiUrl = `${appUrl}/api/polls`;

  $('#submit-poll').click(e => {
    e.preventDefault();

    const title = document.getElementById('poll-title').value;
    const choices = document.getElementById('poll-choices').value;

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
