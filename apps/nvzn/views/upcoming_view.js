// ==========================================================================
// Project:   Nvzn.UpcomingView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Nvzn */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Nvzn.UpcomingView = SC.View.extend(SC.ContentDisplay,
/** @scope Nvzn.UpcomingView.prototype */ {

  contentDisplayProperties: ['length', 'timeCards'],

  lengthDidChange: function() {
    console.log('upcomingView length did change', this.get('length'));
  }.observes('length'),

  classNames: 'upcoming-view'.w(),

  startDate: function() {
    var now = SC.DateTime.parse("2011-02-14", "%Y-%m-%d"),
        start;
    if (now.get('dayOfWeek') === 1) { // if we are a monday, then start now.
      start = now;
    } else {
      start = now.get('lastMonday'); // else get the last monday past
    }
    return start;
  },

  render: function(ctx) {
    ctx.push(
    "<table id='cal'>",
      "<thead>",
        "<th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>",
      "</thead>",
      "<tbody>",
      "</tbody>",
    "</table>"
    );
    this.update(ctx);
  },

  renderEmployeeRow: function(ctx, employee) {
    var start = this.startDate(), days = 0, day,
        timecardsByDay = {}, cards,
        id = employee.get('storeKey');

    employee.get('timeCards').forEach(function(timeCard) {
      day = timeCard.get('dateObject').toFormattedString("%Y-%m-%d");
      cards = timecardsByDay[day];
      if (!cards) timecardsByDay[day] = cards = [];
      cards.push(timeCard);
//        el.append('<div>'+ timeCard.get('timeDisplay') +'</div>');
    });

    ctx.push(
      "<tr>",
      "<td>", employee.get('fullName'),"</td>"
    );
    while (days < 7) {
      showing = start.advance({day: days});
      day = showing.toFormattedString("%Y-%m-%d");

//      if (days == 7) ctx.push("</tr><tr>");
      ctx.push(
        "<td>",
        '<span class="date">', showing.get('day'), '</span>',
        "<div id='", day,'-',id, "' class='day'>");
      cards = timecardsByDay[day];
      if (cards) {
        cards.forEach(function(timeCard){
          ctx.push('<div>'+timeCard.get('timeDisplay')+" - "+timeCard.get('customer')+'</div>')
        });
      }
      ctx.push(
        "</div>",
        "</td>"
      );

      days++;
    }
    ctx.push("</tr>");



  },

  update: function(ctx) {
    console.log('update!');
    var content = this.get('content') || [],
        date, cards, self = this, ret = [];
    var d = SC.$('tbody').empty();

    content.forEach(function(employee) {
      console.log('Rendering Employee', employee.get('fullName'));
      self.renderEmployeeRow(ret, employee);
    });

    d.append(ret.join(''));
//    debugger;
  }

});
