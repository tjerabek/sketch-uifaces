function get(url) {
  var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
  return response;
}

function setImage(layer, image) {
  var fill = layer.style().fills().firstObject();
  fill.setFillType(4);
  fill.setPatternFillType(1);
  var imageData = MSImageData.alloc().initWithImage_convertColorSpace(image, false)
  fill.setImage(imageData);
  return fill;
}

function onRun(context) {
  var selection = context.selection;
  var url = 'https://uifaces.co/api?category=twitter&random&limit=' + selection.count();

  var res = get(url);
  var json = JSON.parse(NSString.alloc().initWithData_encoding(res, NSUTF8StringEncoding));

  if (json) {
	  for (var i=0; i < selection.count(); i++) {
	    var image_url = json[i].photo;
	    var image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(image_url));        
	    var layer = selection[i];
	    setImage(layer, image);
	  }
  }
};
