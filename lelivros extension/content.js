function getPostLink() {
  let links = [];
  let posts = document.getElementsByClassName('post-17105');
  if (posts.length > 0) {
    for (post of posts) {
      links.push(post.getElementsByTagName('a')[0].href)
    }
  }
  return links;
}

function getExtensionLinks() {
  let extensionsLinks = [];
  let linksDownload = document.getElementsByClassName("links-download");
  if (linksDownload.length > 0) {
    let linksExtension = linksDownload[0].getElementsByTagName("a");
    if (linksExtension.length > 0) {
      for (link of linksExtension) {
        if (link.target == "_blank") {
          extensionsLinks.push(link.href);
        }
      }
      return extensionsLinks;
    }
  }
  return extensionsLinks;
}

chrome.runtime.sendMessage({ request: "waiting" }, function (response) {
  if (response.request == "getAllLinksFromCurrentPage") {
    let links = getPostLink();
    chrome.runtime.sendMessage({ request: "gotAllLinksFromCurrentPage", links: links }, function (response) {
      if (response.request == "updateUrl") {
        window.location.href = response.url;
      }
    });

  }
  if (response.request == "downloadAllFormats") {
    let extensionsLinks = getExtensionLinks();
    chrome.runtime.sendMessage({ request: "openLinksInNewTab", links: extensionsLinks }, function (response) {
      if (response.request == "updateUrl") {
        window.location.href = response.url;
      }
    });
  }
})