// ==========================================================================
// Project:   Nvzn.TimeInfoView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Nvzn.InfoView = SC.View.extend(SC.ContentDisplay,
/** @scope Nvzn.TimeInfoView.prototype */ {

  classNames: "info".w(),

  content: null,

  displayProperties: "contentType".w(),
  contentDisplayProperties: "storeKey".w(),

  render: function(ctx, firstTime) {
    var content = this.get('content');

    if (!content || !content.get('storeKey')) {
      ctx.push("<div id='info'>Please Select an item from above</div>");
    } else if (SC.instanceOf(content.content, Nvzn.Employee)) {
      this.renderEmployee(ctx, firstTime, content);
    } else if (SC.instanceOf(content.content, Nvzn.TimeCard)) {
      var record = content.get('_parentRecord');
      this.renderEmployee(ctx, firstTime, record);
    } else {
      console.log("Found unknown type");
    }
  },

  renderEmployee: function(ctx, firstTime, content) {
    var photo = content.get('photoPath'),
        cn = content.get('contactNumbers'), contact = "";

    if (cn[0] && !SC.empty(cn[0].trim())) contact += "<li><label>Email</label>"+cn[0]+"</li>";
    if (cn[1] && !SC.empty(cn[1].trim())) contact += "<li><label>Phone 1</label>"+cn[1]+"</li>";
    if (cn[2] && !SC.empty(cn[2].trim())) contact += "<li><label>Phone 2</label>"+cn[2]+"</li>";
    if (cn[3] && !SC.empty(cn[3].trim())) contact += "<li><label>Phone 3</label>"+cn[3]+"</li>";

    if (photo) ctx.push("<img src='",photo,"'>");
    ctx.push(
      "<ul>",
        "<li><label>Name</label>",content.get('fullName'),"</li>",
        contact,
        "<li><label>Address</label>",content.get('address'),"</li>",
      "</ul>"
    );
  }

//  childViews: null,

//  createChildViews: function() {
//    var contentType = this.get('contentType');
//    if (contentType === 'site') {
//      this.set('childViews', "name phones address photo".w());
//    } else {
//      this.set('childViews', "name phones address photo".w());
//    }
//    sc_super();
//  },
//
//  name: SC.LabelView.extend({
//    isVisibleBinding: SC.Binding.isNull('.owner.storeKey').not(),
//    valueBinding: SC.Binding.oneWay('.owner*content.fullName')
//  }),
//  phones: SC.LabelView.extend({
//    isVisibleBinding: SC.Binding.isNull('.owner.storeKey').not(),
//    valueBinding: SC.Binding.oneWay('.owner*content.contactNumbers').transform(function(value) {
//      return value ? value.join(", ") : "";
//    })
//  }),
//  address: SC.LabelView.extend({
//    isVisibleBinding: SC.Binding.isNull('.owner.storeKey').not(),
//    valueBinding: SC.Binding.oneWay('.owner*content.address')
//  }),
//  photo: SC.ImageView.extend({
//    isVisibleBinding: SC.Binding.isNull('.owner.storeKey').not(),
//    valueBinding: SC.Binding.oneWay('.owner*content.photoPath')
//  })

});
