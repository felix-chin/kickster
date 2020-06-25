let teamSelected = null;
let teams = [];
let matches = [];
let matchReport = null;
const date = new Date();
const currentDate = new Date(date.getTime() - (24*60*60*1000) - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
const teamLogos = document.querySelector('.team-logos-wrapper');
const homeHeader = document.querySelector('.home-header');
const homePage = document.querySelector('.home');
const detailsHeader = document.querySelector('.details-header');
const teamDetails = document.querySelector('.team-details');
const team = document.querySelector('.team-name');
const stadium = document.querySelector('.venue-name');
const website = document.querySelector('.website');
const detailsTeamLogo = document.querySelector('.details-team-logo');
const epl = document.querySelector('.epl');
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

getTeams();

teamLogos.addEventListener('click', onLogoClick);
epl.addEventListener('click', reset);

function onLogoClick(event) {
  const element = event.target;
  if(!element.hasAttribute('data-team')) {
    return;
  }
  teamSelected = element.getAttribute('data-team');
  getMatches();
}


function populateTeam() {
  homeHeader.classList.add('d-none');
  homePage.classList.add('d-none');
  teamDetails.classList.remove('d-none');
  detailsHeader.classList.remove('d-none');
  team.textContent = teams[teamSelected].name;
  stadium.textContent = teams[teamSelected].venue;
  website.innerHTML = teams[teamSelected].website.link(teams[teamSelected].website);
  detailsTeamLogo.classList.add(teams[teamSelected].tla);
  epl.classList.add('epl-icon');
}

function reset() {
  homeHeader.classList.remove('d-none');
  homePage.classList.remove('d-none');
  teamDetails.classList.add('d-none');
  detailsHeader.classList.add('d-none');
  detailsTeamLogo.classList.remove(teams[teamSelected].tla);
}

function populateMatchHistory() {
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
  getNewsArticle();
  initMap();
}

function getMatches() {
  $.ajax({
    method: "GET",
    url: "http://api.football-data.org/v2/teams/" + teams[teamSelected].id + "/matches/",
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

function handleGetNewsArticleSuccess (data) {
  matchReport = data.response.results;
  const link1 = matchReport[0].webTitle.link(matchReport[0].webUrl);
  const link2 = matchReport[1].webTitle.link(matchReport[1].webUrl);
  const link3 = matchReport[2].webTitle.link(matchReport[2].webUrl);
  const link4 = matchReport[3].webTitle.link(matchReport[3].webUrl);
  article1.innerHTML = link1;
  article2.innerHTML = link2;
  article3.innerHTML = link3;
  article4.innerHTML = link4;
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
