var app = new window.spredfast.Poller();

var data = [];
var displayData = [];
var produceList = $('.produce-list');

function fetchCounts() {
  
  // Poll veggies
  app.poll().then(function(payload) {
    data['v'] = payload;
    updateData('v', payload);
  });

  // Poll fruits
  app.poll({type: 'fruits'}).then(function(payload) {
    data['f'] = payload;
    updateData('f', payload);
  });
}

function updateData(type, payload) {

  // Merge and sort lists
  displayData = [].concat(data['f'], data['v']).sort(function(x, y) { return y.count - x.count }).slice(0, 5);

  // Clear and repopulate produce list
  produceList.empty();

  $.each(displayData, function(item) {
    var li = $('<li/>')
      .html(displayData[item].name)
      .addClass('produce-list__item')
      .appendTo(produceList);
    $('<div/>')
      .html("<strong>" + displayData[item].count + '</strong> <small>mentions</small>')
      .appendTo(li);
  });
}

fetchCounts();
window.setInterval(fetchCounts, 15000);