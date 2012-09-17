var requestHeaders = [
  {
    name: "User-Agent",
    value: navigator.userAgent.replace('Mozilla/5.0','iTunes/10.7')
  }
];

if (localStorage.appleStoreFront) {
  requestHeaders.push({name:"X-Apple-Store-Front", value: localStorage.appleStoreFront});
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    return {
      requestHeaders: requestHeaders 
    };
  },
  {
    "urls": ["*://*.itunes.apple.com/*", "*://*.itunes.com/*"]
  },
  ["blocking"]
);

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    details.responseHeaders.forEach(function(header) {
      if (header.name.toLowerCase() == "content-type") {
        var value = header.value.toLowerCase();
        if (value.indexOf("text/xml") == 0) {
          chrome.tabs.executeScript(details.tabId, {file: "js/plist_parser.js", runAt: "document_start"});
          chrome.tabs.executeScript(details.tabId, {file: "js/content_xml.js", runAt: "document_end"});
        } else if (value.toLowerCase().indexOf("text/html") == 0) {
          chrome.tabs.executeScript(details.tabId, {file: "js/content_html.js", runAt: "document_start"});
        } else {
          console.log('unhandled response type', header.value);
        }
      }
      if (header.name.toLowerCase() == "x-set-apple-store-front") {
        for(var i = 0; i < requestHeaders.length; i++) {
          if (requestHeaders[i].name == "X-Apple-Store-Front") {
            requestHeaders.splice(i,1);
            chrome.tabs.update(details.tabId, {url: "http://itunes.apple.com/"});
          }
        }
        requestHeaders.push({name:"X-Apple-Store-Front", value: header.value});
        localStorage.appleStoreFront = header.value;
      }
    })
  },
  {
    "urls": ["*://*.itunes.apple.com/*", "*://*.itunes.com/*"]
  },
  ["responseHeaders"]
);