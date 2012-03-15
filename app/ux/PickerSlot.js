Ext.define('MyApp.ux.PickerSlot', {

    extend: 'Ext.picker.Slot',

    xtype: 'mypickerslot',

    config: {
        // This is all customization code to adjust the slider easing behavior...
        scrollable: {
            direction: 'vertical', // ...However observe THIS configuration property along the extended class below
            indicators: false,
            snapEasing: {
                duration: 250,
                exponent: 3
            },
            momentumEasing: {
                momentum: {
                    acceleration: 25,
                    friction: 1
                },

                bounce: {
                    acceleration: 25,
                    springTension: 0.3
                },

                minVelocity: 0.9
            }
        }
    },

    initialize: function() {
        this.callParent(arguments);
        
        // Don't do anything unless we passed the configuration option for horizontal scrolling
        if (this.getScrollable().getScroller().getDirection() !== 'horizontal') {
            return;
        }
        
        // Self-explanatory (if you look at the source ST2 provides).
        var mixin = {
            // @private
            setupBar: function() {
                if (!this.rendered) {
                    // if the component isn't rendered yet, there's no point in calculating the padding just yet.
                    return;
                }

                var element = this.element,
                    innerElement = this.innerElement,
                    picker = this.getPicker(),
                    bar = picker.bar,
                    value = this.getValue(),
                    scrollable = this.getScrollable(),
                    scroller = scrollable.getScroller(),
                    barX, elX, barWidth, padding, titleHeight;

                barX = bar.getX();
                elX = element.getX();

                padding = Math.abs(elX - barX);
                this.slotPadding = padding;

                innerElement.setStyle({
                    padding: '0 ' + padding + 'px'
                });

                barWidth = bar.getWidth();
                scroller.refresh();
                scroller.setSnap(barWidth);

                this.setValue(value);
            },
            
            // @private
            onScrollEnd: function(scroller, position) {
                var picker = this.picker,
                    bar = picker.bar,
                    barWidth = bar.getWidth(),
                    offset = position.x,
                    index = Math.round(offset / barWidth),
                    viewItems = this.getViewItems(),
                    item = viewItems[index];

                if (item) {
                    this.selectedIndex = index;
                    this.selectedNode = item;

                    this.fireEvent('slotpick', this.getValue(), this.selectedNode);
                }
            },
            
            scrollToItem: function(item, animated) {
                var x = item.getX(),
                    parentEl = item.parent(),
                    parentX = parentEl.getX(),

                    scrollView = this.getScrollable(),
                    scroller = scrollView.getScroller(),
                    difference;

                difference = x - parentX;
                if (animated) {
                    scroller.scrollToAnimated(difference, 0);
                } else {
                    scroller.scrollTo(difference, 0);
                }
            }
        };
        
        // Apply the changes overriding the methods in the prototype with the ones in the mixin we defined above
        Ext.apply(this, mixin);
    }

});