var URLS = undefined;
var toggleString = "server1";
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Promise((resolve, reject) => {
    if (!URLS) {
      console.log("fetching URLS");
      fetch("https://cfw-takehome.developers.workers.dev/api/variants")
        .then(data => data.json())
        .then(data => {
          URLS = data["variants"];
        })
        .then(() => {
          resolve(getWebPage());
        });
    } else {
      console.log("not fetching URLS");
      resolve(getWebPage());
    }
  });
  // let response = await fetch(
  //   "https://cfw-takehome.developers.workers.dev/api/variants"
  // );
  // let parsedResp = await response.json();
  // console.log(JSON.stringify(parsedResp));
  // return await fetch(parsedResp["variants"][0]);
}

async function getWebPage() {
  if (toggleString == "server1") {
    toggleString = "server2";
    return fetch(URLS[0]);
  }
  if (toggleString == "server2") {
    toggleString = "server1";
    return fetch(URLS[1]);
  }
}
