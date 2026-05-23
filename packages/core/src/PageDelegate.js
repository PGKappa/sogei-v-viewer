function PageDelegate({pageId,	onTime,	onUnmount, prerenderer}) {
	
}

PageDelegate.prototype.render = function() {
	this.renderer();
	rendered = true;
}

PageDelegate.prototype.prerender = function() {
	if  (prerenderer)
		prerenderer();
		this.rendered = true;
}

PageDelegate.prototype.show = function() {
	document.body.classList.show(this.pageId);
	this.visible = true;
}

PageDelegate.prototype.hide = function() {
	document.body.classList.remove(this.pageId);
	this.visible = false;
}

PageDelegate.prototype.unmount = function() {
	this.hide();
	rendered = false;
}
