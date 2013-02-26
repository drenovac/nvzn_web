Nvzn.WeeklyView = SC.View.extend(SC.ContentDisplay, {
  classNames: ["weekly-view"],

  weeksToShow: 2,

  displayProperties: ['weeksToShow'],

  render: function(ctx, firstTime) {
    var content = this.get('content') || [],
      weeks = this.get('weeksToShow'),
      date;

    ctx.push(
      "<table>",
        "<thead><tr>",
          "<th class='dashboard-header day'>Mon</th>",
          "<th class='dashboard-header day'>Tue</th>",
          "<th class='dashboard-header day'>Wed</th>",
          "<th class='dashboard-header day'>Thu</th>",
          "<th class='dashboard-header day'>Fri</th>",
          "<th class='dashboard-header day'>Sat</th>",
          "<th class='dashboard-header day'>Sun</th>",
        "</tr></thead>"
    );

    content.forEach(function(i, idx) {
      if (idx % 7 === 0) ctx.push("</tr><tr>");
      date = i.date;
      ctx.push("<td><span class='date'>"+date.get('day')+"</span>");

      ctx.push(Nvzn.TimeCard.fieldFormatter(i.timecards));
//      date.timecards.forEach(function(timecard) {
//        ctx.push("<div>"+ timecard +"</div>")
//      });

      ctx.push("</td>");
    });
    if (content.get('length') == 0) ctx.push("<br style='clear:both'>");

    ctx.push(
        "</tr>",
      "</table>"
    );
  }


});