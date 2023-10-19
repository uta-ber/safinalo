let allPlanetInfo;
let currentPlanetInfo;
let menuOpen = false;

window.addEventListener("popstate", function (event) {
  const arr = window.location.href.split("/");
  const lastWord = arr[arr.length - 1];

  fetch("https://planets-api.vercel.app/api/v1/planets/" + lastWord)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      currentPlanetInfo = json;
      fillInformation(currentPlanetInfo, "overview");
    });
});

fetch("https://planets-api.vercel.app/api/v1/planets/")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    allPlanetInfo = json;
    currentPlanetInfo = allPlanetInfo[0];
  });

let headInfo = document.getElementsByClassName("headInfo")[0];
let overviewButtonHead = headInfo.children[0];
let internalButtonHead = headInfo.children[1];
let surfaceGeologyHead = headInfo.children[2];

let bodyInfo = document.getElementsByClassName("bodyInfo")[0];
let overviewButtonBody = bodyInfo.children[0];
let internalButtonBody = bodyInfo.children[1];
let surfaceGeologyBody = bodyInfo.children[2];

let hamburgerMenu = document.getElementsByClassName("hamburger-menu")[0];
hamburgerMenu.onclick = function () {
  if (menuOpen) {
    // Delete element
    document.getElementsByClassName("hamburger-menu__links")[0].remove();
    document.getElementsByClassName("middleDiv")[0].style = "display: flex;";
    menuOpen = false;
  } else {
    // Open menu
    let menuLinks = document.createElement("div");
    menuLinks.className = "hamburger-menu__links";
    hamburgerMenu.appendChild(menuLinks);
    document.getElementsByClassName("middleDiv")[0].style = "display: none;";

    for (const planet of allPlanetInfo) {
      planetDiv = document.createElement("div");
      planetDiv.className = "menuPlanets";

      planetLink = document.createElement("a");
      planetLink.href = "#/planets/" + planet.name;
      planetLink.style =
        "text-decoration: none; display: flex; justify-content: space-beween;";

      header = document.createElement("h3");
      header.innerHTML = planet.name;
      header.style = "margin-left: 24px; margin-top: 2px;";

      let hr = document.createElement("hr");
      hr.style = "margin-bottom: 22px;";

      planetLink.appendChild(header);
      planetDiv.appendChild(planetLink);
      planetDiv.appendChild(hr);
      menuLinks.appendChild(planetDiv);
    }
    menuOpen = true;
  }
};

overviewButtonBody.onclick = function () {
  fillInformation(currentPlanetInfo, "overview");
};
overviewButtonHead.onclick = function () {
  fillInformation(currentPlanetInfo, "overview");
};

internalButtonBody.onclick = function () {
  fillInformation(currentPlanetInfo, "internal");
};
internalButtonHead.onclick = function () {
  fillInformation(currentPlanetInfo, "internal");
};

surfaceGeologyBody.onclick = function () {
  fillInformation(currentPlanetInfo, "geology");
};
surfaceGeologyHead.onclick = function () {
  fillInformation(currentPlanetInfo, "geology");
};

function fillInformation(planetInfo, type) {
  let planetNameElement = document.getElementsByClassName("planetName")[0];
  let textContent = document.getElementsByClassName("textContent")[0];
  let rotationTime = document
    .getElementsByClassName("info")[0]
    .children[0].getElementsByClassName("infoNumber")[0];
  let revolutionTime = document
    .getElementsByClassName("info")[0]
    .children[1].getElementsByClassName("infoNumber")[0];
  let radius = document
    .getElementsByClassName("info")[0]
    .children[2].getElementsByClassName("infoNumber")[0];
  let temp = document
    .getElementsByClassName("info")[0]
    .children[3].getElementsByClassName("infoNumber")[0];
  let planetImage = document.getElementsByClassName("mainImg")[0];

  if (type === "overview") {
    textContent.innerHTML = planetInfo.overview.content;
    planetImage.src = planetInfo.images.planet;
  } else if (type === "internal") {
    textContent.innerHTML = planetInfo.structure.content;
    planetImage.src = planetInfo.images.internal;
  } else if (type === "geology") {
    textContent.innerHTML = planetInfo.geology.content;
    planetImage.src = planetInfo.images.geology;
  }

  planetNameElement.innerHTML = planetInfo.name;
  rotationTime.innerHTML = planetInfo.rotation;
  revolutionTime.innerHTML = planetInfo.revolution;
  radius.innerHTML = planetInfo.radius;
  temp.innerHTML = planetInfo.temperature;
}
