// 首先来建一个小鸟
function Bird(){
	base(this,LSprite,[]);
	var self = this;
	var bitmap = new LBitmap(new LBitmapData(imglist["bird1"]));
	self.addChild(bitmap);
}