importScripts("plist_parser.js")
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://ax.init.itunes.apple.com/bag.xml?ix=4", true);
xhr.responseType = 'document';
xhr.onload = function() {
	var data = PlistParser.parse(xhr.responseXML);
	worker.webkitPostMessage(data, [data]);
}
xhr.send();