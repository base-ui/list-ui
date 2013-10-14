var $ = require('jquery');
var Li = require('./li');
var tpl = require('../tpl/list');

module.exports = function List(data) {
  var el = $(tpl)[0];

  var list = function () {
    for (var index in data) {
      append(new Li(index, data[index]));
    }

    return this;
  }.call(el);

  function append(li) {
    return el.appendChild(li.el);
  }

  function prepend(li) {
    return el.insertBefore(li.el, el.firstChild);
  }

  return list;
}
