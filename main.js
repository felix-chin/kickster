let teamSelected = null;
let teams = [];
let matches = [];
let match = [];
let matchReport = null;
let match1HomeTeam = '';
let match1AwayTeam = '';
let match2HomeTeam = '';
let match2AwayTeam = '';
let match3HomeTeam = '';
let match3AwayTeam = '';
let match4HomeTeam = '';
let match4AwayTeam = '';
let match1HomeScore = null;
let match1AwayScore = null;
let match2HomeScore = null;
let match2AwayScore = null;
let match3HomeScore = null;
let match3AwayScore = null;
let match4HomeScore = null;
let match4AwayScore = null;
let highlightsArray = [];
let matchVideo = null;
const date = new Date();
const currentDate = new Date(date.getTime() - (12*60*60*1000) - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
const teamLogos = document.querySelector('.team-logos-wrapper');
const homeHeader = document.querySelector('.home-header');
const homePage = document.querySelector('.home');
const detailsHeader = document.querySelector('.details-header');
const teamDetails = document.querySelector('.team-details');
const team = document.querySelector('.team-name');
const stadium = document.querySelector('.venue-name');
const website = document.querySelector('.website');
const detailsTeamLogo = document.querySelector('.details-team-logo');
const homeButton = document.querySelector('.home-button');
const match1Home = document.querySelector('.match1Home');
const match1Away = document.querySelector('.match1Away');
const match2Home = document.querySelector('.match2Home');
const match2Away = document.querySelector('.match2Away');
const match3Home = document.querySelector('.match3Home');
const match3Away = document.querySelector('.match3Away');
const match4Home = document.querySelector('.match4Home');
const match4Away = document.querySelector('.match4Away');
const article1 = document.querySelector('.article1');
const article2 = document.querySelector('.article2');
const article3 = document.querySelector('.article3');
const article4 = document.querySelector('.article4');
const stadiumLocation = document.querySelector('.stadium-location');
const loader = document.querySelector('.loading-modal');
const matchHistory = document.querySelector('.match-history');
const highlights = document.querySelector('.highlights');
const closeButton = document.querySelector('.close-button');
const iframe = document.querySelector('iframe');

getTeams();

teamLogos.addEventListener('click', onLogoClick);
homeButton.addEventListener('click', reset);
matchHistory.addEventListener('click', playHighlights);
closeButton.addEventListener('click', function () {
  highlights.classList.add('d-none');
  iframe.src = 'about:blank';
})

function onLogoClick(event) {
  const element = event.target;
  if(!element.hasAttribute('data-team')) {
    return;
  }
  teamSelected = element.getAttribute('data-team');
  getMatches();
}

function playHighlights(event) {
  const element = event.target;
  if (!element.hasAttribute('data-video')) {
    return;
  }
  highlights.classList.remove('d-none');
  matchVideo = element.getAttribute('data-video');
  if(matchVideo === '1') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match1HomeTeam + '%' + match1AwayTeam;
  } else if (matchVideo === '2') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match2HomeTeam + '%' + match2AwayTeam;
  } else if (matchVideo === '3') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match3HomeTeam + '%' + match3AwayTeam;
  } else if (matchVideo === '4') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match4HomeTeam + '%' + match4AwayTeam;
  }
}

function loadingScreen() {
  loader.classList.remove('d-none');
  setTimeout(function() {
    loader.classList.add('d-none');
  }, 1000)
}

function populateTeam() {
  homeHeader.classList.add('d-none');
  homePage.classList.add('d-none');
  setTimeout(function() {
    teamDetails.classList.remove('d-none');
    detailsHeader.classList.remove('d-none');
    team.textContent = teams[teamSelected].name;
    stadium.textContent = teams[teamSelected].venue;
    stadiumLocation.textContent = teams[teamSelected].venue;
    website.textContent = teams[teamSelected].website;
    website.setAttribute('href', teams[teamSelected].website);
    detailsTeamLogo.classList.add(teams[teamSelected].tla);
  }, 1000);
}

