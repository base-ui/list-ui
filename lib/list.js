var $ = require('jquery');
var Li = require('./li');
var tpl = require('../tpl/list');

module.exports = function List(dataArray) {
  var el = $(tpl)[0];
  var items = [];

  var list = function () {
    this.el = el;

    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('multiple', {
      get: function () {
        return $(el).hasClass('multiple') ? true : false;
      },

      set: function (value) {
        if (value === this.multiple) return;
        if (value === true) $(el).addClass('multiple');
        if (value === false) $(el).removeClass('multiple');
      }
    });

    this.property('width', {
      get: function () {
        return el.offsetWidth;
      }
    });

    this.property('height', {
      get: function () {
        return el.offsetHeight;
      }
    });

    return this;
  }.call(el);

  dataArray.forEach(function (data, index) {
    var li = new Li(index, data);

    items.push(li)
    append(li);

    li.on('select', function () {
      if (list.multiple) return;

      items.forEach(function (item, index) {
        if (item === li) return;
        item.deselect();
      });
    });

    li.on('destroy', function () {
      items.forEach(function (item, index) {
        if (item === li) items.splice(index, 1);
      });
    });
  });

  function append(li) {
    return el.appendChild(li.el);
  }

  function prepend(li) {
    return el.insertBefore(li.el, el.firstChild);
  }

  list.item = function (index) {
    return items[index];
  }

  list.appendTo = function (parentNode) {
    $(this.el).appendTo(parentNode);
    return this;
  }

  list.prependTo = function (parentNode) {
    $(this.el).prependTo(parentNode);
    return this;
  }

  return list;
}
