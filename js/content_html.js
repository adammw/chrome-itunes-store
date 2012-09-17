var unsafeWindow = (function() {
	var el = document.createElement('p');
	el.setAttribute('onclick', 'return window;');
	return el.onclick();
}());

var iTunes = unsafeWindow.iTunes = {
	_proxyEvent: function proxyEvent(orig) {
	    window.dispatchEvent(new Event(orig.type));
	},
	get currentTime() {
		return (iTunes.currentPlayingTrack) ? iTunes.currentPlayingTrack.currentTime : 0;
	},
	addProtocol: function(protocol) {
		//TODO - this is the data for the menu
	},
	getUserDSID: function() {
	    return localStorage.userDSID;
	},
	getPreferences: function() {
		try {
			return JSON.parse(localStorage.preferences);
	    } catch(e){
	    	return {};
	    }
	},
	playURL: function(track) {
	    if (iTunes.currentPlayingTrack) {
	        iTunes.currentPlayingTrack.removeEventListener('play', iTunes._proxyEvent);
	        iTunes.currentPlayingTrack.removeEventListener('pause', iTunes._proxyEvent);
	        iTunes.currentPlayingTrack.removeEventListener('ended', iTunes._proxyEvent);
	        iTunes.currentPlayingTrack.removeEventListener('timeupdate', iTunes._proxyEvent);
	        if (!(iTunes.currentPlayingTrack.paused || iTunes.currentPlayingTrack.ended)) iTunes.currentPlayingTrack.stop();
	    }
	    iTunes.currentPlayingTrack = new Audio(track.url);
	    iTunes.currentPlayingTrack.addEventListener('play', iTunes._proxyEvent, false);
	    iTunes.currentPlayingTrack.addEventListener('pause', iTunes._proxyEvent, false);
	    iTunes.currentPlayingTrack.addEventListener('ended', iTunes._proxyEvent, false);
	    iTunes.currentPlayingTrack.addEventListener('timeupdate', iTunes._proxyEvent, false);
	    iTunes.currentPlayingTrack.play();
	    return ++iTunes.previewId;
	},
	stop: function() {
	    if (iTunes.currentPlayingTrack) iTunes.currentPlayingTrack.stop();
	}
};

var s = document.createElement('script');
	s.src = chrome.extension.getURL('js/fixes.js');
	s.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);