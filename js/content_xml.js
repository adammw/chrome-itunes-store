var document = window.document.getElementById('webkit-xml-viewer-source-xml') || window.document;
var plist = PlistParser.parse(document);
if (plist instanceof Array) {
	for (var i = 0; i < plist.length; i++) {
		if (plist[i]) {
			plist = plist[i];
			break;
		}
	}
}
// console.log("Parsed plist as object:", plist);
if (plist.dialog) {
	if (plist.dialog.kind == "authorization") {
		location.href = chrome.extension.getURL("authenticate.html") + "#" + JSON.stringify(plist.dialog);
	} else {
		alert(plist.dialog.message + "\n\n" + plist.dialog.explanation)
	}
}
if (plist.action) {
	switch( plist.action.kind ) {
		case 'Goto':
			location.href = plist.action.url;
			break;
		default:
			console.warn('Unknown action kind', plist.action.kind);
	}
}