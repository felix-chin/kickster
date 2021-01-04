let teamSelected = null;
let teams = [];
let players = [];
let matches = [];
let allMatches = [];
let matchReports= [];
const chooseTeamHeading = document.querySelector('.choose-team-heading');
const teamLogos = document.querySelector('.team-logos-wrapper');
const playersTable = document.querySelector('.players-table');
const homeHeader = document.querySelector('.home-header');
const homePage = document.querySelector('.home');
const detailsHeader = document.querySelector('.details-header');
const teamDetails = document.querySelector('.team-details');
const team = document.querySelector('.team-name');
const stadium = document.querySelector('.venue-name');
const website = document.querySelector('.website');
const logoWrapper = document.querySelector('.logo-wrapper');
const homeButton = document.querySelector('.home-button');
const articleGroup = document.querySelector('.article-group');
const loader = document.querySelector('.loading-screen');
const highlights = document.querySelector('.highlights');
const closeButton = document.querySelector('.close-button');
const iframe = document.querySelector('iframe');
const tryAgainModal = document.querySelector('.try-again');
const tryAgainButton = document.querySelector('.try-again-btn');
const menuBar = document.querySelector('.menu-bar');
const news = document.querySelector('.article');
const matchResults = document.querySelector('.match-results');
const stats = document.querySelector('.stats');
const roster = document.querySelector('.roster');
const results = document.querySelector('.results');

menuBar.addEventListener('click', onMenuBarClick)
teamLogos.addEventListener('click', onLogoClick);
homeButton.addEventListener('click', reset);
matchResults.addEventListener('click', getHighlights);
closeButton.addEventListener('click', () => {
  highlights.classList.add('d-none');
  iframe.src = 'about:blank';
})
tryAgainButton.addEventListener('click', () => {
  start();
  tryAgainModal.classList.add('d-none');
  loader.classList.remove('d-none');
})
window.addEventListener('load', () => {
  loader.classList.remove('d-none');
})

start();

function start() {
  getTeams();
  getAllMatches();
}

function onMenuBarClick(event) {
  if (event.target.getAttribute('id') === 'news') {
    news.classList.remove('d-none');
    matchResults.classList.add('d-none');
    stats.classList.add('d-none');
    roster.classList.add('d-none');
  } else if (event.target.getAttribute('id') === 'sched') {
    news.classList.add('d-none');
    matchResults.classList.remove('d-none');
    stats.classList.add('d-none');
    roster.classList.add('d-none');
  } else if (event.target.getAttribute('id') === 'roster') {
    news.classList.add('d-none');
    matchResults.classList.add('d-none');
    stats.classList.add('d-none');
    roster.classList.remove('d-none');
  } else if (event.target.getAttribute('id') === 'stats') {
    news.classList.add('d-none');
    matchResults.classList.add('d-none');
    stats.classList.remove('d-none');
    roster.classList.add('d-none');
  }
}

function onLogoClick(event) {
  loader.classList.remove('d-none');
  const element = event.target;
  if(!element.hasAttribute('data-team')) {
    return;
  }
  teamSelected = element.getAttribute('data-team');
  matches = allMatches.filter(
    match => match['awayTeam'].id === teams[teamSelected].id || match['homeTeam'].id === teams[teamSelected].id
  )
  displayClubHeader();
  getMatchInfo();
  getPlayers(teams[teamSelected]['id']);
}

function getHighlights(event) {
  const element = event.target;
  if (!element.hasAttribute('data-video')) {
    return;
  }
  highlights.classList.remove('d-none');
  matchVideo = element.getAttribute('data-video');
  if(matchVideo === '1') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match1HomeTeam + '%' + match1AwayTeam + '%2020';
  } else if (matchVideo === '2') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match2HomeTeam + '%' + match2AwayTeam + '%2020';
  } else if (matchVideo === '3') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match3HomeTeam + '%' + match3AwayTeam + '%2020';
  } else if (matchVideo === '4') {
    iframe.src = 'https://www.youtube.com/embed?listType=search&list=nbcsports%' + match4HomeTeam + '%' + match4AwayTeam + '%2020';
  }
}

function displayClubHeader() {
  const img = document.createElement('img');
  img.classList.add('details-team-logo');
  homeHeader.classList.add('d-none');
  homePage.classList.add('d-none');
  team.textContent = teams[teamSelected].name;
  stadium.textContent = teams[teamSelected].venue;
  website.textContent = teams[teamSelected].website;
  website.setAttribute('href', teams[teamSelected].website);
  img.src =teams[teamSelected].crestUrl;
  teamDetails.classList.remove('d-none');
  detailsHeader.classList.remove('d-none');
  menuBar.classList.remove('d-none');
  logoWrapper.appendChild(img);
}

function reset() {
  homeHeader.classList.remove('d-none');
  homePage.classList.remove('d-none');
  teamDetails.classList.add('d-none');
  detailsHeader.classList.add('d-none');
  menuBar.classList.add('d-none');
  matchReports = [];
  players = [];
  playersTable.innerHTML = '';
  logoWrapper.innerHTML = '';
  results.innerHTML = '';
  news.classList.remove('d-none');
  matchResults.classList.add('d-none');
  stats.classList.add('d-none');
  roster.classList.add('d-none');
}

