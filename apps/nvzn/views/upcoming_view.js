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

  contentDisplayProperties: ['length', 'timeCards', 'employees'],

  lengthDidChange: function() {
//    console.log('upcomingView length did change', this.get('length'));
  }.observes('length'),

  classNames: 'upcoming-view'.w(),

  startDate: function() {
    var now = SC.DateTime.parse("2010-09-27", "%Y-%m-%d"),
        start;
    if (now.get('dayOfWeek') === 1) { // if we are a monday, then start now.
      start = now;
    } else {
      start = now.get('lastMonday'); // else get the last monday past
    }
    return start;
  },

  daysToShow: 7,

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
        daysToShow = this.get('daysToShow'),
        id = employee.get('storeKey');

    employee.get('timeCards').forEach(function(timeCard) {
      day = timeCard.get('dateString');
      cards = timecardsByDay[day];
      if (!cards) timecardsByDay[day] = cards = [];
      cards.push(timeCard);
//        el.append('<div>'+ timeCard.get('timeDisplay') +'</div>');
    });

    ctx.push(
      "<tr>",
      "<td>", employee.get('fullName'),"</td>"
    );
    while (days < daysToShow) {
      showing = start.advance({day: days});
      day = showing.toFormattedString("%Y-%m-%d");

//      if (days == 7) ctx.push("</tr><tr>");
      ctx.push(
        "<td>",
//        '<span class="date">', showing.get('day'), '</span>',
        "<div id='", day,'-',id, "' class='day'>");
      cards = timecardsByDay[day];
      if (cards) {
        cards.forEach(function(timeCard){
          ctx.push('<div>'+timeCard.get('timeDisplay')
//            +" - "+timeCard.get('customer')
            +'</div>')
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

  renderTimeCards: function(ctx, timecards) {
    var tcByCustomerDate = {},
        customer, date,
        self = this;

    timecards.forEach(function(tc) {
      customer = tc.get('customer');
      date = tc.get('date');
      if (!tcByCustomerDate[customer]) tcByCustomerDate[customer] = {};
      if (!tcByCustomerDate[customer][date]) tcByCustomerDate[customer][date] = [];
      tcByCustomerDate[customer][date].push(tc);
    })

    for (customer in tcByCustomerDate) {
      if (tcByCustomerDate.hasOwnProperty(customer)) {
        self.renderCustomerRow(ctx, customer, tcByCustomerDate[customer]);
      }
    }
  },

  renderCustomerRow: function(ctx, customer, tcByDate) {
    var start = this.startDate(), days = 0, day,
        daysToShow = this.get('daysToShow');
    ctx.push("<tr><td>", customer,"</td>");
    while (days < daysToShow) {
      showing = start.advance({day: days});
      day = showing.toFormattedString("%Y-%m-%d");

      ctx.push(
        "<td>",
//        '<span class="date">', showing.get('day'), '</span>',
        "<div id='", day,'-',customer, "' class='day'>");
      cards = tcByDate[day];
      if (cards) {
        cards.forEach(function(timeCard){
          ctx.push('<div>'+timeCard.get('timeDisplay')
//            +" - "+timeCard.get('customer')
            +'</div>')
        });
      }
      ctx.push("</div></td>");

      days++;
    }
    ctx.push("</tr>");
  },

  update: function(ctx) {
//    console.log('update!');
    var content = this.get('content') || [],
        date, cards, self = this, ret = [];
    var d = SC.$('tbody').empty();
    
    if (content.isCustomerController) {
      console.log('rendering Site');
      content.get('employees').forEach(function(employee) {
//        console.log('Rendering Employee', employee.get('fullName'));
        self.renderEmployeeRow(ret, employee);
      });
    } else if(SC.instanceOf(content, Nvzn.Employee)) {
//      console.log('rendering Employee');
     self.renderTimeCards(ret, content.get('timeCards'));
    } else {
//      console.log('No Renderable Content');
//      debugger;
    }

    d.append(ret.join(''));
  }

});
