sc_require('views/view');

Nvzn.mainPane = Nvzn.LayoutSurface.extend({
  layout: {top: 0, right:0, bottom: 0, left:0},
  childSurfaces:'sidebar calendar sidebarList page pageTable'.w(),
  clearBackground: true,

  sidebar: Nvzn.View.extend({
    layout:{ top: 0, left:0, bottom:0, width:210 },
    childLayers: "logo whereTitle".w(),
    clearBackground: true,
    _sc_backgroundColor: 'transparent',

    logo: Nvzn.Layer.extend({
      layout: {width: 200, height: 61, top: 10, left: 5 },
      render: function(ctx) {
        ctx.drawImage(Nvzn.images['logo'], 0, 0);
      }
    }),

    whereTitle: SC.LabelLayer.extend({
      layout: { top: 200, left: 20, right: 20, height: 24 },
      value: "Where",
      backgroundColor: 'transparent',
      isVisibleBinding: 'Nvzn.isSite'
    })

  }),

  calendar: SC.CalendarView.extend({
    layout: { top: 40, left: 10, width: 200, height: 200 },
    selectedDateBinding:'Nvzn.selectedDate'
  }),

  sidebarList: SC.ListView.extend({
    layout: { top: 220, left: 10, width: 210, bottom: 5},
    contentBinding: 'Nvzn.customersController.arrangedObjects',
    selectionBinding: 'Nvzn.customersController.selection',

    renderRow: function(context, width, height, index, object, isSelected) {
      if (isSelected) {
        context.fillStyle = '#B81237';
        context.fillRect(0, 0, width, height);
      }

      context.strokeStyle = 'grey';
      context.lineWidth = 1;

//      context.beginPath();
//      context.moveTo(0, height - 0.5);
//      context.lineTo(width, height - 0.5);
//      context.stroke();

      context.font = "12pt Helvetica";
      context.fillStyle = isSelected?'white':'black';
      context.textAlign = 'left';
      context.textBaseline = 'middle';

      context.fillText(String(object.toString()), 10, height/2);
    }

  }),

  page: Nvzn.View.extend({
    layout:{ left:194, top:4, bottom:4, right:4, minLayoutWidth:875 },
    childLayers: "border".w(),
    clearBackground: true,
    _sc_backgroundColor: 'transparent',

    border: Nvzn.Layer.extend({
      layout: { top: 0, right: 0, bottom: 0, left: 0 },

      render: function(ctx) {
        var pageWidth = ctx.width - 40;
        ctx.save();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur    = 20;
        ctx.shadowColor   = 'rgba(0, 0, 0, 0.6)';
        ctx.fillStyle     = '#fff';
        ctx.fillRect(25, 5, pageWidth, ctx.height - 20);
        ctx.restore();

        var paperWidth = pageWidth < 2000 ? pageWidth : 2000;
        ctx.drawImage(Nvzn.images['paper1'], 0, 0, paperWidth, 50, 25, 5, paperWidth, 50);
        ctx.drawImage(Nvzn.images['paper2'], pageWidth - 110, 17)
      }
    })

  }),

  pageTable: SC.TableView.extend({
    layout: { left: 225, top: 100, right: 30, bottom: 30 },
    clearBackground: true,
    _sc_backgroundColor: 'transparent',
    columns:[
      {
        title:"Employee",
        classNames:'name',
        key:'fullName'
      },
      {
        title:"Mon",
        classNames:'day mon',
        key:1,
        isEditable: YES
      },
      {
        title:"Tue",
        classNames:'day tue',
        key:2
      },
      {
        title:"Wed",
        classNames:'day wed',
        key:3
      },
      {
        title:"Thu",
        classNames:'day thu',
        key:4
      },
      {
        title:"Fri",
        classNames:'day fri',
        key:5
      },
      {
        title:"Sat",
        classNames:'day sat',
        key:6
      },
      {
        title:"Sun",
        classNames:'day sun',
        key:0
      }
    ].map(function (hash) {
      return SC.TableColumn.create(hash);
    }),

    contentBinding:'Nvzn.employeesController.arrangedObjects',
    selectedBinding: 'Nvzn.selectedRecord'
  })

});