function reset() {
  homeHeader.classList.remove('d-none');
  homePage.classList.remove('d-none');
  teamDetails.classList.add('d-none');
  detailsHeader.classList.add('d-none');
  detailsTeamLogo.classList.remove(teams[teamSelected].tla);
  match1Home.style.color = '';
  match1Home.style.fontWeight = '';
  match1Away.style.color = '';
  match1Away.style.fontWeight = '';
  match2Home.style.color = '';
  match2Home.style.fontWeight = '';
  match2Away.style.color = '';
  match2Away.style.fontWeight = '';
  match3Home.style.color = '';
  match3Home.style.fontWeight = '';
  match3Away.style.color = '';
  match3Away.style.fontWeight = '';
  match4Home.style.color = '';
  match4Home.style.fontWeight = '';
  match4Away.style.color = '';
  match4Away.style.fontWeight = '';
}

function getTeamNames() {
  for (let i = 0; i < teams.length; i++) {
    if (matches[matches.length - 1]['homeTeam']['id'] === teams[i]['id']) {
      match1HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 1]['awayTeam']['id'] === teams[i]['id']) {
      match1AwayTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 2]['homeTeam']['id'] === teams[i]['id']) {
      match2HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 2]['awayTeam']['id'] === teams[i]['id']) {
      match2AwayTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 3]['homeTeam']['id'] === teams[i]['id']) {
      match3HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 3]['awayTeam']['id'] === teams[i]['id']) {
      match3AwayTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 4]['homeTeam']['id'] === teams[i]['id']) {
      match4HomeTeam = teams[i]['shortName'];
    }
    if (matches[matches.length - 4]['awayTeam']['id'] === teams[i]['id']) {
      match4AwayTeam = teams[i]['shortName'];
    }
  }
}

function colorScore() {
  if(match1HomeScore > match1AwayScore) {
    match1Home.style.color = '#E4B222';
    match1Home.style.fontWeight = 'bold';
  } else if (match1AwayScore > match1HomeScore) {
    match1Away.style.color = '#E4B222';
    match1Away.style.fontWeight = 'bold';
  } else if (match1AwayScore === match1HomeScore) {
    match1Away.style.fontWeight = 'bold';
    match1Home.style.fontWeight = 'bold';
  }
  if (match2HomeScore > match2AwayScore) {
    match2Home.style.color = '#E4B222';
    match2Home.style.fontWeight = 'bold';
  } else if (match2AwayScore > match2HomeScore) {
    match2Away.style.color = '#E4B222';
    match2Away.style.fontWeight = 'bold';
  } else if (match2AwayScore === match2HomeScore) {
    match2Away.style.fontWeight = 'bold';
    match2Home.style.fontWeight = 'bold';
  }
  if (match3HomeScore > match3AwayScore) {
    match3Home.style.color = '#E4B222';
    match3Home.style.fontWeight = 'bold';
  } else if (match3AwayScore > match3HomeScore) {
    match3Away.style.color = '#E4B222';
    match3Away.style.fontWeight = 'bold';
  } else if (match3AwayScore === match3HomeScore) {
    match3Away.style.fontWeight = 'bold';
    match3Home.style.fontWeight = 'bold';
  }
  if (match4HomeScore > match4AwayScore) {
    match4Home.style.color = '#E4B222';
    match4Home.style.fontWeight = 'bold';
  } else if (match4AwayScore > match4HomeScore) {
    match4Away.style.color = '#E4B222';
    match4Away.style.fontWeight = 'bold';
  } else if (match4AwayScore === match4HomeScore) {
    match4Away.style.fontWeight = 'bold';
    match4Home.style.fontWeight = 'bold';
  }
}

