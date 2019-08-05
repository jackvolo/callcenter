var debug=false || Boolean(document.location.search.match(/debug/));
var test=false  || Boolean(document.location.search.match(/test/));
var ALWAYS_SHOW_INPUTS=true; // Always, or only when not yet filled out?
var servicelevels = null;

$(function() { //{{{1
  $("#restart-call").click(function() {
    $("#i div.panel-content").empty();
    $("#o div.element input").add("#o div.element textarea")
      .not('#v-call-id, #v-calltime, #v-ticket').val('');
    servicelevels = null;
    show_screen('root');
    return(false);
  });
  
  $("#new-call").click(function() {
    $("#i div.panel-content").empty();
    $("#o div.element input").add("#o div.element textarea").val('');
    var $operator = $('#operator').val();
    //servicelevels = null;
    window.location.reload();
    $('#v-operator').val($operator);
    return(false);
  });
  
  $.ajaxSetup({
    url: 'https://volo.net/secure/cs/vbot'+(test?'_test':'')+'.cgi',
    type: 'GET',
    data: {USETHOMAS: 1},
    dataType: 'json',
    error: function(request, status, error) {
      if(debug) console.log("Error: "+error);
      if(debug) console.log('AJAX error: %o', this);
      var last_screen = $("#i div.screen:last-child").attr("sid");
      show_screen('roboterror');
    }
  });
  
  $("#v-calltime").val(new Date().format('H:i'));
  
  $.ajax({ data: { screen: 'root', debug: debug, timestamp: new Date().getTime() },
    success: function(response) {
      $('#v-call-id').val(response['v-call-id']);
    }
  });
  
  // Behaviors {{{2
  $('body').on('click', 'input.copy-caller-id', function() {
      $(this).parents('div.input').find('input.phone')
          .val($('#v-callerphone').val());
      $('#v-phone').val($('#v-callerphone').val());
      robot_check();
  });
  
  $('body').on('click', 'input.not-an-apartment', function() {
      $(this).parents('div.input').find('input.aptunit')
          .val("n/a");
      $('#v-aptunit').val("n/a");
      robot_check();
  });
  
  // SJB 2011.10.18
  $('body').on('click', 'input.fetch-addr', function() {
  	$(this).parents('div.input').find('input.phone').val($('#v-calleraddress').val());
  	$('#v-address').val($('#v-calleraddress').val());
  	robot_check();
  });

  $('body').on('click', 'div.screen a.back', function() {
    var $to=$(this).parents("div.screen");
    if(!$to.hasClass('screen-old')) $to=$to.prev();
    $to.nextAll().remove();
    // XXX would it be better to remove $me and re-show_screen?
    $to.removeClass('screen-old');
    $to.find('input, textarea, select').prop('disabled', false).removeClass('selected');
    return(false);
  });
  //}}}
  
  show_screen('root');
  $('#i div.screen:first-child').addClass('first-screen');
  
  if(debug) { //{{{2
      $('#r-call-id').add('#f-other-info').add('#f-account-info').show();
      $("#o div.panel-content").append('<input type="button" value="&laquo; Copy" id="copy"/>');
      $("#copy").click(function() {
          $("#i div.screen:last-child input").each(function() {
              if(debug) console.log($(this).attr('id')+": "+$(this.val()));
              $(this).val($("#v-"+$(this).attr('id')).val());
          });
          robot_check();
      });

      // Button to auto-fill caller info
      $("#o div.panel-content").append('<input type="button" value="Fill" id="fill"/>');
      $("#fill").click(function() {
          $("#v-calltime").val(new Date().format('H:i'));
          $("#v-firstname").val("Steve");
          $("#v-lastname").val("Severinghaus");
          $("#v-serviceaddress").val("312 W. Springfield Ave. #200");
          $("#v-servicezip").val("61801");
          $("#v-phone").val("217-367-8656");

          $("#v-account").val("314159");
          $("#v-password").val("password");

          $("#v-ip").val("64.198.215.72");
          $("#v-company").val("ACME Widgets");

          $("#v-forwhom").val("Peter");
          $("#v-message").val("Test message from the call center script.");
      });

      $("#o div.panel-content").append('<input type="button" value="Clear" id="clear"/>');
      $("#clear").click(function() {
          $("#o div.element input").add("#o div.element textarea").val('');
      });

      $("#o div.panel-content").append('<input type="button" value="Reload screens" id="rescreen"/>');
      $("#rescreen").click(function() {
          $.getScript("https://volo.net/secure/c2/screens.js");
      });

      // Button to jump to a specific screen
      $("#i h3").prepend('<input type="button" value="goto" id="goto"/>');
      $("#goto").attr('style', 'float: right;');
      $("#goto").click(function() {
          var id=prompt("Go to screen:", "robot");
          if(id) show_screen(id);
      });

      if(self.document.location.hash) {
          show_screen(unescape(self.document.location.hash.substring(1)));
      }
  } //}}}
  else {
      $("#o div.element input").add("#o div.element textarea").attr('disabled', true);
  }
}); //}}}

