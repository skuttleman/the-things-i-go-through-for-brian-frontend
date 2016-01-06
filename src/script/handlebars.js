var appvars = {
  server: 'http://localhost:8000/'
};

function promisifyPartial(partial) {
  return new Promise(function(success, failure) {
    $.get(partial.file).done(function(text) {
      Handlebars.registerPartial(partial.name, text);
      success(true);
    }).fail(function(err) {
      failure(err);
    });
  });
}

function promiseToLoad() {
  return new Promise(function(success) {
    $(document).ready(function() {
      success();
    });
  });
}

Promise.all([
  // first ajax request
  $.ajax({
    url: appvars.server + 'broncos',
    method: 'get'
  }),
  // partial
  promisifyPartial({ name: 'header', file: '/templates/header.hbs' }),
  promisifyPartial({ name: 'broncos', file: '/templates/broncos.hbs' }),
  promisifyPartial({ name: 'loginform', file: '/templates/login-form.hbs' }),
  promisifyPartial({ name: 'playerform', file: '/templates/player-form.hbs' }),
  // Document Ready?
  promiseToLoad()
]).then(function(datas) {
  pageLoaded(datas[0]);
});

Handlebars.registerHelper('compare', function(val1, val2, options) {
  if (val1 == val2) return options.fn(this);
  else return options.inverse(this);
});

function displayTemplate(selector, partial, data) {
  var signedIn = !!decodeURIComponent(document.cookie).split('user=s:')[1];
  var template = Handlebars.compile(Handlebars.partials[partial]);
  data.signedIn = signedIn;
  $(selector).html(template(data));
}