function populateMatchHistory() {
  match1HomeScore = matches[matches.length - 1]['score']['fullTime']['homeTeam'];
  match1AwayScore = matches[matches.length - 1]['score']['fullTime']['awayTeam'];
  match2HomeScore = matches[matches.length - 2]['score']['fullTime']['homeTeam'];
  match2AwayScore = matches[matches.length - 2]['score']['fullTime']['awayTeam'];
  match3HomeScore = matches[matches.length - 3]['score']['fullTime']['homeTeam'];
  match3AwayScore = matches[matches.length - 3]['score']['fullTime']['awayTeam'];
  match4HomeScore = matches[matches.length - 4]['score']['fullTime']['homeTeam'];
  match4AwayScore = matches[matches.length - 4]['score']['fullTime']['awayTeam'];
  getTeamNames();
  colorScore();
  match1Home.textContent = `${match1HomeTeam} ${match1HomeScore}`;
  match1Away.textContent = `${match1AwayScore} ${match1AwayTeam}`;
  match2Home.textContent = `${match2HomeTeam} ${match2HomeScore}`;
  match2Away.textContent = `${match2AwayScore} ${match2AwayTeam}`;
  match3Home.textContent = `${match3HomeTeam} ${match3HomeScore}`;
  match3Away.textContent = `${match3AwayScore} ${match3AwayTeam}`;
  match4Home.textContent = `${match4HomeTeam} ${match4HomeScore}`;
  match4Away.textContent = `${match4AwayScore} ${match4AwayTeam}`;
}

function handleGetError(error) {
  console.error(error);
}

function handleGetTeamsSuccess(data) {
  teams = data.teams;
}

function getTeams() {
  $.ajax({
    method: "GET",
    url: "http://api.football-data.org/v2/competitions/2021/teams",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    data: {
      "season": "2019"
    },
    error: handleGetError,
    success: handleGetTeamsSuccess
  })
}

function handleGetMatchesSuccess(data) {
  matches = data.matches;
  loadingScreen();
  populateTeam();
  populateMatchHistory();
  getNewsArticle();
  initMap();
  getMatch();
}

function getMatches() {
  $.ajax({
    method: "GET",
    url: "http://api.football-data.org/v2/teams/" + teams[teamSelected].id + "/matches",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    data: {
      "competitions":"2021",
      "status": "FINISHED"
    },
    error: handleGetError,
    success: handleGetMatchesSuccess
  })
}

function handleGetMatchSuccess(data) {
  match = data;
}

function getMatch() {
  $.ajax({
    method: "GET",
    url: "http://api.football-data.org/v2/matches/264644",
    headers: {
      "X-Auth-Token": "2e33b10247bd4841be2fec54f309863c"
    },
    data: {
    },
    error: handleGetError,
    success: handleGetMatchSuccess
  })
}

function handleGetNewsArticleSuccess (data) {
  matchReport = data.response.results;
  const text1 = matchReport[0].webTitle;
  const text2 = matchReport[1].webTitle;
  const text3 = matchReport[2].webTitle;
  const text4 = matchReport[3].webTitle;
  const link1 = matchReport[0].webUrl;
  const link2 = matchReport[1].webUrl;
  const link3 = matchReport[2].webUrl;
  const link4 = matchReport[3].webUrl;
  article1.textContent = text1;
  article2.textContent = text2;
  article3.textContent = text3;
  article4.textContent = text4;
  article1.setAttribute('href', link1);
  article2.setAttribute('href', link2);
  article3.setAttribute('href', link3);
  article4.setAttribute('href', link4);
}

function getNewsArticle() {
  $.ajax({
    method: "GET",
    url: "https://content.guardianapis.com/search",
    data: {
      "api-key": "a8d15746-592e-4adf-96a5-171b4d3e254c",
      "tag": "tone/matchreports,football/premierleague",
      "q": teams[teamSelected].name,
      "order-by": "newest",
      "page-size": 4
    },
    error: handleGetError,
    success: handleGetNewsArticleSuccess
  })
}

function initMap() {
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 15,
      gestureHandling: 'cooperative'
    });
  const geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  const address = teams[teamSelected]["address"];
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    }
  });
}