function show_screen(id, params, $s) { //{{{1
  var screen = screens[id];

  if(!screen) {
    show_screen('screenerror');
    $.ajax({ data: { screen: id } });
    return;
  }
  
  if(!$s)
  {
    // Disable past screens
    $("#i div.screen").addClass('screen-old');
    $("#i div.screen-old input, #i div.screen-old textarea, #i div.screen-old select").attr('disabled', true);
    
    // Add a new screen
    $("#i div.panel-content").append('<div class="screen">');
    var $s=$("#i div.screen:last-child").attr('sid', id).addClass('screen-'+id);
    if (screen.title)
        $s.append('<div class="screen-title">'+screen.title);
    if(debug && screen.title)
        $s.find('div.screen-title').attr('title', id);
  }
  
  if(debug) console.log("[show_screen] screen: "+id);
  var body=parameterize(screen.body, params); // Fill out parameters returned by robot
  
  // Include referenced screens
  var fregex=new RegExp(/\[screen:([a-z0-9]+)\]/);
  var fmatch;
  while(fmatch=fregex.exec(body)) {
    if(debug) console.log("[show_screen] "+fregex[1]);
    body=body.replace(fregex, parameterize(screens[fmatch[1]].body, params));
  }
  
  $s.append('<div class="screen-body">'+body);
  
  // Have input requirements already been satisfied?
  var satisfied=true;
  for(var i=0;screen.requires && i<screen.requires.length;i++) {
    var ds=true;
    for(var j=0;j<screen.requires[i].length;j++) {
      var field=screen.requires[i][j];
      if(!field.match(/\?$/) && !$("#v-"+field).val()) {
        ds=false;
        break;
      }
    }
    satisfied=ds;
    if(satisfied) break;
  }
  
  // Attach appropriate inputs if necessary
  for(var i=0;(ALWAYS_SHOW_INPUTS||!satisfied) && screen.requires && i<screen.requires.length;i++) {
    $s.append('<div class="input-set">');
    var $in=$s.find('div.input-set:last-child');
    for(var j=0;j<screen.requires[i].length;j++) {
      var field=screen.requires[i][j];
      var optional=field.match(/\?$/);
      field=field.replace(/\?$/, '');
      if(ALWAYS_SHOW_INPUTS||!$("#v-"+field).val()) {
        $in.append($("#inputs div.input-"+field).clone());
        $in.find("div.element:last-child").addClass(optional?'optional':'required');
        $in.find("div.element:last-child div.input > #"+field).val($("#v-"+field).val());
        //checkbox 
        $in.find("div.element:last-child div.input > #"+field).prop('checked', $("#v-"+field).val()?true:false);
      }
    }
    if(i!=screen.requires.length-1) {
        $s.append('<div class="input-set-separator">&mdash; or &mdash;</div>');
    }
  }
  
  if($('#v-callerphone').val()) {
    $s.find('input.phone').not('#callerphone').parents('div.input')
      .append('<input type="button" class="copy-caller-id" value="Copy Caller ID"/>');
  }
  $s.find('input.phone').not('#callerphone').parents('div.input')
    .append('<input type="button" class="copy-fetch-addr" value="Fetch Caller Info"/>'); //SJB
  
  if($('#v-username').val() && $s.find('input[name=serviceaddress]').length) {
    $.ajax({
      url: 'autocomplete/sites?q='+$('#v-username').val(),
      dataType: 'json',
      success: function(data) {
        var addresses = Array();
        for(var i in data) {
          addresses.push(data[i][0]);
        }
        $s.find('input[name=serviceaddress]').autocomplete(addresses);
      },
      error: function(request, status, error) {
        if(debug) console.log(error);
        if(debug) console.log('AJAX error: %o', this);
      },
    });
  }

  // Attach validation behavior to inputs
  behave($s);

  $s.append('<div class="buttons">');
  var $buttons=$s.find('div.buttons');
  for(var i=0;screen.buttonOrder && i<screen.buttonOrder.length;i++)
  {
    var tid=screen.buttonOrder[i];
    var target = screens[tid];
    var title = screen.buttons[tid];
    if(tid == title && target && target.title) title = target.title;
    
    add_button(id, $buttons, tid, title, screen.requires);
  }

  // Perform validation based on info we can pre-populate
  robot_check($s);
  
  $s.append('<a class="back" href="#">Go back</a>');
  
  // Scroll the left panel down to the very bottom
  $("#i div.panel-content").each(function() { this.scrollTop = this.scrollHeight; });
} //}}}

