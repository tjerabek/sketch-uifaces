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
  var url = 'http://uifaces.com/api/v1/random'

  var selection = context.selection;

  for (var i=0; i<selection.count(); i++) {
      var res = get(url);
      var json = JSON.parse(NSString.alloc().initWithData_encoding(res, NSUTF8StringEncoding));
    
      if (json) {
          var image_url = json.image_urls.epic;
          var image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(image_url));        
          var layer = selection[i];
          setImage(layer, image);
      }
  }
};

