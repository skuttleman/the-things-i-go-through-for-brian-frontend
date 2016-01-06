function login(event) {
  if (event) event.preventDefault();
  displayTemplate('main', 'loginform', {
    postMethod: 'loginPost',
    postText: 'Log In',
    switchMethod: 'signup',
    switchText: 'Sign Up'
  });
}

function loginPost(event) {
  if (event) event.preventDefault();
  var formData = createFormData('form');
  $.ajax({
    url: appvars.server + 'login',
    method:'post',
    data: formData,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    listData();
    displayHeader();
  }).fail(function(data) {
    console.error(data);
  });
}

function signup(event) {
  if (event) event.preventDefault();
  displayTemplate('main', 'loginform', {
    postMethod: 'signupPost',
    postText: 'Sign Up',
    switchMethod: 'login',
    switchText: 'Log In'
  });
}

function signupPost(event) {
  if (event) event.preventDefault();
  var formData = createFormData('form');
  $.ajax({
    url: appvars.server + 'signup',
    method:'post',
    data: formData,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    listData();
  }).fail(function(data) {
    console.error(data);
  });
}

function logout(event) {
  if (event) event.preventDefault();
  $.ajax({
    url: appvars.server + 'logout',
    method:'post',
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    displayHeader();
    listData();
  }).fail(function(data) {
    console.error(data);
  });
}

function createFormData(selector) {
  return Array.prototype.reduce.call($(selector).children(), function(formData, element) {
    if (element.tagName == 'INPUT') {
      formData[element.name] = element.value;
    }
    return formData;
  }, {});
}
