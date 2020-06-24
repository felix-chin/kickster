const clubLogos = document.querySelector('.club-logos-wrapper');
let clubSelected = null;
let teams = [];
let matches = [];
const date = new Date();
const currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
const homeHeader = document.querySelector('.home-header');
const homePage = document.querySelector('.home');
const teamHeader = document.querySelector('.team-header');
const clubDetails = document.querySelector('.club-details');
const team = document.querySelector('.team-name');
const stadium = document.querySelector('.venue-name');
const website = document.querySelector('.website');
const logoHeader = document.querySelector('.logo-header');
const eplHeader = document.querySelector('.epl-header');

getTeams();

clubLogos.addEventListener('click', onLogoClick);

function onLogoClick(event) {
  const element = event.target;
  if(!element.hasAttribute('data-club')) {
    return;
  }
  clubSelected = element.getAttribute('data-club');
  getMatches();
}


function populateTeam() {
  homeHeader.classList.add('d-none');
  homePage.classList.add('d-none');
  clubDetails.classList.remove('d-none');
  teamHeader.classList.remove('d-none');
  team.textContent = teams[clubSelected].name;
  stadium.textContent = teams[clubSelected].venue;
  website.textContent = teams[clubSelected].website;
  logoHeader.classList.add(teams[clubSelected].tla);
  eplHeader.classList.add('epl');
  eplHeader.addEventListener('click', reset);
}

function reset() {
  homeHeader.classList.remove('d-none');
  homePage.classList.remove('d-none');
  clubDetails.classList.add('d-none');
  teamHeader.classList.add('d-none');
}

function populateMatchHistory() {
  const match1Home = document.querySelector('.match1Home');
  const match1Away = document.querySelector('.match1Away');
  const match2Home = document.querySelector('.match2Home');
  const match2Away = document.querySelector('.match2Away');
  const match3Home = document.querySelector('.match3Home');
  const match3Away = document.querySelector('.match3Away');
  const match4Home = document.querySelector('.match4Home');
  const match4Away = document.querySelector('.match4Away');
  const match1HomeTeam = matches[matches.length - 1]['homeTeam']['name'];
  const match1AwayTeam = matches[matches.length - 1]['awayTeam']['name'];
  const match1HomeScore = matches[matches.length - 1]['score']['fullTime']['homeTeam'];
  const match1AwayScore = matches[matches.length - 1]['score']['fullTime']['awayTeam'];
  const match2HomeTeam = matches[matches.length - 2]['homeTeam']['name'];
  const match2AwayTeam = matches[matches.length - 2]['awayTeam']['name'];
  const match2HomeScore = matches[matches.length - 2]['score']['fullTime']['homeTeam'];
  const match2AwayScore = matches[matches.length - 2]['score']['fullTime']['awayTeam'];
  const match3HomeTeam = matches[matches.length - 3]['homeTeam']['name'];
  const match3AwayTeam = matches[matches.length - 3]['awayTeam']['name'];
  const match3HomeScore = matches[matches.length - 3]['score']['fullTime']['homeTeam'];
  const match3AwayScore = matches[matches.length - 3]['score']['fullTime']['awayTeam'];
  const match4HomeTeam = matches[matches.length - 4]['homeTeam']['name'];
  const match4AwayTeam = matches[matches.length - 4]['awayTeam']['name'];
  const match4HomeScore = matches[matches.length - 4]['score']['fullTime']['homeTeam'];
  const match4AwayScore = matches[matches.length - 4]['score']['fullTime']['awayTeam'];
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
  populateTeam();
  populateMatchHistory();
  initMap();
}

function getMatches() {
  $.ajax({
    method: "GET",
    url: "http://api.football-data.org/v2/teams/" + teams[clubSelected].id + "/matches/",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    data: {
      "dateFrom":"2019-08-06",
      "dateTo": currentDate,
      "competitions":"2021"
    },
    error: handleGetError,
    success: handleGetMatchesSuccess
  })
}

function getNewsArticle() {
  $.ajax({
    method: "GET",
    url: ""+"",
    data: {
      "dateFrom": "2019-08-06",
      "dateTo": currentDate,
      "competitions": "2021"
    },
    error: handleGetError,
    success: handleGetMatchesSuccess
  })
}

function initMap() {
  const map = new google.maps.Map(
    document.getElementById('map'), { zoom: 15});
  const geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  const address = teams[clubSelected]["address"];
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