function parameterize(body, params) { //{{{1
    // Fill out parameters returned by robot
    for(var param in params) {
      if(param.match(/^v-/)) {
        if(debug) console.log("[parameterize]#"+param+": "+params[param]);
        $("#"+param).val(params[param]);
      }
      else if (param == 'servicelevels') {
        servicelevels = params[param];
        $('#aptservice').html('<option selected>Choose Service Level</option>');
        for (var $i in params[param]) {
          //if(debug) console.log("[parameterize]# "+params[param][$i][0]+": "+params[param][$i][2]);
          $('#aptservice').append('<option value="'+params[param][$i][0]+'">'+params[param][$i][2]+'</option>');
          //for (var $j in params[param][$i]) {
          //  if(debug) console.log("[parameterize]# "+params[param][$i][0]+"-"+$j+": "+params[param][$i][$j]);
          //}
        }
      }
      else {
        body = body.replace(new RegExp("%"+param), '<span class="param">'+params[param]+'</span>')
      }
    }
    body = body.replace(/%[A-Z]+/g, ''); // Remove optional parameters
    return(body);
} //}}}

function behave($s) { //{{{1
  if(!$s) $s=$("#i div.screen:last-child");

  // Perform validation of inputs and requirement checking for robot button.
  $s.find("div.input-set input, div.input-set textarea, div.input-set select").each(function() {
    $(this).change(function() {
      robot_check($(this).parents("div.screen"));
      // Copy valid value to info panel
      if(!$(this).hasClass('invalid')) {
        $("#r-"+$(this).attr('name')+" div.value :first-child").val($(this).val());
      }
      if($(this).attr('type') == 'checkbox') {
        if ($(this).is(":checked") || $(this).prop("checked")) {
          $("#r-"+$(this).attr('name')+" div.value :first-child").val($(this).attr('name'));
        }
      }
    });
    $(this).keypress(function() {
      // We don't have the proper value (including the key just
      // pressed) yet, so wait a bit and then do your thing.
      setTimeout('robot_check()', 10);
    });
    if ($(this).attr('name') == 'serviceaddress') {
      initAutocompleteAddress(this,$(this).closest('div.input-set').find('#servicezip')[0]);
    }
    if ($(this).attr('name') == 'unit') {
      var theUnit = this;
      $(this).next().click(function (){
        theUnit.value = 'n/a';
        $(theUnit).trigger('change');
      });
    }
  });
} //}}}

function robot_check($s) { //{{{1
  if(!$s) $s=$("#i div.screen:last-child");
  
  $s.find('div.input-set input, div.input-set textarea, div.input-set select').validate();
  
  var $b=$s.find("input.b-robot");
  if($s.find('div.input-set').length && 
     ($b.length || $s.find('input.b-root')) && 
     !$s.find(".invalid").length) 
  {
    var good_set=false;
    $s.find("div.input-set").each(function() {
      var requirements_met=true;
      $(this).find("div.required input, div.required textarea, div.required select").each(function() {
        if(!$(this).val()) requirements_met=false;
      });
      
      if(requirements_met) {
        $s.find("input.b-root").prop('disabled', false);
        $s.find("input.b-robot").prop('disabled', false);
        good_set=true;
        return;
      }
    });
    if(!good_set) {
      $b.val($b.attr('roboval')+' (fill out form)').prop('disabled', true);
      $s.find("input.b-root").prop('disabled', true);
    }
  }
} //}}}

