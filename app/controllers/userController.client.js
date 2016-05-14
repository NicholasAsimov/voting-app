(function () {
  const profileId = document.querySelector('#profile-id') || null;
  const profileUsername = document.querySelector('#profile-username') || null;
  const profileRepos = document.querySelector('#profile-repos') || null;
  const displayName = document.querySelector('#display-name');
  const apiUrl = `${appUrl}/api/user`;

  $.get(apiUrl, user => {
    if (user.displayName !== null) {
      displayName.innerText = user.displayName;
    } else {
      displayName.innerText = 'username';
    }

    if (profileId !== null) {
      profileId.innerText = user.id;
    }

    if (profileUsername !== null) {
      profileUsername.innerText = user.username;
    }

    if (profileRepos !== null) {
      profileRepos.innerText = user.publicRepos;
    }
  });
}());
