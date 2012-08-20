Nvzn.mainPage = SC.Page.create({

  tabView: SC.outlet('mainPane.pageView.mainView.contentView.tabView'),

    mainPane:SC.MainPane.design({
      calendar: SC.outlet('sidebarView.calendarView.calendarView'),
      tabView: SC.outlet('pageView.mainView.contentView.tabView'),
      childViews:'sidebarView pageView'.w(),

      pageView:SC.View.extend({
        classNames:'page'.w(),

        layout:{
          left:194, top:4, bottom:4, right:4,

          minWidth:875
        },

        childViews:'shadowView mainView'.w(),

        shadowView:SC.View.extend({
          classNames:'page-shadow'.w(),
          render:function (context) {
            context.begin('div').addClass('top-left').end();
            context.begin('div').addClass('top').end();
            context.begin('div').addClass('top-right').end();
            context.begin('div').addClass('left').end();
            context.begin('div').addClass('right').end();
            context.begin('div').addClass('bottom-left').end();
            context.begin('div').addClass('bottom').end();
            context.begin('div').addClass('bottom-right').end();
          }
        }),

        mainView:SC.View.extend({
          classNames:'main'.w(),
          layout:{ top:9, left:17, right:12, bottom:9 },

          childViews:'headerView contentView footerView'.w(),

          //// HEADER
          headerView:SC.View.extend({
            classNames:'page-header'.w(),
            layout:{
              height:100
            },
            childViews:'nameLabel nameView dateLabel dateView contactLabel contactView greetingLabel logoutButton'.w(),
            nameLabel:SC.View.extend({
              classNames:'label project'.w(),
              isVisibleBinding:SC.Binding.from('Nvzn.isSite'),
              layout:{
                top:35, left:40, width:110, height:18},
              render:function (context, firstTime) {
                return context.text('Name:');
              }
            }),
            nameView:SC.View.extend(SC.ContentDisplay, {
              classNames:'header-name'.w(),
              displayProperties:'content'.w(),
              contentDisplayProperties:'displayName'.w(),
              layout:{
                top:29, left:153, width:300, height:31
              },
              contentBinding:'Nvzn.selectedRecord',
              render:function (context) {
                return context.text(this.getPath('content.displayName'));
              }
            }),
            dateLabel:SC.View.extend({
              classNames:'label date'.w(),
              layout:{
                top:35, left:394, width:90, height:18},
              render:function (context, firstTime) {
                return context.text('Week Ending:');
              }
            }),
            dateView:SC.View.extend({
              classNames:'date-value'.w(),
              displayProperties:'content'.w(),
              layout:{
                top:29, left:496, width:300, height:31
              },
              contentBinding:'Nvzn.weekEnding',
              render:function (context) {
                var content = this.getPath('content');
                var display = content ? content.toFormattedString('%A, %d %B %Y') : "";
                return context.text(display);
              }
            }),
            contactLabel:SC.View.extend({
              classNames:'label contact'.w(),
              isVisibleBinding:SC.Binding.from('Nvzn.isSite'),
              layout:{
                top:70, left:10, width:110, height:18},
              render:function (context, firstTime) {
                return context.text('Contact Details:');
              }
            }),
            contactView: SC.View.extend({
              classNames: 'header-contact'.w(),
              layout: { top: 66, left: 130, right: 20, height: 24 },
              displayProperties: 'content'.w(),
              contentDisplayProperties: 'contactNumbers'.w(),
              contentBinding: 'Nvzn.selectedRecord',
              render: function(context) {
                var numbers = this.getPath('content.contactNumbers');
                return context.text(numbers ? numbers.without(" ").join(", ") : "");
              }
            }),
            greetingLabel: SC.LabelView.extend({
              layout: {right: 100, width: 300, height:24, top:23},
              textAlign: SC.ALIGN_RIGHT,
              valueBinding: SC.Binding.from('Nvzn.loginController.fullName')
                .transform(function(value) {
                  return "You are logged in as: "+value;
                })
            }),
            logoutButton: SC.ButtonView.extend({
              classNames: 'header-logout'.w(),
              layout: {
                right: 10,
                top: 20,
                width: 80,
                height: 24
              },
              title: 'Logout',
              target: Nvzn.statechart,
              action: 'logout'
            })
          }),

          // END HEADER

          // TAB VIEW

          contentView:SC.View.extend({
            childViews:'tabView'.w(),
            layout:{
              top:105
            },

            tabView:SC.TabView.extend({
              items:[],
              nowShowing:'all',
              itemTitleKey:'title',
              itemValueKey:'value',
              tabLocation:SC.BOTTOM_LOCATION,

              nowShowingDidChange:function () {
                Nvzn.statechart.sendEvent('tabDidChange');
              }.observes('nowShowing'),

              createChildViews:function () {
                sc_super();

                // fix the hardcoded layout

                this.containerView.adjust({border:0, bottom:44});
                this.segmentedView.adjust({height:44});

                var indicator = this.createChildView(SC.View.extend({
                  classNames:['indicator'],
                  layout:{
                    left:0,
                    width:20,
                    height:12,
                    bottom:32
                  }
                }));

                this.set('indicatorView', indicator);
                this.appendChild(indicator);
              },

              didAppendToDocument:function () {
                // fix the hard coded text-align
                this.segmentedView.$().css('textAlign', 'left');
                this._animateIndicator();
              },

              _animateIndicator:function () {
                // get the current tab button and use its frame to animate the arrow
                var nowShowing = this.get('nowShowing'),
                  tab = this.segmentedView.get('childViews').toArray().find(function (v) {
                    return v.get('value') == nowShowing;
                  });
                if (tab) {
                var frame = tab.get('frame'),
                  newLeft = frame ? frame.x + (frame.width / 2) - 10 : 50;

                this.indicatorView.animate('left', newLeft, {duration:0.3, timing:'ease'});
                }
              }.observes('nowShowing')
            })
          }),

          footerView:SC.View.extend({
          childViews:'approveButton'.w(),

          layout:{
            bottom:0,
            right:0,
            width:320,
            height:44
          },

          saveButton:SC.ButtonView.extend({
            layout:{
              centerY:0,
              right:140,
              height:24,
              width:80
            },
            target:Nvzn.statechart,
            action:'saveRoster',
            title:'Save'
          }),

          approveButton:SC.ButtonView.extend({
            layout:{
              centerY:0,
              right:40,
              height:24,
              width:120
            },
            target:Nvzn.statechart,
            action:'submitApprovals',
            title:'Submit Approvals'
          })

        })
      })
    }),


    // SIDEBAR
    sidebarView:SC.View.extend({
      classNames:'sidebar'.w(),

      layout:{
        width:210
      },

      childViews:'calendarView jobsView'.w(),

      calendarView:SC.View.extend({
        layout:{
          top:70
        },

        childViews:'headerView todayButtonView calendarView'.w(),

        headerView:SC.View.extend({
          classNames:'sidebar-calendar-header'.w(),
          layout:{
            height:16,
            left:13,
            width:80
          },

          render:function (context, firstTime) {
            return context.addClass('sidebar-header').text('TIMESHEETS');
          }
        }),

        todayButtonView:SC.ButtonView.extend({
          classNames:'sidebar-calendar-today-button'.w(),
          layout:{
            height:16,
            width:80,
            right:20
          },

          target:SC.outlet('parentView.calendarView'),
          action:'selectToday',

          render:function (context, firstTime) {
            return context.addClass('sidebar-today-button').text('Today');
          }
        }),

        calendarView:SCUI.CalendarView.extend({
          layout:{
            left:2,
            top:18
          },
          //            monthStartOn:SC.DateTime.create({day:7}),
          //            weekdayStrings:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          weekStartMonday:YES,
          selectedDateBinding:'Nvzn.selectedDate',
          selectToday:function () {
            console.log("select today");
            this.set('selectedDate', SC.DateTime.create());
            this.resetToSelectedDate();
          }
        })
      }),

      jobsView:SC.View.extend({
        layout:{
          top:300
        },

        childViews:'headerView listView'.w(),

        headerView:SC.View.extend({
          classNames:'sidebar-jobs-header'.w(),
          layout:{
            height:16,
            left:13,
            width:80
          },
          isVisibleBinding:SC.Binding.from('Nvzn.isSite'),

          render:function (context, firstTime) {
            return context.text('Where');
          }
        }),

        editView:SC.View.extend({
          classNames:'sidebar-jobs-edit'.w(),
          layout:{
            height:16,
            width:80,
            right:20
          },

          render:function (context, firstTime) {
            return context.text('Edit');
          }
        }),

        listView:SC.ScrollView.extend({
          layout:{
            top:20, bottom:13, right:13
          },
          contentView:SC.ListView.extend({
            rowHeight:31,
            contentBinding:'Nvzn.customersController.arrangedObjects',
            selectionBinding:'Nvzn.customersController.selection',
            exampleView:SC.ListItemView.extend({
              displayProperties:'isSelected'.w(),
              classNames:'sidebar-jobs-list-item',

              render:function (context) {
                if (this.get('isSelected')) context.addClass('sel');

                context.begin('div').addClass('sidebar-jobs-item-number').text(this.getPath('content')).end();
                //                  context.begin('div').addClass('sidebar-jobs-item-name').text(this.getPath('content')).end();
              }

            })
          })
        })
      })

    })
  }),

  all_employees: EO.TableView.design({
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
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title:"Tue",
        classNames:'day tue',
        key:2,
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title:"Wed",
        classNames:'day wed',
        key:3,
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title:"Thu",
        classNames:'day thu',
        key:4,
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title:"Fri",
        classNames:'day fri',
        key:5,
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title:"Sat",
        classNames:'day sat',
        key:6,
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title:"Sun",
        classNames:'day sun',
        key:0,
        formatter: Nvzn.TimeCard.fieldFormatter
      },
      {
        title: "",
        classNames: 'tick-all',
        key: 'selected'
      }
    ].map(function (hash) {
      return EO.TableColumn.create(hash);
    }),

    contentBinding:'Nvzn.employeesController.arrangedObjects',
    selectedBinding: 'Nvzn.selectedRecord',
    cellEditorFinished: function(item, value, target) {
      var matches = target.id.match(/tc-(\w)-(\d+)/),
        start = matches[1] === 's',
        storeKey = parseInt(matches[2], 10);
      Nvzn.statechart.sendEvent('valueChanged', storeKey, [start, value]);
    },

    click: function(evt) {
      var target = evt.target;
      if (target.className.indexOf("approve") >= 0)  {
        var storeKey = parseInt(target.getAttribute('storeKey'), 10);
        Nvzn.statechart.sendEvent('clickedApprove', storeKey);
      } else if (target.className.indexOf('name')) {
        var idx = target.parentNode.getAttribute('tvidx');
        var content = this.get('content');
        var item = content.objectAt(idx);
//        console.log(item, item.toString());
        this.set('selected', item);
      }
    }
  }),

  all_sites: EO.TableView.design({
    columns:[
      {
        title:"Site",
        classNames:'name',
        key:'id'
      },
      {
        title:"Mon",
        classNames:'day mon',
        key:1
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
      return EO.TableColumn.create(hash);
    }),

    contentBinding:'Nvzn.employeeController.customerTimecards',
    click:function (evt) {
      var employeeId = evt.target.parentElement.getAttribute('row-id');
      if (!employeeId) return;

    }
  })


});// end mainPage
