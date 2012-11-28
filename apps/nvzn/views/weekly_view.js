Nvzn.WeeklyView = SC.View.extend({
  classNames: ["weekly-view"],

  weeksToShow: 2,

  displayProperties: ['content', '[]', 'weeksToShow'],

  render: function(ctx, firstTime) {
    var content = this.get('content') || [],
      weeks = this.get('weeksToShow'),
      date;

    ctx.push(
      "<table style='width:100%'>",
        "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>"
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

    ctx.push(
        "</tr>",
      "</table>"
    );
  }


});