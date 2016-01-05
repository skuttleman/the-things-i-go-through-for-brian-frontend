function pageLoaded(data) {
  var template = Handlebars.compile(Handlebars.partials.partial);
  data.broncos.forEach(function(bronco) {
    bronco.heightString = String(Math.floor(bronco.height / 12)) + '\'' + String(bronco.height % 12) + '\'\'';
  });
  $('main').html(template({ broncos: data.broncos }));
}
