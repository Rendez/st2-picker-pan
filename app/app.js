Ext.Loader.setConfig({
    enabled: true,
    paths: {
        MyApp: 'app'
    }
});

Ext.require(['MyApp.ux.Picker', 'Ext.TitleBar']);

Ext.application({
    name: 'MyApp',
    
    launch: function() {
      var picker = Ext.create('MyApp.ux.Picker', {
          axis: 'x', // Here's the kicker...
          doneButton: 'I\'m done!',
          cancelButton: false,
          height: 300,
          slots: [
              {
                  scrollable: {
                      direction: 'horizontal' // ... And here
                  },
                  name : 'limit_speed',
                  title: 'Speed',
                  data : [
                      {text: '50 KB/s', value: 50},
                      {text: '100 KB/s', value: 100},
                      {text: '200 KB/s', value: 200},
                      {text: '300 KB/s', value: 300},
                      {text: '400 KB/s', value: 400},
                      {text: '500 KB/s', value: 500},
                      {text: '600 KB/s', value: 600},
                      {text: '700 KB/s', value: 700},
                      {text: '800 KB/s', value: 800},
                      {text: '900 KB/s', value: 900}
                  ],
                  listeners: {
                      slotpick: function(value) {
                          // This is for your senses...
                          console.log(value);
                      }
                  }
              }
          ]
      });
      
      picker.on('change', function() {
          alert('Now go build something great!');
      });
      
      Ext.Viewport.add(picker);
    }
});