function getMatchInfo() {
  for (let i = matches.length - 1; i >= 0; i--) {
    const div = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    const date = new Date(matches[i].utcDate.split('T')[0]).toLocaleDateString('en-US', options);
    const score = `${matches[i].score.fullTime.homeTeam} - ${matches[i].score.fullTime.awayTeam}`;
    let opp = '';
    if (matches[i].homeTeam.name !== teams[teamSelected].name) {
      opp = `@ ${matches[i].homeTeam.name}`;
    } else {
      opp = `vs ${matches[i].awayTeam.name}`;
    }
    span1.textContent = date;
    span2.textContent = opp;
    span3.textContent = score;
    div.classList.add('row')
    span1.classList.add('col-4');
    span2.classList.add('col-auto');
    span3.classList.add('col-2');
    div.append(span1, span2, span3);
    results.appendChild(div);
  }
  getNewsArticle();
}

function handleGetError(error) {
  console.error(error);
  tryAgainModal.classList.remove('d-none');
  loader.classList.add('d-none');
}

function renderTeams(teams) {
  for (let i = 0; i < teams.length; i++) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'preload');
    linkEl.setAttribute('href', teams[i].crestUrl);
    linkEl.setAttribute('as', 'image');
    document.head.appendChild(linkEl);
    const div = document.createElement('div');
    const img = document.createElement('img');
    const clubCrest = new Image();
    clubCrest.onload = () => {
      img.src = clubCrest.src;
    }
    clubCrest.src = teams[i].crestUrl;
    div.className = 'col-sm-2 col-3 team-logo';
    img.setAttribute('data-team', i);
    div.appendChild(img);
    teamLogos.firstElementChild.appendChild(div);
  }
  loader.classList.add('d-none');
}

function handleGetPlayersSuccess(data) {
  players = data.squad;
  players.forEach(player => {
    if (player.role === 'PLAYER') {
      const row = document.createElement('tr');
      const name = document.createElement('td');
      const pos = document.createElement('td');
      const nat = document.createElement('td');
      name.textContent = player.name;
      pos.textContent = player.position;
      nat.textContent = player.nationality;
      row.append(pos, nat, name);
      playersTable.appendChild(row);
    }
  })
}

function getPlayers(team) {
  $.ajax({
    method: "GET",
    url: `https://api.football-data.org/v2/teams/${team}`,
    headers: {
      "X-Auth-Token": "2e33b10247bd4841be2fec54f309863c"
    },
    error: handleGetError,
    success: handleGetPlayersSuccess
  })
}

function handleGetTeamsSuccess(data) {
  teams = data.teams;
  renderTeams(teams);
  teams[0].tag = 'arsenal';
  teams[1].tag = 'aston-villa';
  teams[2].tag = 'chelsea';
  teams[3].tag = 'everton';
  teams[4].tag = 'liverpool';
  teams[5].tag = 'manchestercity';
  teams[6].tag = 'manchester-united';
  teams[7].tag = 'newcastleunited';
  teams[8].tag = 'norwichcity';
  teams[9].tag = 'tottenham-hotspur';
  teams[10].tag = 'wolves';
  teams[11].tag = 'burnley';
  teams[12].tag = 'leicestercity';
  teams[13].tag = 'southampton';
  teams[14].tag = 'watford';
  teams[15].tag = 'crystalpalace';
  teams[16].tag = 'sheffieldunited';
  teams[17].tag = 'brightonfootball';
  teams[18].tag = 'westhamunited';
  teams[19].tag = 'bournemouth';
}

function getTeams() {
  $.ajax({
    method: "GET",
    url: "https://api.football-data.org/v2/competitions/2021/teams",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    error: handleGetError,
    success: handleGetTeamsSuccess
  })
}

function handleGetAllMatchesSuccess(data) {
  allMatches = data.matches;
}

function getAllMatches() {
  $.ajax({
    method: "GET",
    url: "https://api.football-data.org/v2/competitions/2021/matches",
    headers: {
      "X-Auth-Token":"2e33b10247bd4841be2fec54f309863c"
    },
    data: {
      "status": "FINISHED"
    },
    error: handleGetError,
    success: handleGetAllMatchesSuccess
  })
}

function renderMatchReports() {
  matchReports.forEach(report => {
    const div = document.createElement('div');
    const anchor = document.createElement('a');
    const text = report.webTitle;
    const link = report.webUrl;
    anchor.textContent = text;
    anchor.setAttribute('href', link);
    anchor.setAttribute('target', '_blank');
    div.append(anchor);
    articleGroup.append(div);
  })
  loader.classList.add('d-none');
}

function handleGetNewsArticleSuccess (data) {
  matchReports = data.response.results;
  renderMatchReports();
}

function getNewsArticle() {
  $.ajax({
    method: "GET",
    url: "https://content.guardianapis.com/search",
    data: {
      "api-key": "a8d15746-592e-4adf-96a5-171b4d3e254c",
      "q": teams[teamSelected].name,
      "order-by": 'newest'
    },
    error: handleGetError,
    success: handleGetNewsArticleSuccess
  })
}