function add_button(sid, $s, tid, title, requires) { //{{{1
  $s.append('<input type="button" value="'+title+'" class="b-'+tid+'"/>');
  var $b=$s.find("input:last-child").attr('tid', tid);
  
  if(tid == "robot") { //{{{2
    $b.val(title == 'Robot' ? 'Submit' : title).attr('roboval', $b.val());
    $b.click(function() {
      $(this).addClass('selected');
      var data=build_data(sid);
      $('div.screen:last-child input.b-robot').val("Waiting...").prop('disabled', true);
      $.ajax({ data: data,
        success: function(response) {
          if (debug) console.log("robot response: "+JSON.stringify(response));
          if(response.screen && screens[response.screen])
            show_screen(response.screen, response);
          else {
            show_screen(data.screen='screenerror');
            $.ajax({ data: data });
          }
        },
        complete: function(data, status) {
          $(this).val($(this).attr('roboval'));
        },
      });
    });
    $b.ajaxStop(function() {
        $(this).val($(this).attr('roboval'));
    });
  } //}}}2
  else if (tid == "schedule") { //{{{2
    var ticket = $('#v-ticket').val();
    if (!ticket) {
      return
    }
    $b.click(function() {
      $(this).addClass('selected');
      var data=build_data(sid);
      data.screen='norobot';
      data.button=$(this).attr('tid');
      $.ajax({ data: data,
        global: false,
        success: function(response) {
          for(var param in response) {
            if(param.match(/^v-/)) {
              $("#"+param).val(response[param]);
              if(debug) console.log("[add_button]#"+param+": "+response[param]);
            }
          }
          var $ids = [];
          $("#i div.screen:last-child input, #i div.screen:last-child select").each(function() {
            // copy info into input fields
            if($("#v-"+$(this).attr('id')).val()) {
              if ($(this).attr('type') == 'checkbox') {
                $(this).prop('checked', true);
              } else if ($(this).attr('type') != 'button') {
                $(this).val($("#v-"+$(this).attr('id')).val());
              }
            }
          });
          robot_check();
        },
      });
      
      show_screen($(this).attr('tid'));
    });
  } //}}}2
  else { //{{{2
    $b.click(function() {
      $(this).addClass('selected');
      var data=build_data(sid);
      data.screen='norobot';
      data.button=$(this).attr('tid');
      $.ajax({ data: data,
        global: false,
        success: function(response) {
          for(var param in response) {
            if(param.match(/^v-/)) {
              $("#"+param).val(response[param]);
              if(debug) console.log("[add_button]#"+param+": "+response[param]);
            }
          }
          var $ids = [];
          $("#i div.screen:last-child input, #i div.screen:last-child select").each(function() {
            // copy info into input fields
            if($("#v-"+$(this).attr('id')).val()) {
              if ($(this).attr('type') == 'checkbox') {
                $(this).prop('checked', true);
              } else if ($(this).attr('type') != 'button') {
                $(this).val($("#v-"+$(this).attr('id')).val());
              }
            }
          });
          robot_check();
        },
        complete: function(data, status) {
        },
      });
      
      show_screen($(this).attr('tid'));
    });
    if(sid == "root") {
      $b.val(title).attr('class', 'b-root');
      $b.val(title).attr('roboval', $b.val());
      $b.val(title).prop('disabled', true);
      $b.ajaxStop(function() {
        $(this).val($(this).attr('roboval'));
      });
    }
  } //}}}2
  
} //}}}

function build_data(sid) { //#{{{1
    var data={ 'call-id': $('#v-call-id').val(), screen: sid, timestamp: new Date().getTime() };
    $("#o div.element").each(function() {
        var field=$(this).attr('id').replace(/^r-/, '');
        if($("#v-"+field).val() && screens[sid].requires && screens[sid].requiresSet[field])
            data[field]=$("#v-"+field).val();
    });
    if (debug) console.log("[build_data] data: "+JSON.stringify(data));
    return data;
} //}}}

