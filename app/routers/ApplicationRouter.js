module.exports = App.ApplicationRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  constructor: function(options) {
    Backbone.Router.call(this, options);
    for (var i in this.routes) {
      this[this.routes[i]] = function() {};
    }
  }
});
