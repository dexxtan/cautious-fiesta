function checkURIs(uri1, uri2) {
  var decodedURI1 = breakDownURI(uri1);
  var decodedURI2 = breakDownURI(uri2);

  return decodedURI1 === decodedURI2;
}

function breakDownURI(uri) {
  var splitResult;
  var uriDetails = {};
  uri = decodeURI(uri);

  splitResult = uri.split('://');
  uriDetails.scheme = splitResult.shift().toLowerCase();

  splitResult = splitResult.join('://').split('@');
  splitResult.length > 1 && breakDownAuth.call(uriDetails, splitResult.shift());

  splitResult = splitResult.join('@').split('/');
  splitResult.length > 1 && breakDownHostName.call(uriDetails, splitResult.shift());

  splitResult = splitResult.join('/').split('?');
  breakDownPath.call(uriDetails, splitResult.shift());
  breakDownQueryString.call(uriDetails, splitResult.shift());

  return uriDetails.scheme + '://' + uriDetails.userName + ':' + uriDetails.password +
      '@' + uriDetails.hostName + ':' + uriDetails.port + '/' + uriDetails.path +
      '?' + uriDetails.queryParams;
}

function breakDownAuth(string) {
  var authParams = string.split(':');
  if (authParams.length > 1) {
    this.userName = authParams[0];
    this.password = authParams[1];
  }
  return;
}

function breakDownHostName(string) {
  var hostNameParams = string.split(':');
  this.hostName = hostNameParams[0].toLowerCase();
  this.port = hostNameParams[1] || 80;
  return;
}

function breakDownPath(string) {
  var pathItems = string.split('/');
  var pathStack = [];
  for (var i = 0; i < pathItems.length; i++) {
    if (pathItems[i] === '..') {
      pathStack.pop();
    } else if (pathItems[i] === '.') {
      continue;
    } else {
      pathStack.push(pathItems[i]);
    }
  }
  this.path = pathStack.join('/');
  return;
}

function breakDownQueryString(string) {
  if (typeof string === 'string') {
    var queryParams = string.split('&');
    var currentQuerySplit;
    var queryHash = {};
    for (var i = 0; i < queryParams.length; i++) {
      currentQuerySplit = queryParams[i].split('=');
      queryHash[currentQuerySplit[0]] = currentQuerySplit[1];
    }
    var queryArray = [];
    for (var i in queryHash) {
      queryArray.push(i + '=' + queryHash[i]);
    }
    queryArray.sort();
    this.queryParams = queryArray.join('&');
  }
  return;
}