var app = new window.spredfast.Poller();
var data = [];
var displayData = [];

window.setInterval(fetchCounts, 3000);

function fetchCounts() {
  console.log('fetching counts');
  
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
  console.log('data', data);
  $('#dataF').text(JSON.stringify(data['f']));
  $('#dataV').text(JSON.stringify(data['v']));
  
  displayData = [].concat(data['f'], data['v']).sort(function(x, y) { return y.count - x.count }).slice(0, 2);
  $('#master').text(JSON.stringify(displayData));


 
}