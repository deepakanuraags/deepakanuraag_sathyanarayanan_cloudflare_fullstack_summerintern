var URLS = undefined;
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Promise((resolve, reject) => {
    fetch("https://cfw-takehome.developers.workers.dev/api/variants")
      .then(data => data.json())
      .then(data => data["variants"])
      .then(data => resolve(fetch(data[0])));
  });
  // let response = await fetch(
  //   "https://cfw-takehome.developers.workers.dev/api/variants"
  // );
  // let parsedResp = await response.json();
  // console.log(JSON.stringify(parsedResp));
  // return await fetch(parsedResp["variants"][0]);
}
