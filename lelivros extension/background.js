var pageCounter = 1;
var linkCounter = 0;
var defaultUrl = "http://lelivros.love/book/page/";
var newUrl = "";
var links = [];
var totalPages = 623;
var downloadProcessStarted = false;
var buttonState = false;


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.request == "waiting") {
        if (downloadProcessStarted == false) {
            sendResponse({ request: "getAllLinksFromCurrentPage" });
        }
        else {
            sendResponse({ request: "downloadAllFormats" });
        }
    }
    if (message.request == "gotAllLinksFromCurrentPage") {
        links = message.links;
        downloadProcessStarted = true;
        sendResponse({ request: "updateUrl", url: links[linkCounter] })
        linkCounter++;
    }
    if (message.request == "openLinksInNewTab") {
        //download epub only for now!
        chrome.tabs.create({ url: message.links[0], selected: false });
        if (linkCounter <= links.length) {
            if(linkCounter  == 16){
                downloadProcessStarted = false;
                linkCounter = 0;
                pageCounter++;
                console.log("Page:",pageCounter);
                
                newUrl = defaultUrl + pageCounter + "/";
                sendResponse({ request: "updateUrl", url: newUrl });
            }
            else{
                console.log("index:",linkCounter)
                sendResponse({ request: "updateUrl", url: links[linkCounter] });
                linkCounter++;
            }
        }
    }
})