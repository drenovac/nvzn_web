Nvzn=SC.Application.create({NAMESPACE:"Nvzn",VERSION:"201302041715-12-ge456731-91",canEditManager:NO,canApproveManager:NO,showTimeCardColors:NO,store:SC.Store.create().from(SC.Record.fixtures),local:SC.UserDefaults.create({appDomain:"Nvzn"}),rosterContent:null,selectedRecord:null,selectedDate:SC.DateTime.create({hour:0,minute:0,second:0}),selectedWeekDidChange:function(){if(Nvzn.didChangeFor("core","selectedWeek")){Nvzn.statechart.sendEvent("selectedNewDay")
}}.observes("selectedWeek").cacheable(),weekEnding:function(){return Nvzn.weekEndingFor(this.get("selectedDate"))
}.property("selectedDate").cacheable(),startOfWeek:function(){return Nvzn.startOfWeekFor(this.get("selectedDate"))
}.property("selectedDate").cacheable(),selectedWeek:function(){var date=this.get("selectedDate");
return date.get("week1")}.property("selectedDate").cacheable(),mode:"none",isSite:function(){return this.get("mode")==="site"
}.property("mode"),isEmployee:function(){return this.get("mode")==="employee"}.property("mode"),formatTime:function(str){str=str.trim();
var split=str.split(":");if(split.length<=2){split.push("00")}if(split.length<=2){split.push("00")
}if(split[0].length<2){split[0]="0"+split[0]}if(split[1].length<2){split[1]=split[1]+"0"
}return split.join(":")},colors:{},nextH:30,nextL:50,nextS:50,colorFor:function(id){var color=this.colors[id];
if(color){return color}var h=this.nextH,s=this.nextS,l=this.nextL;color=this.colors[id]="hsl(%@,%@%,%@%)".fmt(h,s,l);
h=this.nextH+=50;if(h>360){this.nextH=h-360;if(l==30){this.nextL=50;this.nextS=50
}else{if(l==50){this.nextL=70;this.nextS=30}else{this.nextL=30;this.nextS=70}}}return color
},icon_for:function(code){var icon=Nvzn["ICON_"+code];if(!icon){icon=SC.BLANK_IMAGE_URL
}return icon}});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]}CHANCE_SLICES=CHANCE_SLICES.concat([]);
Nvzn.customerController=SC.ObjectController.create({isCustomerController:YES});Nvzn.customersController=SC.ArrayController.create({contentBinding:"Nvzn.loginController.customers",allowsEmptySelection:NO,allowsMultipleSelection:YES,selectionDidChange:function(){Nvzn.statechart.sendEvent("customerSelectionChanged")
}.observes("selection"),byID:function(id){return Nvzn.store.find(Nvzn.Customer,id)
}});Nvzn.employeeController=SC.ObjectController.create({weekEndingBinding:"Nvzn.weekEnding",weekEnding:null,customerTimecards:function(){var cardsBySite={},sunday,customer,date,ms,tcs=this.get("timeCards"),sites=SC.Set.create();
if(!tcs){return[]}if(!sunday){sunday=Nvzn.get("weekEnding").adjust({hour:23,minute:59,second:59})
}var monday=sunday.get("lastMonday").adjust({hour:0,minute:0});tcs.forEach(function(tc){date=tc.get("dateObject");
ms=date.get("milliseconds");if(ms>=monday.get("milliseconds")&&ms<=sunday.get("milliseconds")){customer=tc.get("customer");
sites.add(customer);if(!cardsBySite[customer]){cardsBySite[customer]={id:customer,1:"",2:"",3:"",4:"",5:"",6:"",0:""}
}cardsBySite[customer][date.get("dayOfWeek")]+=tc.get("timeDisplay")+" "}});return sites.map(function(site){return SC.Object.create(cardsBySite[site])
})}.property("timeCards","weekEnding").cacheable()});Nvzn.employeesController=SC.ArrayController.create({contentBinding:"Nvzn.customerController.employees",allowsEmptySelection:NO,arrangedObjects:function(){var customerId=null,customer,employees=this.get("content"),site,storeKey,S=Nvzn.store,C=Nvzn.Customer,ret=[];
if(!employees){return ret}employees.forEach(function(employee){site=employee.get("customer");
if(site!==customerId){storeKey=C.storeKeyFor(site);customer=S.materializeRecord(storeKey);
ret.push(customer);customerId=site}ret.push(employee)});return ret}.property("content").cacheable()});
Nvzn.formController=SC.ObjectController.create({});Nvzn.loginController=SC.ObjectController.create({loginInput:"",passInput:"",errorMessage:""});
Nvzn.payslipsController=SC.ArrayController.create({});Nvzn.rosterController=SC.ArrayController.create({loading:NO});
Nvzn.sidebarController=SC.ArrayController.create({});Nvzn.siteController=SC.ObjectController.create({});
Nvzn.timeCardsController=SC.ArrayController.create({contentBinding:"Nvzn.employeeController.timeCards"});
Nvzn.timeCardsByWeekController=SC.ArrayController.create({timeCardsBinding:"Nvzn.employeeController.timeCards",weeksToShow:4,startOfWeekBinding:"Nvzn.startOfWeek",startOfWeekDidChange:function(){console.log("Start Of Week Did Change")
},timeCardsDidChange:function(){console.log("TimeCards or startOfWeek did change");
var timecards=this.get("timeCards"),weeksToShow=this.get("weeksToShow"),startOfWeek=this.get("startOfWeek"),daysToShow=7*weeksToShow,i,days=[];
if(!timecards){console.log("No TimeCards");return}console.log("TimeCards:",timecards.get("length"));
for(i=0;i<daysToShow;i++){var day=startOfWeek.advance({day:i});days.push({date:day,timecards:timecards.filter(function(timecard){return SC.DateTime.compareDate(day,timecard.get("dateObject"))===0
})})}this.set("content",days)}.observes("timeCards","startOfWeek","weeksToShow")});
Nvzn.yearsController=SC.ArrayController.create({});SC.mixin(Nvzn,{weeksBetweenDates:function(dateA,dateB){var yearDiff=dateB.get("year")-dateA.get("year");
var weekDiff=dateB.get("week1")-dateA.get("week1");return Math.round(yearDiff*52.177457)+weekDiff
},weeksFromWeekEnding:function(){return this.weeksBetweenDates(this.weekEndingFor(SC.DateTime.create()),Nvzn.get("weekEnding"))
},weekEndingFor:function(date){var isSunday=!date.get("dayOfWeek");if(!isSunday){date=date.get("nextSunday")
}return date},startOfWeekFor:function(date){var isMonday=date.get("dayOfWeek")===1;
if(!isMonday){date=date.get("lastMonday")}return date},dateFromStart:function(offset){var date=Nvzn.get("startOfWeek").advance({day:offset});
var fmt="%a %D %b";return date.toFormattedString(fmt)},getSiteData:function(customer){if(SC.empty(customer)){var sel=Nvzn.customersController.get("selection");
if(sel&&sel.get("length")){customer=sel.toArray().join(",")}}if(SC.empty(customer)){return
}var week=Nvzn.weeksFromWeekEnding(),url=("/api/v1.1/site/%@/timecards".fmt(customer)+(week?"?week="+week:""));
SC.Request.getUrl(url).notify(this,"loadSiteData").json().send()},loadSiteData:function(res){if(Nvzn.editScope){Nvzn.editScope.destroy()
}var body=res.get("body"),S=Nvzn.store,storeKey=S.pushRetrieve(Nvzn.Customer,body.customer.id,body.customer),editScope=S.chain(),customer=editScope.materializeRecord(storeKey);
Nvzn.editScope=editScope;if(body.customers&&body.customers.length){S.loadRecords(Nvzn.Customer,body.customers)
}if(body.employees&&body.employees.length){S.loadRecords(Nvzn.Employee,body.employees)
}if(body.timecards&&body.timecards.length){S.loadRecords(Nvzn.TimeCard,body.timecards)
}Nvzn.customerController.set("content",customer);Nvzn.cleanLocal();Nvzn.invokeLast(function(){Nvzn.statechart.sendEvent("dataDidLoad")
})},getEmployeeData:function(employee){var week=Nvzn.weeksFromWeekEnding(),url="/api/v1.1/employee/timecards?week="+week,weeksToShow=Nvzn.timeCardsByWeekController.get("weeksToShow");
if(weeksToShow>1){url+="&weeks="+weeksToShow}SC.Request.getUrl(url).notify(this,"loadEmployeeData").json().send()
},loadEmployeeData:function(res){var body=res.get("body"),S=Nvzn.store,storeKey=S.pushRetrieve(Nvzn.Employee,body.employee.id,body.employee),employee=S.materializeRecord(storeKey);
if(body.timecards&&body.timecards.length){S.loadRecords(Nvzn.TimeCard,body.timecards)
}if(body.customers&&body.customers.length){S.loadRecords(Nvzn.Customer,body.customers);
Nvzn.loginController.set("customers",body.customers.getEach("id"))}Nvzn.employeeController.set("content",employee);
Nvzn.statechart.sendEvent("dataDidLoad")},createUser:function(data){},cleanLocal:function(){var tooOld=SC.DateTime.create().advance({day:-1}).get("milliseconds");
var sent=Nvzn.local.get("sent"),data=Nvzn.local.get("data");for(i in sent){if(sent.hasOwnProperty(i)){if(sent[i]<tooOld){delete sent[i];
delete data[i]}}}Nvzn.local.set("sent",sent);Nvzn.local.set("data",data)},submitTimeCards:function(changeset){var url="/api/v1.1/timecards";
SC.Request.postUrl(url).notify(this,"timeCardsDidSubmit",changeset).json().send(changeset)
},timeCardsDidSubmit:function(res,changeset){if(SC.ok(res)){var custCon=Nvzn.customerController,storeKey=custCon.get("storeKey"),timecards=changeset.TimeCard,now=SC.DateTime.create().get("milliseconds");
var sent=Nvzn.local.get("sent")||{},data=Nvzn.local.get("data")||{};if(timecards){timecards.updated.forEach(function(id){sent[id]=now;
data[id]=timecards.attributes[id]})}Nvzn.local.set("sent",sent);Nvzn.local.set("data",data);
this.invokeLater("cleanLocal",50);Nvzn.store.applyChangeset(changeset,"Nvzn");if(Nvzn.editScope){Nvzn.editScope.destroy()
}Nvzn.editScope=Nvzn.store.chain();var customer=Nvzn.editScope.materializeRecord(storeKey);
custCon.set("content",customer);Nvzn.statechart.sendEvent("timeCardsSubmitted")}else{throw"Bad Response from server ... do something useful here."
}}});Nvzn.Form=SC.Record.extend({});sc_require("models/form_model");Nvzn.Form.FIXTURES=[];
Nvzn.Payslip=SC.Record.extend({employee:SC.Record.attr(String),from:SC.Record.attr(String),to:SC.Record.attr(String),paidAt:SC.Record.attr(String),tax:SC.Record.attr(String),"super":SC.Record.attr(String),gross:SC.Record.attr(String),rate:SC.Record.attr(String),hour:SC.Record.attr(String),toString:function(){return"%@ ~ %@".fmt(this.get("from"),this.get("to"))
}.property()});sc_require("models/payslip");Nvzn.Payslip.FIXTURES=[{guid:"payslip-1",employee:"John Smith",from:"1 Jan 2011",to:"14 Jan 2011",paidAt:"15 Jan 2011",tax:"$50","super":"$50",gross:"$700"},{guid:"payslip-2",employee:"John Smith",from:"15 Jan 2011",to:"29 Jan 2011",paidAt:"30 Jan 2011",tax:"$50","super":"$50",gross:"$700"},{guid:"payslip-3",employee:"John Smith",from:"1 Feb 2011",to:"14 Feb 2011",paidAt:"15 Jan 2011",tax:"$50","super":"$50",gross:"$700"}];
Nvzn.Roster=SC.Record.extend({employee:SC.Record.attr(String,{isRequired:YES}),contact:SC.Record.attr(String),site_phone:SC.Record.attr(String),location:SC.Record.attr(String),status:SC.Record.attr(String,{defaultValue:"pending"}),start:SC.Record.attr(SC.DateTime,{format:"%d/%m/%Y %H:%M:%S"}),end:SC.Record.attr(SC.DateTime,{format:"%d/%m/%Y %H:%M:%S"}),date:function(){var start=this.get("start");
var date=start.toFormattedString("%d/%b/%Y");return date}.property("start").cacheable(),shift:function(){var start=this.get("start");
var end=this.get("end");start=start.toFormattedString("%I:%M%p");end=end.toFormattedString("%I:%M%p");
var shift=start+" ~ "+end;return shift}.property("start","end").cacheable()});sc_require("models/roster");
Nvzn.Roster.FIXTURES=[{guid:1,employee:"Glacomo Guillzoni",contact:"048726384",site_phone:"3878234",location:"Peldi",status:"Confirmed",start:"01/12/2010 09:00:00",end:"01/12/2010 18:00:00"},{guid:2,employee:"Dwight Schrute",contact:"048726384",site_phone:"3234234",location:"Sydney",start:"01/12/2010 09:00:00",end:"01/12/2010 18:00:00"},{guid:3,employee:"Glacomo Guillzoni",contact:"048726384",site_phone:"3878234",location:"Peldi",status:"Confirmed",start:"01/12/2010 09:00:00",end:"01/12/2010 18:00:00"},{guid:4,employee:"Dwight Schrute",contact:"048726384",site_phone:"3234234",location:"Sydney",start:"01/12/2010 09:00:00",end:"01/12/2010 18:00:00"},{guid:5,employee:"Glacomo Guillzoni",contact:"048726384",site_phone:"3878234",status:"Rejected",location:"Peldi",start:"01/12/2010 09:00:00",end:"01/12/2010 18:00:00"},{guid:6,employee:"Dwight Schrute",contact:"048726384",site_phone:"3234234",location:"Sydney",start:"01/12/2010 09:00:00",end:"01/12/2010 18:00:00"}];
Nvzn.User=SC.Record.extend({primaryKey:"_id",_rev:SC.Record.attr(String),type:SC.Record.attr(String),role:SC.Record.attr(String),password:function(){return""
}.property(),customers:SC.Record.attr(Array),firstName:SC.Record.attr(String),lastName:SC.Record.attr(String),phone:SC.Record.attr(String),email:SC.Record.attr(String),fullName:function(){return[this.get("firstName"),this.get("lastName")].join(" ").trim()
}.property("firstName","lastName")});sc_require("models/user");Nvzn.User.FIXTURES=[];
if(typeof Crypto=="undefined"||!Crypto.util){(function(){var j=window.Crypto={},m=j.util={rotl:function(a,b){return a<<b|a>>>32-b
},rotr:function(a,b){return a<<32-b|a>>>b},endian:function(a){if(a.constructor==Number){return m.rotl(a,8)&16711935|m.rotl(a,24)&4278255360
}for(var b=0;b<a.length;b++){a[b]=m.endian(a[b])}return a},randomBytes:function(a){for(var b=[];
a>0;a--){b.push(Math.floor(Math.random()*256))}return b},bytesToWords:function(a){for(var b=[],c=0,f=0;
c<a.length;c++,f+=8){b[f>>>5]|=a[c]<<24-f%32}return b},wordsToBytes:function(a){for(var b=[],c=0;
c<a.length*32;c+=8){b.push(a[c>>>5]>>>24-c%32&255)}return b},bytesToHex:function(a){for(var b=[],c=0;
c<a.length;c++){b.push((a[c]>>>4).toString(16));b.push((a[c]&15).toString(16))}return b.join("")
},hexToBytes:function(a){for(var b=[],c=0;c<a.length;c+=2){b.push(parseInt(a.substr(c,2),16))
}return b},bytesToBase64:function(a){if(typeof btoa=="function"){return btoa(n.bytesToString(a))
}for(var b=[],c=0;c<a.length;c+=3){for(var f=a[c]<<16|a[c+1]<<8|a[c+2],d=0;d<4;d++){c*8+d*6<=a.length*8?b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f>>>6*(3-d)&63)):b.push("=")
}}return b.join("")},base64ToBytes:function(a){if(typeof atob=="function"){return n.stringToBytes(atob(a))
}a=a.replace(/[^A-Z0-9+\/]/ig,"");for(var b=[],c=0,f=0;c<a.length;f=++c%4){f!=0&&b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c-1))&Math.pow(2,-2*f+8)-1)<<f*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c))>>>6-f*2)
}return b}};j=j.charenc={};j.UTF8={stringToBytes:function(a){return n.stringToBytes(unescape(encodeURIComponent(a)))
},bytesToString:function(a){return decodeURIComponent(escape(n.bytesToString(a)))
}};var n=j.Binary={stringToBytes:function(a){for(var b=[],c=0;c<a.length;c++){b.push(a.charCodeAt(c)&255)
}return b},bytesToString:function(a){for(var b=[],c=0;c<a.length;c++){b.push(String.fromCharCode(a[c]))
}return b.join("")}}})()}(function(){var j=Crypto,m=j.util,n=j.charenc,a=n.UTF8,b=n.Binary,c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=j.SHA256=function(d,k){var e=m.wordsToBytes(f._sha256(d));
return k&&k.asBytes?e:k&&k.asString?b.bytesToString(e):m.bytesToHex(e)};f._sha256=function(d){if(d.constructor==String){d=a.stringToBytes(d)
}var k=m.bytesToWords(d),e=d.length*8;d=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];
var o=[],p,q,t,h,r,s,u,v,g,l,i;k[e>>5]|=128<<24-e%32;k[(e+64>>9<<4)+15]=e;for(v=0;
v<k.length;v+=16){e=d[0];p=d[1];q=d[2];t=d[3];h=d[4];r=d[5];s=d[6];u=d[7];for(g=0;
g<64;g++){if(g<16){o[g]=k[g+v]}else{l=o[g-15];i=o[g-2];o[g]=((l<<25|l>>>7)^(l<<14|l>>>18)^l>>>3)+(o[g-7]>>>0)+((i<<15|i>>>17)^(i<<13|i>>>19)^i>>>10)+(o[g-16]>>>0)
}i=e&p^e&q^p&q;var w=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22);l=(u>>>0)+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&r^~h&s)+c[g]+(o[g]>>>0);
i=w+i;u=s;s=r;r=h;h=t+l;t=q;q=p;p=e;e=l+i}d[0]+=e;d[1]+=p;d[2]+=q;d[3]+=t;d[4]+=h;
d[5]+=r;d[6]+=s;d[7]+=u}return d};f._blocksize=16;f._digestsize=32})();Nvzn.Customer=SC.Record.extend({primaryKey:"id",customer:function(){return this.get("id")
}.property("id").cacheable(),name:SC.Record.attr("String"),displayName:function(){return this.get("id")
}.property("name").cacheable(),displayClass:function(){return"customer"}.property().cacheable(),fullName:function(){return this.get("displayName")+" - "+this.get("fullAddress")
}.property("displayName","fullAddress"),fullAddress:function(){var address=this.get("address");
if(!address){address={}}return(address.name||"")+" "+(address.street||"")+", "+(address.suburb||"")+" "+(address.postcode||"")
}.property("address").cacheable(),employees:SC.Record.toMany("Nvzn.Employee"),displayColor:null});
Nvzn.Employee=SC.Record.extend({primaryKey:"id",firstName:SC.Record.attr("String",{key:"first_name"}),lastName:SC.Record.attr("String",{key:"last_name"}),contactNumbers:SC.Record.attr("Array",{key:"contact_numbers"}),address:SC.Record.attr("String"),photoPath:SC.Record.attr("String",{key:"photo_path"}),customer:SC.Record.attr("String"),timeCards:SC.Record.toMany("Nvzn.TimeCard"),fullName:function(){return[this.get("firstName"),this.get("lastName")].join(" ").titleize()
}.property("firstName","lastName").cacheable(),displayName:function(){return this.get("fullName")
}.property("fullName"),timeCardsByDate:function(sunday){if(!sunday){sunday=Nvzn.get("weekEnding").adjust({hour:23,minute:59,second:59})
}var monday=sunday.get("lastMonday").adjust({hour:0,minute:0}),date,ms,hash={1:[],2:[],3:[],4:[],5:[],6:[],0:[]};
this.get("timeCards").forEach(function(tc){date=tc.get("dateObject");ms=date.get("milliseconds");
if(ms>=monday.get("milliseconds")&&ms<=sunday.get("milliseconds")){hash[date.get("dayOfWeek")].push(tc)
}});return hash},timeCardsDidChange:function(){this._timeCardsByDate=null}.observes("timeCards"),unknownProperty:function(key,value){if(SC.typeOf(key)==SC.T_NUMBER&&key<7&&key>=0){return this.timeCardsByDate()[key]
}else{if(SC.typeOf(key)===SC.T_NUMBER&&key.length===3){}}}});Nvzn.TimeCard=SC.Record.extend({primaryKey:"id",date:SC.Record.attr("String"),start:SC.Record.attr("String"),finish:SC.Record.attr("String"),customer:SC.Record.attr("String"),employee:SC.Record.toOne("Nvzn.Employee"),type:SC.Record.attr("String"),desc:SC.Record.attr("String"),timeDisplay:function(){var start=this.timeFromString("start"),end=this.timeFromString("finish");
return start+"-"+end}.property("start","finish"),dateObject:function(){return SC.DateTime.parse(this.get("date")+" "+this.get("start"),"%Y-%m-%d %H:%M:%S")
}.property("date").cacheable(),dateString:function(){return this.get("dateObject").toFormattedString("%Y-%m-%d")
}.property("date").cacheable(),year:function(){return this.get("dateObject").get("year")
}.property("dateObject"),week:function(){return this.get("dateObject").get("week")
}.property("dateObject"),timeFromString:function(prop){var split=this.get(prop).split(":");
split.pop();return split.join(":")}});Nvzn.TimeCard.fieldFormatter=function(items){if(!items){return""
}var ret="",classes="timecard-cell ",allClasses,status,approveClass="approve",cid,icon,sent=Nvzn.local.getPath("sent");
if(Nvzn.canEditManager){classes="editable-cell "+classes}var color=Nvzn.get("showTimeCardColors");
items.forEach(function(item){status=item.get("status");if(status&SC.Record.DIRTY){approveClass+=" changed"
}if(sent&&sent[item.get("id")]){approveClass+=" submitted"}if(item.get("approved")){approveClass+=" approved"
}if(Nvzn.canApproveManager){ret+="<span class='"+approveClass+"' storeKey='"+item.get("storeKey")+"'> </span>"
}if(color){cid=item.getPath("customer");ret+="<span class='customer-color' title='"+cid+"' style='background-color:"+Nvzn.colorFor(cid)+";'>"
}allClasses=classes+(items.get("status")&SC.Record.DIRTY?"cell-dirty":"");ret+="<span id='tc-s-"+item.get("storeKey")+"' class='"+allClasses+"'>"+item.timeFromString("start")+" - </span>";
ret+="<span id='tc-f-"+item.get("storeKey")+"' class='"+allClasses+"'>"+item.timeFromString("finish")+"</span><br>";
if(item.get("type")!=="N"){ret+="<span class='tc_desc'>"+item.get("desc")+"</span></br>"
}if(color){ret+="</span>"}});return ret};Nvzn.loadingSheet=SC.SheetPane.create({layout:{width:400,height:166,centerX:0,centerY:0},contentView:SC.View.design({childViews:"locatingText spinnerView".w(),locatingText:SC.LabelView.design({layout:{top:30,height:20},textAlign:SC.ALIGN_CENTER,value:"Loading, please wait..."}),spinnerView:SC.View.design({layout:{centerX:0,centerY:10,width:32,height:32},classNames:"loading-spinner".w()})})});
Nvzn.routes=SC.Object.create({currentPagePane:null,route:function(routeParams){}});
Nvzn.APP=Ki.State.design({initialSubstate:"ROSTER",enterState:function(){SC.routes.set("location","mainPage/mainPane");
Nvzn.getPath("mainPage.mainPane").append();if(Nvzn.loginController.get("role")=="site"){Nvzn.getPath("mainPage.tabView").set("items",[{title:"View Rosters",value:"all_employees"},{title:"Approve Rosters",value:"approve_tc"}])
}else{Nvzn.getPath("mainPage.tabView").set("items",[{title:"Coming Weeks",value:"sites_by_week"}])
}},tabDidChange:function(){switch(Nvzn.mainPage.getPath("tabView.nowShowing")){case"all_employees":Nvzn.set("canEditManager",NO);
Nvzn.set("canApproveManager",NO);this.gotoState("APP.ROSTER");break;case"approve_tc":Nvzn.set("canEditManager",YES);
Nvzn.set("canApproveManager",YES);this.gotoState("APP.ROSTER");break;case"all_sites":this.gotoState("APP.ROSTER");
break;case"ohs_report":this.gotoState("OHS_REPORT");break}return YES},logout:function(){var url="/api/v1.1/logout";
SC.Request.getUrl(url).notify(this,function(){Nvzn.statechart.sendEvent("didLogout")
}).json().send()},didLogout:function(){window.location.reload()},ROSTER:Ki.State.plugin("Nvzn.ROSTER"),OHS_REPORT:Ki.State.plugin("Nvzn.OHS_REPORT")});
Nvzn.OHS_REPORT=Ki.State.design({initialSubstate:"OHS_REPORT_SHOW",enterState:function(){Nvzn.getPath("mainPage.submit").set("title","Submit Report");
Nvzn.getPath("mainPage.submit").set("isVisible",YES);Nvzn.getPath("mainPage.header.titleView").set("value","OHS Concern/Hazard Report")
},exitState:function(){Nvzn.getPath("mainPage.header.titleView").set("value","")},OHS_REPORT_SHOW:Ki.State.design({enterState:function(){console.log("APP.OHS_REPORT_SHOW");
if(Nvzn.editScope){Nvzn.editScope.destroy()}var S=Nvzn.editScope=Nvzn.store.chain(),employee=Nvzn.loginController,form=S.createRecord(Nvzn.Form,{surname:employee.get("lastName"),givenName:employee.get("firstName")},(new Date().getTime()));
Nvzn.formController.set("content",form)}})});Nvzn.ROSTER=Ki.State.design({initialSubstate:"START",enterState:function(){var controller=Nvzn.loginController,role=controller.get("role");
SC.routes.set("location","mainPage/mainPane");window.setTimeout(function(){Nvzn.mainPage.mainPane.get("calendar").resetToSelectedDate()
},100);if(role==="site"){this.gotoState(this.ROSTER_SITE)}else{this.gotoState(this.ROSTER_EMPLOYEE)
}},exitState:function(){},customerSelectionChangedOFF:function(){console.log("You changed your Site Selection");
var sel=Nvzn.customersController.get("selection");if(!sel){return}var customerId=sel.firstObject(),customer=Nvzn.store.find(Nvzn.Customer,customerId);
if(customer){Nvzn.customerController.set("content",customer)}else{Nvzn.customerController.set("content",null);
Nvzn.getSiteData(customerId)}},START:Ki.State.design(),ROSTER_SITE:Ki.State.plugin("Nvzn.ROSTER_SITE"),ROSTER_EMPLOYEE:Ki.State.plugin("Nvzn.ROSTER_EMPLOYEE")});
Nvzn.ROSTER_EMPLOYEE=Ki.State.design({initialSubstate:"LOADING_EMPLOYEE",enterState:function(){Nvzn.set("mode","employee");
Nvzn.getPath("mainPage.tabView").set("nowShowing","sites_by_week");Nvzn.getPath("mainPage.submit").set("isVisible",NO);
Nvzn.getPath("mainPage.header").set("isVisible",YES);Nvzn.set("showTimeCardColors",YES)
},LOADING_EMPLOYEE:Ki.State.design({enterState:function(){Nvzn.rosterController.set("loading",YES);
Nvzn.loadingSheet.append();Nvzn.getEmployeeData()},exitState:function(){Nvzn.rosterController.set("loading",NO);
Nvzn.loadingSheet.remove()},dataDidLoad:function(){this.gotoState("SHOWING_EMPLOYEE");
this.invokeLater(function(){Nvzn.employeeController.propertyDidChange("customerTimecards");
Nvzn.timeCardsByWeekController.timeCardsDidChange();Nvzn.mainPage.sites_by_week.displayDidChange()
})}}),SHOWING_EMPLOYEE:Ki.State.design({selectedNewDay:function(){this.gotoState("LOADING_EMPLOYEE")
},customerSelectionChanged:function(){var selection=Nvzn.customersController.get("selection");
var customerId=selection.firstObject();if(customerId){var customer=Nvzn.store.find(Nvzn.Customer,customerId);
Nvzn.customerController.set("content",customer)}}})});Nvzn.ROSTER_SITE=Ki.State.design({initialSubstate:"START_SITE",enterState:function(){Nvzn.set("mode","site");
Nvzn.getPath("mainPage.tabView").set("nowShowing","all_employees");var submit=Nvzn.getPath("mainPage.submit");
if(Nvzn.canApproveManager){submit.set("title","Submit Approvals");submit.set("isVisible",YES)
}else{submit.set("isVisible",NO)}Nvzn.getPath("mainPage.header").set("isVisible",YES)
},START_SITE:Ki.State.design({customerSelectionChanged:function(){console.log("first site selection changed...");
this.gotoState("LOADING_SITE")}}),LOADING_SITE:Ki.State.design({enterState:function(){Nvzn.rosterController.set("loading",YES);
Nvzn.loadingSheet.append();Nvzn.getSiteData()},exitState:function(){Nvzn.rosterController.set("loading",NO);
Nvzn.loadingSheet.remove()},dataDidLoad:function(){this.gotoState("SHOWING_SITE")
}}),SHOWING_SITE:Ki.State.design({selectedNewDay:function(){this.gotoState("LOADING_SITE")
},customerSelectionChanged:function(){console.log("site selection changed...");this.gotoState("LOADING_SITE")
},submit:function(){this.gotoState("SAVING_SITE")},valueChanged:function(storeKey,params){var start=params[0],value=params[1];
console.log("updating timeCard: "+storeKey,"with value",value);var timeCard=Nvzn.editScope.materializeRecord(storeKey),param=start?"start":"finish",oldValue=timeCard.get(param),newValue=Nvzn.formatTime(value);
if(newValue!==oldValue){timeCard.set(param,newValue);Nvzn.mainPage.all_employees.displayDidChange()
}},clickedApprove:function(storeKey){var timecard=Nvzn.editScope.materializeRecord(storeKey);
if(timecard.get("approved")||Nvzn.local.get("sent")[timecard.get("id")]){return}console.log("APPROVE!!",storeKey);
Nvzn.editScope.recordDidChange(null,null,storeKey,undefined,YES);Nvzn.mainPage.all_employees.displayDidChange()
}}),SAVING_SITE:Ki.State.design({enterState:function(){Nvzn.rosterController.set("loading",YES);
Nvzn.loadingSheet.append();var changeset=Nvzn.editScope.computeChangeset(),timecardChanges=changeset.TimeCard;
if(timecardChanges){console.log("we have",timecardChanges.updated.length,"timechards to submit");
Nvzn.submitTimeCards(changeset)}else{this.gotoState("SHOWING_SITE")}},exitState:function(){Nvzn.rosterController.set("loading",NO);
Nvzn.loadingSheet.remove()},timeCardsSubmitted:function(){this.gotoState("SHOWING_SITE")
}})});Nvzn.LOADING=Ki.State.design({enterState:function(){}});Nvzn.LOGIN=Ki.State.design({initialSubstate:"CHECK_LOGIN",loggedIn:function(data){var controller=Nvzn.loginController,userKey=Nvzn.store.loadRecord(Nvzn.User,data);
controller.set("content",Nvzn.store.materializeRecord(userKey));Nvzn.local.set("userDomain",controller.get("db_id"));
var sent=Nvzn.local.get("sent");if(!sent){Nvzn.local.set("sent",{})}this.gotoState("APP")
},CHECK_LOGIN:Ki.State.plugin("Nvzn.CHECK_LOGIN"),SHOW_LOGIN:Ki.State.plugin("Nvzn.SHOW_LOGIN")});
Nvzn.CHECK_LOGIN=Ki.State.design({enterState:function(){SC.Request.getUrl("/api/v1.1/login").json().notify(this,"checkedLogin").send()
},checkedLogin:function(req){if(SC.ok(req)){var controller=Nvzn.loginController,body=req.get("body");
if(req.status===401){this.gotoState("SHOW_LOGIN")}else{if(body.user){this.statechart.sendEvent("loggedIn",body.user)
}else{throw"Login error"}}}else{if(req.status===401){this.gotoState("SHOW_LOGIN")
}else{console.error(req.error)}}},loadUser:function(){if(user.get("isEmployee")){}}});
Nvzn.SHOW_LOGIN=Ki.State.design({enterState:function(){var pane=Nvzn.getPath("loginPage.loginPane");
pane.append();pane.becomeKeyPane()},exitState:function(){Nvzn.getPath("loginPage.loginPane").remove()
},submitLogin:function(){var controller=Nvzn.loginController,username=controller.get("loginInput"),password=controller.get("passInput"),url="/api/v1.1/login";
if(SC.empty(username)){controller.set("errorMessage","Please enter Login and Password.");
return}controller.set("errorMessage","Logging in ...");SC.Request.postUrl(url).json().notify(this,"didLogin").send({username:username,password:password})
},didLogin:function(req){var controller=Nvzn.loginController,body=req.get("body");
if(req.status===401){controller.set("errorMessage","Incorrect Login or Password");
return}if(req.status===500){controller.set("errorMessage","The server was not able to log you in");
return}if(body.user){this.statechart.sendEvent("loggedIn",body.user)}else{console.log("didLogin errored.")
}}});Nvzn.statechart=Ki.Statechart.create({rootState:Ki.State.design({initialSubstate:"LOGIN",LOGIN:Ki.State.plugin("Nvzn.LOGIN"),LOADING:Ki.State.plugin("Nvzn.LOADING"),APP:Ki.State.plugin("Nvzn.APP")})});
Nvzn.Theme=SC.AceTheme.create({name:"georgiou"});SC.Theme.addTheme(Nvzn.Theme);SC.defaultTheme="georgiou";
Nvzn.InfoView=SC.View.extend(SC.ContentDisplay,{classNames:"info".w(),content:null,displayProperties:"contentType".w(),contentDisplayProperties:"storeKey".w(),render:function(ctx,firstTime){var content=this.get("content");
if(!content||!content.get("storeKey")){ctx.push("<div id='info'>Please Select an item from above</div>")
}else{if(SC.instanceOf(content.content,Nvzn.Employee)){this.renderEmployee(ctx,firstTime,content)
}else{if(SC.instanceOf(content.content,Nvzn.TimeCard)){var record=content.get("_parentRecord");
this.renderEmployee(ctx,firstTime,record)}else{console.log("Found unknown type")}}}},renderEmployee:function(ctx,firstTime,content){var photo=content.get("photoPath"),cn=content.get("contactNumbers"),contact="";
if(cn[0]&&!SC.empty(cn[0].trim())){contact+="<li><label>Email</label>"+cn[0]+"</li>"
}if(cn[1]&&!SC.empty(cn[1].trim())){contact+="<li><label>Phone 1</label>"+cn[1]+"</li>"
}if(cn[2]&&!SC.empty(cn[2].trim())){contact+="<li><label>Phone 2</label>"+cn[2]+"</li>"
}if(cn[3]&&!SC.empty(cn[3].trim())){contact+="<li><label>Phone 3</label>"+cn[3]+"</li>"
}if(photo){ctx.push("<img src='",photo,"'>")}ctx.push("<ul>","<li><label>Name</label>",content.get("fullName"),"</li>",contact,"<li><label>Address</label>",content.get("address"),"</li>","</ul>")
}});Nvzn.OhsReportView=EO.GridLayoutView.extend({classNames:["ohs-report"],layout:{left:0,top:0,right:0,bottom:0},childViews:["label1","field1","label2","field2","label3","field3"],childViewHeight:18,childViewPadding:10,col:{1:20,2:160,3:300},label1:SC.LabelView.design({row:1,col:1,value:"Surname:",textAlign:SC.ALIGN_RIGHT}),field1:SC.TextFieldView.design({row:1,col:2,valueBinding:"Nvzn.formController.surname"}),label2:SC.LabelView.design({row:2,col:1,value:"Given Name:",textAlign:SC.ALIGN_RIGHT}),field2:SC.TextFieldView.design({row:2,col:2,valueBinding:"Nvzn.formController.givenName"}),label3:SC.LabelView.design({row:3,col:1,value:"Client Name:",textAlign:SC.ALIGN_RIGHT}),field3:SC.TextFieldView.design({row:3,col:2,valueBinding:"Nvzn.formController.weekEnding"})});
Nvzn.UpcomingView=SC.View.extend(SC.ContentDisplay,{contentDisplayProperties:["length","timeCards","employees"],lengthDidChange:function(){}.observes("length"),classNames:"upcoming-view".w(),startDate:function(){var now=SC.DateTime.parse(this.getPath("content.start"),"%Y-%m-%d"),start;
if(now.get("dayOfWeek")===1){start=now}else{start=now.get("lastMonday")}return start
},click:function(evt){var storeKey=evt.target.id,record=Nvzn.store.materializeRecord(storeKey);
if(record){this.set("selection",record)}},daysToShow:7,render:function(ctx,firstTime){if(firstTime){ctx.push("<table id='cal'>","<colgroup>","<col class='name'/>","<col class='day odd'/>","<col class='day'/>","<col class='day odd'/>","<col class='day'/>","<col class='day odd'/>","<col class='day'/>","<col class='day odd'/>","</colgroup>","<thead>","<th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>","</thead>","<tbody>","</tbody>","</table>")
}this.updateRows(ctx)},renderEmployeeRow:function(ctx,employee,odd){var start=this.startDate(),days=0,day,timecardsByDay={},cards,showing,daysToShow=this.get("daysToShow"),id=employee.get("storeKey");
employee.get("timeCards").forEach(function(timeCard){day=timeCard.get("dateString");
cards=timecardsByDay[day];if(!cards){timecardsByDay[day]=cards=[]}cards.push(timeCard)
});ctx.push("<tr",odd?" class='odd'":"",">","<td class='name' id='",employee.get("storeKey"),"'>",employee.get("fullName"),"</td>");
while(days<daysToShow){showing=start.advance({day:days});day=showing.toFormattedString("%Y-%m-%d");
ctx.push("<td>","<div id='",day,"-",id,"' class='day'>");cards=timecardsByDay[day];
if(cards){cards.forEach(function(timeCard){ctx.push('<div id="',timeCard.get("storeKey"),'">'+timeCard.get("timeDisplay")+"</div>")
})}ctx.push("</div>","</td>");days++}ctx.push("</tr>")},renderTimeCards:function(ctx,timecards){var tcByCustomerDate={},customer,date,self=this;
timecards.forEach(function(tc){customer=tc.get("customer");date=tc.get("date");if(!tcByCustomerDate[customer]){tcByCustomerDate[customer]={}
}if(!tcByCustomerDate[customer][date]){tcByCustomerDate[customer][date]=[]}tcByCustomerDate[customer][date].push(tc)
});for(customer in tcByCustomerDate){if(tcByCustomerDate.hasOwnProperty(customer)){self.renderCustomerRow(ctx,customer,tcByCustomerDate[customer])
}}},renderCustomerRow:function(ctx,customer,tcByDate){var start=this.startDate(),days=0,day,cards,showing,daysToShow=this.get("daysToShow");
ctx.push("<tr><td>",customer,"</td>");while(days<daysToShow){showing=start.advance({day:days});
day=showing.toFormattedString("%Y-%m-%d");ctx.push("<td>","<div id='",day,"-",customer,"' class='day'>");
cards=tcByDate[day];if(cards){cards.forEach(function(timeCard){ctx.push("<div>"+timeCard.get("timeDisplay")+"</div>")
})}ctx.push("</div></td>");days++}ctx.push("</tr>")},updateRows:function(ctx){var content=this.get("content")||[],self=this,ret=[];
var d=SC.$("tbody").empty();if(content.isCustomerController){console.log("rendering Site");
var employees=content.get("employees");if(!employees){d.append("Loading data...");
return}if(employees.get("length")===0){d.append("No Timecards for this period.");
return}employees.forEach(function(employee,idx){self.renderEmployeeRow(ret,employee,idx%2)
})}else{if(SC.instanceOf(content,Nvzn.Employee)){self.renderTimeCards(ret,content.get("timeCards"))
}else{}}d.append(ret.join(""))}});Nvzn.WeeklyView=SC.View.extend(SC.ContentDisplay,{classNames:["weekly-view"],weeksToShow:2,displayProperties:["weeksToShow"],render:function(ctx,firstTime){var content=this.get("content")||[],weeks=this.get("weeksToShow"),currentMonth=-1,date;
ctx.push("<table>","<thead><tr>","<th class='dashboard-header day'>Mon</th>","<th class='dashboard-header day'>Tue</th>","<th class='dashboard-header day'>Wed</th>","<th class='dashboard-header day'>Thu</th>","<th class='dashboard-header day'>Fri</th>","<th class='dashboard-header day'>Sat</th>","<th class='dashboard-header day'>Sun</th>","</tr></thead>");
content.forEach(function(i,idx){if(idx%7===0){ctx.push("</tr><tr>");currentMonth=-1
}date=i.date;var dateStr=date.get("day");if(date.get("month")!==currentMonth){dateStr=date.toFormattedString("%b")+" "+dateStr;
currentMonth=date.get("month")}ctx.push("<td><span class='date'>",dateStr,"</span>");
ctx.push(Nvzn.TimeCard.fieldFormatter(i.timecards));ctx.push("</td>")});if(content.get("length")==0){ctx.push("<br style='clear:both'>")
}ctx.push("</tr>","</table>")}});Nvzn.accountPage=SC.Page.create({mainView:SC.ContainerView.design({layout:{top:20},contentView:SC.SplitView.design({layout:{},layoutDirection:SC.LAYOUT_HORIZONTAL,defaultThickness:0.15,topLeftMinThickness:100,topLeftMaxThickness:200,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,topLeftView:SC.View.design({childViews:"account account_list".w(),backgroundColor:"#f6f6f6",account:SC.LabelView.design({layout:{left:10,width:140,top:10,height:24},classNames:"title",value:"Account"}),account_list:SC.ListView.design({layout:{top:35},backgroundColor:"#f6f6f6",contentIconKey:"icon",hasContentIcon:YES,contentBinding:"Nvzn.sidebarController.account_list",selectionBinding:"Nvzn.sidebarController.selection"})}),dividerView:SC.SplitDividerView.design({layout:{}}),bottomRightView:SC.ContainerView.design({backgroundColor:"white",contentView:SC.View.design({childViews:"first_name first_name_input last_name last_name_input password password_input contact contact_input email email_input cancel submit".w(),first_name:SC.LabelView.design({layout:{left:40,top:30,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>First name</h1>",classNames:"black"}),first_name_input:SC.TextFieldView.design({layout:{left:150,top:30,width:200,height:30},hint:"John",isPassword:NO,isTextArea:NO,valueBinding:"Nvzn.loginController.firstName"}),last_name:SC.LabelView.design({layout:{left:40,top:90,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>Last name</h1>",classNames:"black"}),last_name_input:SC.TextFieldView.design({layout:{left:150,top:90,width:200,height:30},hint:"Smith",isPassword:NO,isTextArea:NO,valueBinding:"Nvzn.loginController.lastName"}),password:SC.LabelView.design({layout:{left:40,top:150,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>Password</h1>",classNames:"black"}),password_input:SC.TextFieldView.design({layout:{left:150,top:150,width:200,height:30},hint:"*******",isPassword:YES,isTextArea:NO,valueBinding:"Nvzn.loginController.password"}),contact:SC.LabelView.design({layout:{left:40,top:210,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>Contact</h1>",classNames:"black"}),contact_input:SC.TextFieldView.design({layout:{left:150,top:210,width:200,height:30},hint:"0429736182",isPassword:NO,isTextArea:NO,valueBinding:"Nvzn.loginController.phone"}),email:SC.LabelView.design({layout:{left:40,top:270,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>Email</h1>",classNames:"black"}),email_input:SC.TextFieldView.design({layout:{left:150,top:270,width:200,height:30},hint:"john.smith@js.com",isPassword:NO,isTextArea:NO,valueBinding:"Nvzn.loginController.email"}),cancel:SC.ButtonView.design({layout:{left:40,top:330,width:100,height:30},title:"Cancel",action:"cancel",target:"Nvzn.accountController"}),submit:SC.ButtonView.design({layout:{left:250,top:330,width:100,height:30},title:"Update",action:"submit",target:"Nvzn.accountController",isDefault:YES})})})})})});
Nvzn.loginPage=SC.Page.design({loginPane:SC.Pane.design({layout:{centerX:0,centerY:0,width:450,height:270},childViews:"logo prompt errorMessage loginLabel loginInput passLabel passInput submitButton".w(),classNames:"login",defaultResponder:"Nvzn.statechart",focusFrom:function(pane){console.log("loginPane FocusFrom",pane)
},logo:SC.ImageView.design({layout:{width:181,right:100,top:0,height:61},value:"/static/nvzn/en/dc172d581a126c35cf88d5cd29888f25c134b7a6/source/resources/image/envizion-logo.png"}),prompt:SC.LabelView.design({layout:{top:75,right:100},textAlign:SC.ALIGN_RIGHT,value:"Enter your user name and password below to login.",classNames:"black"}),errorMessage:SC.LabelView.design({layout:{top:95,left:10,height:20,width:300},classNames:["error-message"],textAlign:SC.ALIGN_RIGHT,valueBinding:"Nvzn.loginController.errorMessage"}),loginLabel:SC.LabelView.design({layout:{top:110,left:40,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>Login</h1>",classNames:"black"}),loginInput:SC.TextFieldView.design({layout:{left:150,top:110,width:200,height:30},applyImmediately:YES,hint:"site or employee",valueBinding:"Nvzn.loginController.loginInput"}),passLabel:SC.LabelView.design({layout:{left:40,top:150,width:95},escapeHTML:NO,textAlign:SC.ALIGN_RIGHT,value:"<h1>Password</h1>",classNames:"black"}),passInput:SC.TextFieldView.design({layout:{left:150,top:150,width:200,height:30},applyImmediately:YES,valueBinding:"Nvzn.loginController.passInput",isPassword:YES,hint:"*******"}),forgotPassLink:SC.LabelView.design({layout:{top:185,left:150},escapeHTML:NO,value:'<a style="color: black" href="#">Forgotten your login or password?</a>'}),submitButton:SC.ButtonView.design({layout:{left:250,top:220,width:100,height:24},isDefault:YES,supportFocusRing:YES,title:"Login",action:"submitLogin"}),cancelButton:SC.ButtonView.design({layout:{left:90,top:220,width:100,height:24},title:"Cancel"})})});
Nvzn.mainPage=SC.Page.create({tabView:SC.outlet("mainPane.pageView.mainView.contentView.tabView"),submit:SC.outlet("mainPane.pageView.mainView.footerView.submitButton"),header:SC.outlet("mainPane.pageView.mainView.headerView"),mainPane:SC.MainPane.design({calendar:SC.outlet("sidebarView.calendarView.calendarView"),tabView:SC.outlet("pageView.mainView.contentView.tabView"),childViews:"sidebarView pageView".w(),pageView:SC.View.extend({classNames:"page".w(),layout:{left:194,top:4,bottom:4,right:4,minWidth:875},childViews:"shadowView mainView".w(),shadowView:SC.View.extend({classNames:"page-shadow".w(),render:function(context){context.begin("div").addClass("top-left").end();
context.begin("div").addClass("top").end();context.begin("div").addClass("top-right").end();
context.begin("div").addClass("left").end();context.begin("div").addClass("right").end();
context.begin("div").addClass("bottom-left").end();context.begin("div").addClass("bottom").end();
context.begin("div").addClass("bottom-right").end()}}),mainView:SC.View.extend({classNames:"main".w(),layout:{top:9,left:17,right:12,bottom:9},childViews:"headerView contentView footerView".w(),headerView:SC.View.extend({classNames:"page-header".w(),layout:{height:100},childViews:("nameLabel nameView dateLabel dateView contactLabel customerAddress contactView titleView greetingLabel logoutButton").w(),titleView:SC.LabelView.extend({layout:{width:300,top:70,centerX:0,height:30},textAlign:SC.ALIGN_CENTER}),nameLabel:SC.View.extend({classNames:"label project".w(),isVisibleBinding:SC.Binding.from("Nvzn.isSite"),layout:{top:35,left:40,width:110,height:18},render:function(context,firstTime){return context.text("Name:")
}}),nameView:SC.View.extend(SC.ContentDisplay,{classNames:"header-name".w(),displayProperties:"content".w(),contentDisplayProperties:"displayName".w(),layout:{top:29,left:153,width:300,height:31},contentBinding:"Nvzn.selectedRecord",render:function(context){return context.text(this.getPath("content.displayName"))
}}),dateLabel:SC.View.extend({classNames:"label weekending".w(),layout:{top:35,left:394,width:90,height:18},render:function(context,firstTime){return context.text("Week Ending:")
}}),dateView:SC.View.extend({classNames:"date-value".w(),displayProperties:"content".w(),layout:{top:29,left:496,width:200,height:31},contentBinding:"Nvzn.weekEnding",render:function(context){var content=this.getPath("content");
var display=content?content.toFormattedString("%A, %d %B %Y"):"";return context.text(display)
}}),customerAddress:SC.View.extend(SC.ContentDisplay,{classNames:"header-address".w(),isVisibleBinding:"Nvzn.isEmployee",layout:{top:55,left:0.11,right:200,height:31},contentBinding:"Nvzn.customerController.fullAddress",render:function(context){context.push("<span class='label'>Site Address:</span> ");
return context.text(this.get("content"))}}),contactLabel:SC.View.extend({classNames:"label contact".w(),isVisibleBinding:SC.Binding.from("Nvzn.isSite"),layout:{top:81,left:10,width:110,height:18},render:function(context,firstTime){return context.text("Contact Details:")
}}),contactView:SC.View.extend({classNames:"header-contact".w(),layout:{top:77,left:130,right:20,height:24},displayProperties:"content".w(),contentDisplayProperties:"contactNumbers".w(),contentBinding:"Nvzn.selectedRecord",render:function(context){var numbers=this.getPath("content.contactNumbers");
return context.text(numbers?numbers.without(" ").join(", "):"")}}),greetingLabel:SC.LabelView.extend({layout:{right:10,width:300,height:24,top:15},textAlign:SC.ALIGN_RIGHT,valueBinding:SC.Binding.from("Nvzn.loginController.fullName").transform(function(value){return"You are logged in as: "+value
})}),logoutButton:SC.ButtonView.extend({classNames:"header-logout".w(),layout:{right:10,top:40,width:80,height:24},title:"Logout",target:Nvzn.statechart,action:"logout"})}),contentView:SC.View.extend({childViews:"tabView".w(),layout:{top:105},tabView:SC.TabView.extend({items:[],nowShowing:"all",itemTitleKey:"title",itemValueKey:"value",tabLocation:SC.BOTTOM_LOCATION,nowShowingDidChange:function(){Nvzn.statechart.sendEvent("tabDidChange")
}.observes("nowShowing"),createChildViews:function(){arguments.callee.base.apply(this,arguments);
this.containerView.adjust({border:0,bottom:44});this.segmentedView.adjust({height:44});
var indicator=this.createChildView(SC.View.extend({classNames:["indicator"],layout:{left:0,width:20,height:12,bottom:32}}));
this.set("indicatorView",indicator);this.appendChild(indicator)},didAppendToDocument:function(){this.segmentedView.$().css("textAlign","left");
this._animateIndicator()},_animateIndicator:function(){var nowShowing=this.get("nowShowing"),tab=this.segmentedView.get("childViews").toArray().find(function(v){return v.get("value")==nowShowing
});if(tab){var frame=tab.get("frame"),newLeft=frame?frame.x+(frame.width/2)-10:50;
this.indicatorView.animate("left",newLeft,{duration:0.3,timing:"ease"})}}.observes("nowShowing")})}),footerView:SC.View.extend({classNames:["page-footer"],childViews:"submitButton".w(),layout:{bottom:0,right:0,width:320,height:44},saveButton:SC.ButtonView.extend({layout:{centerY:0,right:140,height:24,width:80},target:Nvzn.statechart,action:"saveRoster",title:"Save"}),submitButton:SC.ButtonView.extend({layout:{centerY:0,right:40,height:24,width:120},target:Nvzn.statechart,action:"submit",title:"Submit Approvals"})})})}),sidebarView:SC.View.extend({classNames:"sidebar".w(),layout:{width:210},childViews:"logo calendarView jobsView".w(),logo:SC.View.extend({layout:{height:70},didCreateLayer:function(){var el=this.$()[0];
el.title=Nvzn.VERSION}}),calendarView:SC.View.extend({layout:{top:70,height:240},childViews:"headerView todayButtonView calendarView".w(),headerView:SC.View.extend({classNames:"sidebar-calendar-header".w(),layout:{height:16,left:13,width:80},render:function(context,firstTime){return context.addClass("sidebar-header").text("TIMESHEETS")
}}),todayButtonView:SC.ButtonView.extend({classNames:"sidebar-calendar-today-button".w(),layout:{height:16,width:80,right:20},target:SC.outlet("parentView.calendarView"),action:"selectToday",render:function(context,firstTime){return context.addClass("sidebar-today-button").text("Today")
}}),calendarView:SCUI.CalendarView.extend({layout:{left:2,top:18},selectedDateFollowsVisibleMonth:YES,weekStartMonday:YES,selectedDateBinding:"Nvzn.selectedDate"})}),jobsView:SC.View.extend({layout:{top:300},childViews:"headerView listView".w(),headerView:SC.View.extend({classNames:"sidebar-jobs-header".w(),layout:{height:16,left:13,width:80},render:function(context,firstTime){return context.text("Where")
}}),editView:SC.View.extend({classNames:"sidebar-jobs-edit".w(),layout:{height:16,width:80,right:20},render:function(context,firstTime){return context.text("Edit")
}}),listView:SC.ScrollView.extend({layout:{top:20,bottom:13,right:13},contentView:SC.ListView.extend({rowHeight:function(){return this.get("isEmployee")?45:31
}.property("isEmployee"),contentBinding:"Nvzn.customersController.arrangedObjects",controllerBinding:"Nvzn.customersController",isEmployeeBinding:SC.Binding.oneWay("Nvzn.isEmployee"),selectionBinding:"Nvzn.customersController.selection",exampleView:SC.ListItemView.extend({displayProperties:"isSelected".w(),classNames:"sidebar-jobs-list-item",render:function(context){var id=this.getPath("content");
if(this.get("isSelected")){context.addClass("sel")}var cust=this.getPath("owner.controller").byID(id);
var addr=cust?cust.get("fullAddress"):"";context.begin("div").addClass("sidebar-jobs-item-number").attr("title",addr).text(id).end();
if(this.getPath("owner.isEmployee")){context.begin("div").addClass("sidebar-jobs-item-name").attr("title",addr).text(addr).end()
}context.begin("span").addStyle("background-color",Nvzn.colorFor(this.get("content"))).end()
}})})})})})}),ohs_report:Nvzn.OhsReportView,all_employees:EO.TableView.design({columns:[{title:"",classNames:"customer",key:"customer",formatter:function(value){var color=Nvzn.colorFor(value);
return"<span style='background-color:%@'></span>".fmt(color)}},{title:"Employee",classNames:"name",key:"fullName"},{title:function(){return Nvzn.dateFromStart(0)
}.property(),classNames:"day mon",key:1,formatter:Nvzn.TimeCard.fieldFormatter},{title:function(){return Nvzn.dateFromStart(1)
}.property(),classNames:"day tue",key:2,formatter:Nvzn.TimeCard.fieldFormatter},{title:function(){return Nvzn.dateFromStart(2)
}.property(),classNames:"day wed",key:3,formatter:Nvzn.TimeCard.fieldFormatter},{title:function(){return Nvzn.dateFromStart(3)
}.property(),classNames:"day thu",key:4,formatter:Nvzn.TimeCard.fieldFormatter},{title:function(){return Nvzn.dateFromStart(4)
}.property(),classNames:"day fri",key:5,formatter:Nvzn.TimeCard.fieldFormatter},{title:function(){return Nvzn.dateFromStart(5)
}.property(),classNames:"day sat",key:6,formatter:Nvzn.TimeCard.fieldFormatter},{title:function(){return Nvzn.dateFromStart(6)
}.property(),classNames:"day sun",key:0,formatter:Nvzn.TimeCard.fieldFormatter},{title:"",classNames:"tick-all",key:"selected"}].map(function(hash){return EO.TableColumn.create(hash)
}),contentBinding:"Nvzn.employeesController.arrangedObjects",selectedBinding:"Nvzn.selectedRecord",cellEditorFinished:function(item,value,target){var matches=target.id.match(/tc-(\w)-(\d+)/),start=matches[1]==="s",storeKey=parseInt(matches[2],10);
Nvzn.statechart.sendEvent("valueChanged",storeKey,[start,value])},click:function(evt){var target=evt.target;
if(target.className.indexOf("approve")>=0){var storeKey=parseInt(target.getAttribute("storeKey"),10);
Nvzn.statechart.sendEvent("clickedApprove",storeKey)}else{if(target.className.indexOf("name")){var idx=target.parentNode.getAttribute("tvidx");
var content=this.get("content");var item=content.objectAt(idx);this.set("selected",item)
}}}}),approve_tc:SC.outlet("all_employees"),sites_by_week:Nvzn.WeeklyView.design({contentBinding:"Nvzn.timeCardsByWeekController.arrangedObjects",weeksToShowBinding:"Nvzn.timeCardsByWeekController.weeksToShow"}),all_sites:EO.TableView.design({columns:[{title:"Site",classNames:"name",key:"id"},{title:"Mon",classNames:"day mon",key:1},{title:"Tue",classNames:"day tue",key:2},{title:"Wed",classNames:"day wed",key:3},{title:"Thu",classNames:"day thu",key:4},{title:"Fri",classNames:"day fri",key:5},{title:"Sat",classNames:"day sat",key:6},{title:"Sun",classNames:"day sun",key:0}].map(function(hash){return EO.TableColumn.create(hash)
}),contentBinding:"Nvzn.employeeController.customerTimecards",click:function(evt){var employeeId=evt.target.parentElement.getAttribute("row-id");
if(!employeeId){return}}})});Nvzn.prefsPage=SC.Page.design({employeePrefsPane:SC.PanelPane.design({contentView:SC.View.design({classNames:"main-container".w(),borderStyle:SC.BORDER_GRAY,backgroundColor:"#dedede",layout:{centerY:-20,centerX:0,width:500,height:400},childViews:"leftLabel left rightLabel right cancelButton saveButton".w(),leftLabel:SC.LabelView.design({layout:{top:12,left:20,height:18,width:220},valueBinding:SC.Binding.transform(function(value){return"All Employees (%@)".fmt(value)
}).from("Nvzn.employeesController.length"),localize:YES}),left:SC.ScrollView.design({layerId:"employee-left",layout:{top:32,left:20,bottom:48,width:220},contentView:SC.ListView.design({contentBinding:"Nvzn.employeesController.arrangedObjects",selectionBinding:"Nvzn.employeesController.selection",delegate:Nvzn.employeeDragController,contentValueKey:"fullName",hasContentIcon:YES,contentIconKey:"icon",rowHeight:32,canReorderContent:YES,isDropTarget:YES,action:"doubleClickedEmployees",target:Nvzn})}),rightLabel:SC.LabelView.design({layout:{right:20,top:12,height:18,width:220},valueBinding:SC.Binding.transform(function(value){return"My Employees (%@)".fmt(value)
}).from("Nvzn.myEmployeesController.length"),localize:YES}),right:SC.ScrollView.design({layerId:"employee-right",layout:{right:20,top:32,bottom:48,width:220},contentView:SC.ListView.design({contentBinding:"Nvzn.myEmployeesController.arrangedObjects",selectionBinding:"Nvzn.employeesController.selection",delegate:Nvzn.employeeDragController,contentValueKey:"fullName",hasContentIcon:YES,contentIconKey:"icon",rowHeight:32,canDeleteContent:YES,canReorderContent:YES,isDropTarget:YES})}),cancelButton:SC.ButtonView.design({layout:{width:100,height:24,bottom:10,right:140},title:"Cancel",target:Nvzn.statechart,action:"cancel"}),saveButton:SC.ButtonView.design({layout:{width:100,height:24,bottom:10,right:20},title:"Save",target:Nvzn.statechart,action:"save"})})})});
Nvzn.rosterPage=SC.Page.create({mainContentView:SC.outlet("containerView.bottomRightView"),containerView:SC.SplitView.design({classNames:"container-view",layoutDirection:SC.LAYOUT_HORIZONTAL,layout:{left:0,top:20,right:0,bottom:0},defaultThickness:0.15,topLeftMinThickness:100,topLeftMaxThickness:200,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,dividerThickness:2,dividerView:SC.SplitDividerView,topLeftView:SC.View.design({childViews:"when loading prev next weekEnding place where".w(),backgroundColor:"#f6f6f6",when:SC.LabelView.design({layout:{left:10,width:80,top:10,height:24},classNames:"title",value:"When",icon:"when"}),loading:SC.ImageView.design({layout:{top:10,right:15,width:16,height:16},value:"/static/nvzn/en/dc172d581a126c35cf88d5cd29888f25c134b7a6/source/resources/image/loading-spinner.gif",isVisibleBinding:"Nvzn.rosterController.loading"}),prev:SC.ButtonView.design({layout:{left:5,top:45,width:75},title:"Prev",isEnabledBinding:SC.Binding.not("Nvzn.rosterController.loading"),icon:"/static/nvzn/en/dc172d581a126c35cf88d5cd29888f25c134b7a6/source/resources/image/up.png",action:"prev_week"}),next:SC.ButtonView.design({layout:{right:5,top:45,width:75},title:"Next",isEnabledBinding:SC.Binding.not("Nvzn.rosterController.loading"),icon:"/static/nvzn/en/dc172d581a126c35cf88d5cd29888f25c134b7a6/source/resources/image/down.png",action:"next_week"}),weekEnding:SC.LabelView.design({layout:{left:10,right:10,top:80,height:24},isVisibleBinding:SC.Binding.not("Nvzn.rosterController.loading"),valueBinding:SC.Binding.from("Nvzn.customerController.finish").transform(function(value){return"Week ending "+value
})}),place:SC.LabelView.design({layout:{left:10,width:150,top:100,height:24},classNames:"title",value:"Where",icon:"flag-yellow"}),where:SC.ListView.design({layout:{top:135},backgroundColor:"#f6f6f6",contentBinding:"Nvzn.customersController",selectionBinding:"Nvzn.customersController.selection"})}),bottomRightView:SC.SplitView.design({layoutDirection:SC.LAYOUT_VERTICAL,autoresizeBehavior:SC.RESIZE_TOP_LEFT,bottomRightMinThickness:200,bottomRightMaxThickness:300,dividerThickness:2,defaultThickness:0.3,topLeftView:Nvzn.UpcomingView.extend({contentBinding:"Nvzn.rosterContent",selectionBinding:"Nvzn.siteController.content"}),dividerView:SC.SplitDividerView,bottomRightView:Nvzn.InfoView.extend({contentBinding:"Nvzn.siteController",contentTypeBinding:"Nvzn.loginController.role"})})})});
Nvzn.main=function main(){Nvzn.statechart.initStatechart()};function main(){Nvzn.main()
};