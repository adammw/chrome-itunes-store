Audio.prototype.stop = function() {
	if (this.readyState == this.HAVE_NOTHING) return;
    this.pause();
	this.currentTime = 0;
}