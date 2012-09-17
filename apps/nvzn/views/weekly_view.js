Nvzn.WeeklyView = SC.View.extend({

  weeksToShow: 2,

  displayProperties: ['content', 'weeksToShow'],

  render: function(ctx, firstTime) {
    var content = this.get('content') || [],
      weeks = this.get('weeksToShow');

    ctx.push(
      "<table style='width:100%'>",
        "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>",
        "<tr>"
    );

    content.forEach(function(i) {
      ctx.push("<td>",i,"</td>");
    })

    ctx.push(
        "</tr>",
      "</table>"
    );
  }


});