jQuery.fn.validate = function() { //{{{1
    return this.each(function() {
        var val=$(this).val();
        var valid=true;
        if(val) {
            if($(this).hasClass('ip'))
                valid=val.match(/^64\.198\.(214|215|255)\.[12]?[0-9]?[0-9]$/);
                if (!valid) {
                    valid=val.match(/^76\.191\.(16|17|18|19|20|21|22|23|24|25)\.[12]?[0-9]?[0-9]|208\.88\.20[0-2]\.[12]?[0-9]?[0-9]$/);
                }
            else if($(this).hasClass('zip'))
                valid=val.match(/^\d{5}$/);
            else if($(this).hasClass('account') || $(this).hasClass('ticket'))
                valid=val.match(/^\d{1,8}$/);
            else if($(this).hasClass('phone')) {
                val=val.replace(/[^0-9]/gi, '');
                valid=val.match(/^\d{10}$/);
                if(valid) {
                    $(this).val(val.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
                    if ($(this).val() == "217-367-8656") {
                        valid=false;
                    } else {
                        // XXX can this be generalized? what are the side-effects?
                        $("#r-"+$(this).attr('name')+" div.value :first-child").val($(this).val());
                    }
                }
            }
            else if(val.match(/^-+$/))
                valid=false;
            if($(this).attr('type') == 'date') {
                var val_timezone;
                var now = new Date();
                var date;
                if ($('#hour').val()) {
                    val_timezone = val + "T" + $('#hour').val() + ":00:00.000-0600";
                } else {
                    val_timezone = val + "T00:00:00.000-0600";
                    now.setHours(0);
                    now.setMinutes(0);
                    now.setSeconds(0);
                }
                date = new Date(val_timezone);
                if (date < now) {
                    valid=false;
                }
            }
        }
        if(valid) $(this).removeClass('invalid');
        else $(this).addClass('invalid');
    });
} //}}}

jQuery.fn.log = function(msg) { //{{{1
    if(debug) { msg ? console.log("%s: %o", msg, this) : console.log("%o", msg, this); }
    return this;
}; //}}}

// Date.prototype.format:{{{1
// a PHP date like function, for formatting date strings
// authored by Svend Tofte <www.svendtofte.com>
// the code is in the public domain
//
// see http://www.svendtofte.com/javascript/javascript-date-string-formatting/
// and http://www.php.net/date
//
// thanks to 
//  - Daniel Berlin <mail@daniel-berlin.de>,
//    major overhaul and improvements
//  - Matt Bannon,
//    correcting some stupid bugs in my days-in-the-months list!
//  - levon ghazaryan. pointing out an error in z switch.
//  - Andy Pemberton. pointing out error in c switch 
//
// input : format string
// time : epoch time (seconds, and optional)
//
// if time is not passed, formatting is based on 
// the current "this" date object's set time.
//
// supported switches are
// a, A, B, c, d, D, F, g, G, h, H, i, I (uppercase i), j, l (lowecase L), 
// L, m, M, n, N, O, P, r, s, S, t, U, w, W, y, Y, z, Z
// 
// unsupported (as compared to date in PHP 5.1.3)
// T, e, o

Date.prototype.format = function (input,time) {
    
    var daysLong =    ["Sunday", "Monday", "Tuesday", "Wednesday", 
                       "Thursday", "Friday", "Saturday"];
    var daysShort =   ["Sun", "Mon", "Tue", "Wed", 
                       "Thu", "Fri", "Sat"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr",
                       "May", "Jun", "Jul", "Aug", "Sep",
                       "Oct", "Nov", "Dec"];
    var monthsLong =  ["January", "February", "March", "April",
                       "May", "June", "July", "August", "September",
                       "October", "November", "December"];

    var switches = { // switches object
        
        a : function () {
            // Lowercase Ante meridiem and Post meridiem
            return date.getHours() > 11? "pm" : "am";
        },
        
        A : function () {
            // Uppercase Ante meridiem and Post meridiem
            return (this.a().toUpperCase ());
        },
    
        B : function (){
            // Swatch internet time. code simply grabbed from ppk,
            // since I was feeling lazy:
            // http://www.xs4all.nl/~ppk/js/beat.html
            var off = (date.getTimezoneOffset() + 60)*60;
            var theSeconds = (date.getHours() * 3600) + 
                             (date.getMinutes() * 60) + 
                              date.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00"+beat;
            if ((String(beat)).length == 2) beat = "0"+beat;
            return beat;
        },
        
        c : function () {
            // ISO 8601 date (e.g.: "2004-02-12T15:19:21+00:00"), as per
            // http://www.cl.cam.ac.uk/~mgk25/iso-time.html
            return (this.Y() + "-" + this.m() + "-" + this.d() + "T" + 
                    this.H() + ":" + this.i() + ":" + this.s() + this.P());
        },
        
        d : function () {
            // Day of the month, 2 digits with leading zeros
            var j = String(this.j());
            return (j.length == 1 ? "0"+j : j);
        },
        
        D : function () {
            // A textual representation of a day, three letters
            return daysShort[date.getDay()];
        },
        
        F : function () {
            // A full textual representation of a month
            return monthsLong[date.getMonth()];
        },
        
        g : function () {
           // 12-hour format of an hour without leading zeros, 1 through 12!
           if (date.getHours() == 0) {
               return 12;
           } else {
               return date.getHours()>12 ? date.getHours()-12 : date.getHours();
           }
       },
        
        G : function () {
            // 24-hour format of an hour without leading zeros
            return date.getHours();
        },
        
        h : function () {
            // 12-hour format of an hour with leading zeros
            var g = String(this.g());
            return (g.length == 1 ? "0"+g : g);
        },
        
        H : function () {
            // 24-hour format of an hour with leading zeros
            var G = String(this.G());
            return (G.length == 1 ? "0"+G : G);
        },
        
        i : function () {
            // Minutes with leading zeros
            var min = String (date.getMinutes ());
            return (min.length == 1 ? "0" + min : min);
        },
        
        I : function () {
            // Whether or not the date is in daylight saving time (DST)
            // note that this has no bearing in actual DST mechanics,
            // and is just a pure guess. buyer beware.
            var noDST = new Date ("January 1 " + this.Y() + " 00:00:00");
            return (noDST.getTimezoneOffset () == 
                    date.getTimezoneOffset () ? 0 : 1);
        },
        
        j : function () {
            // Day of the month without leading zeros
            return date.getDate();
        },
        
        l : function () {
            // A full textual representation of the day of the week
            return daysLong[date.getDay()];
        },
        
        L : function () {
            // leap year or not. 1 if leap year, 0 if not.
            // the logic should match iso's 8601 standard.
            // http://www.uic.edu/depts/accc/software/isodates/leapyear.html
            var Y = this.Y();
            if (         
                (Y % 4 == 0 && Y % 100 != 0) ||
                (Y % 4 == 0 && Y % 100 == 0 && Y % 400 == 0)
                ) {
                return 1;
            } else {
                return 0;
            }
        },
        
        m : function () {
            // Numeric representation of a month, with leading zeros
            var n = String(this.n());
            return (n.length == 1 ? "0"+n : n);
        },
        
        M : function () {
            // A short textual representation of a month, three letters
            return monthsShort[date.getMonth()];
        },
        
        n : function () {
            // Numeric representation of a month, without leading zeros
            return date.getMonth()+1;
        },
        
        N : function () {
            // ISO-8601 numeric representation of the day of the week
            var w = this.w();
            return (w == 0 ? 7 : w);
        },
        
        O : function () {
            // Difference to Greenwich time (GMT) in hours
            var os = Math.abs(date.getTimezoneOffset());
            var h = String(Math.floor(os/60));
            var m = String(os%60);
            h.length == 1? h = "0"+h:1;
            m.length == 1? m = "0"+m:1;
            return date.getTimezoneOffset() < 0 ? "+"+h+m : "-"+h+m;
        },
        
        P : function () {
            // Difference to GMT, with colon between hours and minutes
            var O = this.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },      
        
        r : function () {
            // RFC 822 formatted date
            var r; // result
            //  Thu         ,     21               Dec              2000
            r = this.D() + ", " + this.d() + " " + this.M() + " " + this.Y() +
            //    16          :    01          :    07               0200
            " " + this.H() + ":" + this.i() + ":" + this.s() + " " + this.O();
            return r;
        },

        s : function () {
            // Seconds, with leading zeros
            var sec = String (date.getSeconds ());
            return (sec.length == 1 ? "0" + sec : sec);
        },        
        
        S : function () {
            // English ordinal suffix for the day of the month, 2 characters
            switch (date.getDate ()) {
                case  1: return ("st"); 
                case  2: return ("nd"); 
                case  3: return ("rd");
                case 21: return ("st"); 
                case 22: return ("nd"); 
                case 23: return ("rd");
                case 31: return ("st");
                default: return ("th");
            }
        },
        
        t : function () {
            // thanks to Matt Bannon for some much needed code-fixes here!
            var daysinmonths = [null,31,28,31,30,31,30,31,31,30,31,30,31];
            if (this.L()==1 && this.n()==2) return 29; // ~leap day
            return daysinmonths[this.n()];
        },
        
        U : function () {
            // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
            return Math.round(date.getTime()/1000);
        },

        w : function () {
            // Numeric representation of the day of the week
            return date.getDay();
        },
        
        W : function () {
            // Weeknumber, as per ISO specification:
            // http://www.cl.cam.ac.uk/~mgk25/iso-time.html
        
            var DoW = this.N ();
            var DoY = this.z ();

            // If the day is 3 days before New Year's Eve and is Thursday or earlier,
            // it's week 1 of next year.
            var daysToNY = 364 + this.L () - DoY;
            if (daysToNY <= 2 && DoW <= (3 - daysToNY)) {
                return 1;
            }

            // If the day is within 3 days after New Year's Eve and is Friday or later,
            // it belongs to the old year.
            if (DoY <= 2 && DoW >= 5) {
                return new Date (this.Y () - 1, 11, 31).format("W");
            }
            
            var nyDoW = new Date (this.Y (), 0, 1).getDay ();
            nyDoW = nyDoW != 0 ? nyDoW - 1 : 6;

            if (nyDoW <= 3) { // First day of the year is a Thursday or earlier
                return (1 + Math.floor ((DoY + nyDoW) / 7));
            } else {  // First day of the year is a Friday or later
                return (1 + Math.floor ((DoY - (7 - nyDoW)) / 7));
            }
        },
        
        y : function () {
            // A two-digit representation of a year
            var y = String(this.Y());
            return y.substring(y.length-2,y.length);
        },        
        
        Y : function () {
            // A full numeric representation of a year, 4 digits
    
            // we first check, if getFullYear is supported. if it
            // is, we just use that. ppks code is nice, but wont
            // work with dates outside 1900-2038, or something like that
            if (date.getFullYear) {
                var newDate = new Date("January 1 2001 00:00:00 +0000");
                var x = newDate .getFullYear();
                if (x == 2001) {              
                    // i trust the method now
                    return date.getFullYear();
                }
            }
            // else, do this:
            // codes thanks to ppk:
            // http://www.xs4all.nl/~ppk/js/introdate.html
            var x = date.getYear();
            var y = x % 100;
            y += (y < 38) ? 2000 : 1900;
            return y;
        },

        
        z : function () {
            // The day of the year, zero indexed! 0 through 366
            var s = "January 1 " + this.Y() + " 00:00:00 GMT" + this.O();
            var t = new Date(s);
            var diff = date.getTime() - t.getTime();
            return Math.floor(diff/1000/60/60/24);
        },

        Z : function () {
            // Timezone offset in seconds
            return (date.getTimezoneOffset () * -60);
        }        
    
    }

    function getSwitch(str) {
        if (switches[str] != undefined) {
            return switches[str]();
        } else {
            return str;
        }
    }

    var date;
    if (time) {
        var date = new Date (time);
    } else {
        var date = this;
    }

    var formatString = input.split("");
    var i = 0;
    while (i < formatString.length) {
        if (formatString[i] == "%") {
            // this is our way of allowing users to escape stuff
            formatString.splice(i,1);
        } else {
            formatString[i] = getSwitch(formatString[i]);
        }
        i++;
    }
    
    return formatString.join("");
}


// Some (not all) predefined format strings from PHP 5.1.1, which 
// offer standard date representations.
// See: http://www.php.net/manual/en/ref.datetime.php#datetime.constants
//

// Atom      "2005-08-15T15:52:01+00:00"
Date.DATE_ATOM    = "Y-m-d%TH:i:sP";
// ISO-8601  "2005-08-15T15:52:01+0000"
Date.DATE_ISO8601 = "Y-m-d%TH:i:sO";
// RFC 2822  "Mon, 15 Aug 2005 15:52:01 +0000"
Date.DATE_RFC2822 = "D, d M Y H:i:s O";
// W3C       "2005-08-15 15:52:01+00:00"
Date.DATE_W3C     = "Y-m-d%TH:i:sP";
//}}}1

// vim:foldmethod=marker
