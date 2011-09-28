


http://www.xbos.co.uk/raws/

Powerforce 
http://www.rosterme.com.au/custom/go/go_timesheet_4c.html

Pending tasks
----

 - Status needs to be labels (pending, rejected, confirmed, signed-in? completed?)
 - Job detail view properties needs to stand out and formatted.
 - Additional actions (confirm, reject, signin, signout)
 - Sidebar when/where
 - start/end field needs to combine into shift
 - roster item needs date field
 - signin_at, signout_at



Questions
===

 - Is field "shift" always within the same day, thus time object is sufficient? Or we need to use datetime data type for shift
 
 - What is "RAWS ID"? is this a job or project id? at the moment it looks like a abbreviated unique id of the job site.
 
 - we are seeing the following actions available when right clicked on the roster item in "xbos.co.uk/raws" website (signin, signout, welfare check, operator note, cold start)
 
 While signin, signout are both self-explanatory but please confirm the semantic of each event. It is important to understand these events to design a suitable user interface.

Events

 signin - Employee signin a job at job site
 signout - Employee signs out when he leaves job site
 operator note - Employee leaves a note about this job assignment
 welfare check - ????
 cold start - ???