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
    .ready(function() {
      success();
    });
  });
}

Promise.all([
  // first ajax request
  $.ajax({
    url: appvars.server,
    method: 'get'
  }),
  // partial
  promisifyPartial({ name: 'partial', file: '/templates/partial.hbs' }),
  // Document Ready?
  promiseToLoad()
]).then(function(datas) {
  pageLoaded(data[0]);
});

Handlebars.registerHelper('compare', function(val1, val2, options) {
  if (val1 == val2) return options.fn(this);
  else return options.inverse(this);
});
