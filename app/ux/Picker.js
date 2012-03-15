Ext.define('MyApp.ux.Picker', {
    
    extend: 'Ext.Picker',
    
    requires: ['MyApp.ux.PickerSlot'],
    
    config: {
        defaultType: 'mypickerslot',
        axis: 'y', // Defaults to vertical, here's the only addition to the config of the extended Picker class
        toolbar: {
            ui: 'light small'
        }
    },
    
    initialize: function() {
        this.callParent(arguments);
        
        // Additionally, we have to play with CSS a little to make the horizontal scrolling work.
        if (this.getAxis() === 'x') {
            this.bodyElement.addCls(Ext.baseCSSPrefix + 'scroll-horizontal');
        }
        
        this.floating = false;
    },
    
    initElement: function() {
        this.callParent(arguments);
        
        // This is some added sugar, adding a new child element to the bar in order to create the CSS pointing arrow
        this.bar.createChild({
            cls: Ext.baseCSSPrefix + 'picker-pointer'
        });
    }

});