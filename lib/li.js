var $ = require('jquery');
var eventy = require('eventy');
var tpl = require('../tpl/li');

module.exports = function Li(index, data) {
  var el = $(tpl)[0];

  var li = function () {
    this.index = index;
    this.active = false;
    this.el = el;
    this.el.textContent = data;

    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('selected', {
      get: function () {
        return $(this.el).hasClass('selected') ? true : false;
      }
    });

    $(this.el).on('click', onClick);
    $(this.el).hover(onMouseenter, onMouseleave);
    $(document).on('keydown', onDocumentKeydown);
    return this;
  }.call(eventy({}));

  function onMouseenter(mouseenter) {
    li.active = true;
    li.trigger('mouseenter', mouseenter);
    li.trigger('hover', mouseenter);
  }

  function onMouseleave(mouseleave) {
    li.active = false;
    li.trigger('mouseleave', mouseleave);
  }

  function onClick(click) {
    li.toggleSelect();
    li.trigger('click', click);
  }

  function onDocumentKeydown(keydown) {
    if (!li.active) return;

    /*
      Hit enter
    */
    if (keydown.keyCode === 13) li.toggleSelect();
  }

  li.toggleSelect = function () {
    this.selected ? this.deselect() : this.select();
  }

  li.select = function () {
    $(this.el).addClass('selected');
    this.trigger('select');
  }

  li.deselect = function () {
    $(this.el).removeClass('selected');
    this.trigger('deselect');
  }

  li.destroy = function () {
    this.parentNode.removeChild(this.el);
    this.trigger('destroy');
  }

  return li;
}
