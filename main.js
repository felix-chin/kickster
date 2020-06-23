const clubLogos = document.querySelector('.club-logos-wrapper');
let clubSelected = null;
let teams = [];
let matches = [];
const date = new Date();
const currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
const homeHeader = document.querySelector('.home-header');
const homePage = document.querySelector('.home');
const teamHeader = document.querySelector('.team-header');

getTeams();

clubLogos.addEventListener('click', onLogoClick);

function onLogoClick(event) {
  const element = event.target;
  if(!element.hasAttribute('data-club')) {
    return;
  }
  clubSelected = element.getAttribute('data-club');
  getMatches();
  populateTeam();
}

function populateTeam() {
  homeHeader.classList.add('d-none');
  homePage.classList.add('d-none');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const text1 = document.createElement('h5');
  const text2 = document.createElement('h6');
  const text3 = document.createElement('h6');
  text1.textContent = teams[clubSelected].name;
  text2.textContent = "Stadium: " + teams[clubSelected].venue;
  text3.textContent = teams[clubSelected].website;
  div3.classList.add(teams[clubSelected].tla)
  div3.classList.add(teams[clubSelected].tla)
  div2.className = 'd-flex flex-column justify-content-center'
  div1.appendChild(div3)
  div2.append(text1, text2, text3)
  teamHeader.append(div1, div2)
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
  matches = data;
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
