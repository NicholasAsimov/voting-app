(function () {
  const apiUrl = `${appUrl}/api/polls`;

  $('#submit-poll').click((e) => {
    e.preventDefault();

    $.post(apiUrl);

    window.location.replace(appUrl);

    // $('#poll-form').serialize();
    // $.post()
  });
}());
