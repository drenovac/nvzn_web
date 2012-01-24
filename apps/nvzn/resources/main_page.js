Nvzn.mainPage = SC.Page.create({

    mainPane:SC.MainPane.design({
      calendar: SC.outlet('sidebarView.calendarView.calendarView'),
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

          childViews:'headerView contentView'.w(),

          //// HEADER
          headerView:SC.View.extend({
            classNames:'page-header'.w(),
            layout:{
              height:100
            },
            childViews:'dateLabel dateView'.w(),
            projectLabel:SC.View.extend({
              classNames:'label project'.w(),
              layout:{
                top:35, left:40, width:110, height:18},
              render:function (context, firstTime) {
                return context.text('Project:');
              }
            }),
            weatherLabel:SC.View.extend({
              classNames:'label weather'.w(),
              layout:{
                top:70, left:40, width:110, height:18},
              render:function (context, firstTime) {
                return context.text('Weather Report:');
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
            projectView:SC.View.extend(SC.ContentDisplay, {
              classNames:'project-value'.w(),
              displayProperties:'content'.w(),
              contentDisplayProperties:'id description'.w(),
              layout:{
                top:29, left:153, width:300, height:31
              },
              contentBinding:'Nvzn.jobController',
              render:function (context) {
                context.begin('div').addClass('header-project-number').text(this.getPath('content.id')).end();
                context.begin('div').addClass('header-project-name').text(this.getPath('content.description')).end();
                return context;
              }
            }),
            weatherRadioView:SC.RadioView.extend({
              classNames:'weather-radio'.w(),
              layout:{
                top:66,
                left:160,
                height:31
              },

              items:[
                {
                  title:"Fine",
                  value:"fine"
                },
                {
                  title:"Cloudy",
                  value:"cloudy"
                },
                {
                  title:"Windy",
                  value:"windy"
                },
                {
                  title:"Rain",
                  value:"rain"
                }
              ],
              valueBinding:'Nvzn.weather',
              itemTitleKey:'title',
              itemValueKey:'value',
              isEnabled:YES,
              layoutDirection:SC.LAYOUT_HORIZONTAL
            }),
            searchView:SC.TextFieldView.extend({
              classNames:'search'.w(),
              hint:"Search...",
              layout:{
                top:67, left:430, right:250, height:22
              },
              valueBinding:'Nvzn.searchValue'
            }),
            filterView:SC.SegmentedView.extend({
              layout:{
                top:65,
                right:80,
                height:31,
                width:170
              },

              items:[
                {
                  title:"All",
                  value:"all"
                },
                {
                  title:"Updated",
                  value:"updated"
                },
                {
                  title:"Blank",
                  value:"blank"
                }
              ],
              valueBinding:'Nvzn.filter',
              itemTitleKey:'title',
              itemValueKey:'value',
              isEnabled:YES,
              layoutDirection:SC.LAYOUT_HORIZONTAL
            }),
            editButton:SC.ButtonView.extend({
              layout:{
                top:65,
                right:32,
                height:24,
                width:55
              },
              title:'Edit',
              target:Nvzn.statechart, action:'edit' // FIXME
            })
          }),

          // END HEADER

          // TAB VIEW

          contentView:SC.View.extend({
            childViews:'tabView'.w(),
            layout:{
              top:105
            },

            tabView:SC.TabView.extend(EO.TargetAction, {
              items:[
                {
                  title:'All',
                  value:'all'
                }
              ],
              nowShowing:'all',
              itemTitleKey:'title',
              itemValueKey:'value',
              tabLocation:SC.BOTTOM_LOCATION,

              nowShowingDidChange:function () {
                this.performAction(null, Nvzn.statechart, 'tabDidChange');
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
                  newLeft = frame.x + (frame.width / 2) - 10;

                this.indicatorView.animate('left', newLeft, {duration:0.3, timing:'ease'});
                }
              }.observes('nowShowing')
            })
          }),

          footerView:SC.View.extend({
            childViews:'autofillButton autofillCalendarButton saveButton approveButton'.w(),

            layout:{
              bottom:0,
              right:0,
              width:320,
              height:44
            },

            autofillButton:SC.ButtonView.extend({
              classNames:'autofillButton'.w(),
              layout:{
                centerY:0,
                right:245,
                height:24,
                width:66
              },
              target:Nvzn.statechart,
              action:'autofill',
              title:'Autofill'
            }),

            autofillCalendarButton:SC.ButtonView.extend(EO.TargetAction, {
              classNames:'autofillCalendarButton'.w(),
              layout:{
                centerY:0,
                right:220,
                height:24,
                width:28
              },
              target:null,
              action:'popupCalendar',
              popupCalendar:function () {
                Nvzn.AutofillCalendarPane.popup(this);
                this.performAction(null, Nvzn.statechart, 'autofill');
              }
            }),

            saveButton:SC.ButtonView.extend({
              layout:{
                centerY:0,
                right:130,
                height:24,
                width:80
              },
              target:Nvzn.statechart,
              action:'saveNvzn',
              title:'Save'
            }),

            approveButton:SC.ButtonView.extend({
              layout:{
                centerY:0,
                right:40,
                height:24,
                width:80
              },
              target:Nvzn.statechart,
              action:'approveNvzn',
              title:'Approve'
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
            top: 70
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
            weekStartMonday:  YES,
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

  all: EO.TableView.design({
    columns:[
      {
        title:"Employee",
        classNames:'name',
        key:'fullName'
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

    contentBinding:'Nvzn.employeesController.arrangedObjects'
  }),

  mainPaneOld: SC.MainPane.design({
    defaultResponder: 'Nvzn.statechart',

    childViews: 'header tabs'.w(),

    header: SC.ToolbarView.design({
      theme: "nvzn",
      layout: { height: 60 },
      classNames: 'header',
      childViews: 'logo greet help logout'.w(),
      anchorLocation: SC.ANCHOR_TOP,

      logo: SC.ImageView.design({
	      layout: { width: 200, left: 10 },
        value: sc_static('image/envizion-logo.png')
      }),

      greet:SC.LabelView.design({
        layout: { centerY: 0, height: 16, right: 160 },
        escapeHTML: NO,
        textAlign: SC.ALIGN_RIGHT,
        escapeHTML: NO,
        valueBinding: 'Nvzn.loginController.fullName',
        icon: 'sc-icon-user-16'
      }),

      help:SC.LabelView.design({
        layout: {centerY: 0, right: 100, height: 16, width: 70 },
        escapeHTML: NO,
        textAlign: SC.ALIGN_RIGHT,
        value: "<a href='#mainPage/mainPane'>Help</a>",
        icon: "sc-icon-help-16"
      }),

      logout:SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 80 },
        title: 'Logout',
        action: 'logout'
      })

    }),
    // End header

    tabs: SC.TabView.design({
      classNames: 'tabs',

      layout: { left:0, right:0, top: 0, bottom:0 },
      tabHeight: 75,

      items: [
        {
          classNames: 'menu',
          title: "Roster",
          value: "Nvzn.rosterPage.containerView",
          icon: sc_static("images/icons/briefcase.png")
        },
//        {
//          classNames: 'menu',
//          title: "Payslip",
//          value: "Nvzn.payslipPage.mainView",
//          icon: sc_static("images/icons/payslips.png")
//        },
        {
          classNames: 'menu',
          title: "Account",
          value: "Nvzn.accountPage.mainView",
          icon: sc_static("images/icons/account.png")
        }
      ],

      itemTitleKey: 'title',
      itemValueKey: 'value',
      itemIconKey: 'icon',

      userDefaultKey: "mainPane",
      nowShowing: 'Nvzn.rosterPage.containerView'

    })//end tabs

  })// end mainPane

});// end mainPage
