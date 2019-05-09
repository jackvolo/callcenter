<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><!--{{{1-->
<?php require_once("authorize.php") ?>
<?php $operator = $_SERVER[REMOTE_USER]; ?>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <meta content="utf-8" http-equiv="encoding">
  <title>Test Call Center &mdash; Volo Broadband&trade;</title>
  <link href="testcallcenter.css" rel="stylesheet" type="text/css" media="screen,print"/>
  <link type="text/css" rel="stylesheet" href="jquery.autocomplete.css"/>
</head>

<body>
<!--}}}1-->
<div id="container">

    <div id="panels">
        <div id="i" class="panel"><!--{{{1-->
            <div id="top-buttons">
                <label>Start Over:</label>
                <span class="wrapper"><a id="new-call" href="#">New Call</a></span>
                <span class="wrapper"><a id="restart-call" href="#">This Call</a></span>
            </div>
            <h3>Volo Call Center Script</h3>
            <div class="panel-content">
            </div>
        </div><!--#i }}}-->

        <div id="o" class="panel"><!--{{{1-->
            <div class="panel-content">
                <fieldset id="upcomingTickets" class="info"><!--{{{2-->
		    <legend>Upcoming Tickets</legend>
                    <div id="immediateTickets" class="tickets">
                        <p>This is stuff</p>
                    </div>
                    <div id="todayTickets" class="tickets">
                        <p>This is stuff</p>
                    </div>
                    <div id="normalTickets" class="tickets">
                        <p>This is stuff</p>
                    </div>
                </fieldset>
                <fieldset id="f-caller-info"><!--{{{2-->
                    <legend>Caller Information</legend>
                    <div class="element" id="r-ticket">
                        <label for="v-ticket">Ticket #</label>
                        <div class="value">
                            <input type="text" name="v-ticket" id="v-ticket" size="4"/>
                        </div>
                    </div>
                    <div class="element" id="r-calltime">
                        <label for="v-calltime">Time of call</label>
                        <div class="value">
                            <input type="text" name="v-calltime" id="v-calltime" size="8" class="time"/>
                        </div>
                    </div>
                    <div class="element" id="r-callerphone">
                        <label for="v-callerphone">Caller ID</label>
                        <div class="value">
                            <input type="text" name="v-callerphone" id="v-callerphone" size="10" class="phone"/>
                        </div>
                    </div>
                    <div class="element" id="r-firstname">
                        <label for="v-firstname">First name</label>
                        <div class="value">
                            <input type="text" name="v-firstname" id="v-firstname" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-lastname">
                        <label for="v-lastname">Last name</label>
                        <div class="value">
                            <input type="text" name="v-lastname" id="v-lastname" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-serviceaddress">
                        <label for="v-serviceaddress">Service addr</label>
                        <div class="value">
                            <input type="text" name="v-serviceaddress" id="v-serviceaddress" size="18"/>
                        </div>
                    </div>
                    <div class="element" id="r-aptunit">
                        <label for="v-aptunit">Apt #</label>
                        <div class="value">
                            <input type="text" name="v-aptunit" id="v-aptunit" size="18"/>
                        </div>
                    </div>
                    <div class="element" id="r-servicezip">
                        <label for="v-servicezip">Zip code</label>
                        <div class="value">
                            <input type="text" name="v-servicezip" id="v-servicezip" size="5" class="zip"/>
                        </div>
                    </div>
                    <div class="element" id="r-servicecity">
                        <label for="v-servicecity">City</label>
                        <div class="value">
                            <input type="text" name="v-servicecity" id="v-servicecity" size="5" class="city"/>
                        </div>
                    </div>
                    <div class="element" id="r-billingemail">
                        <label for="v-billingemail">Billing Email</label>
                        <div class="value">
                            <input type="text" name="v-billingemail" id="v-billingemail" size="5" class="email"/>
                        </div>
                    </div>
                </fieldset>

                <fieldset id="f-account-info"><!--{{{2-->
                    <legend>Account Information</legend>
                    <div class="element" id="r-customer">
                        <label for="v-customer">Account #</label>
                        <div class="value">
                            <input type="text" name="v-customer" id="v-customer" size="6" class="account"/>
                        </div>
                    </div>
                    <div class="element" id="r-accountpassword">
                        <label for="v-accountpassword">Password</label>
                        <div class="value">
                            <input type="text" name="v-accountpassword" id="v-accountpassword" size="6" class="password"/>
                        </div>
                    </div>
                    <div class="element" id="r-balance">
                        <label for="v-balance">Balance</label>
                        <div class="value">
                            <input type="text" name="v-balance" id="v-balance" size="6" class="balance"/>
                        </div>
                    </div>
                </fieldset>

                <fieldset id="f-service-info"><!--{{{2-->
                    <legend>Service Information</legend>
                    <div class="element" id="r-ip">
                        <label for="v-ip">IP address</label>
                        <div class="value">
                            <input type="text" name="v-ip" id="v-ip" size="15" class="ip"/>
                        </div>
                    </div>
                    <div class="element" id="r-service">
                        <label for="v-service">Service</label>
                        <div class="value">
                            <input type="text" name="v-service" id="v-service" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-tncplan">
                        <label for="v-tncplan">TNC Plan</label>
                        <div class="value">
                            <input type="text" name="v-tncplan" id="v-tncplan" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-winfieldplan">
                        <label for="v-winfieldplan">Winfield Plan</label>
                        <div class="value">
                            <input type="text" name="v-winfieldplan" id="v-winfieldplan" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-baileyplan">
                        <label for="v-baileyplan">Bailey Plan</label>
                        <div class="value">
                            <input type="text" name="v-baileyplan" id="v-baileyplan" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-company">
                        <label for="v-company">Company</label>
                        <div class="value">
                            <input type="text" name="v-company" id="v-company" size="18"/>
                        </div>
                    </div>
                    <div class="element" id="r-activated">
                        <label for="v-activated">Activated On</label>
                        <div class="value">
                            <input type="text" name="v-activated" id="v-activated" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-deactivated">
                        <label for="v-deactivated">Deactivated On</label>
                        <div class="value">
                            <input type="text" name="v-deactivated" id="v-deactivated" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-servicestart">
                        <label for="v-servicestart">Date</label>
                        <div class="value">
                            <input type="text" name="v-servicestart" id="v-servicestart" size="20"/>
                        </div>
                    </div>
                </fieldset><!--2}}}-->

                <fieldset id="f-other-info"><!--{{{2-->
                    <legend>Other Information</legend>
                    <div class="element" id="r-call-id">
                        <label for="v-ticket">Call ID</label>
                        <div class="value">
                            <input type="text" name="v-call-id" id="v-call-id" size="4"/>
                        </div>
                    </div>
                    <div class="element" id="r-operator">
                        <label for="v-operator">Operator</label>
                        <div class="value">
                            <input type="text" name="v-operator" id="v-operator" size="15" value="<?= $operator ?>"/>
                        </div>
                    </div>
                    <div class="element" id="r-phone">
                        <label for="v-phone">Phone</label>
                        <div class="value">
                            <input type="text" name="v-phone" id="v-phone" size="10" class="phone"/>
                        </div>
                    </div>
                    <div class="element" id="r-username">
                        <label for="v-username">Username</label>
                        <div class="value">
                            <input type="text" name="v-username" id="v-username" size="10" class="username"/>
                        </div>
                    </div>
                    <div class="element" id="r-email">
                        <label for="v-email">Email</label>
                        <div class="value">
                            <input type="text" name="v-email" id="v-email" size="5" class="email"/>
                        </div>
                    </div>
                    <div class="element" id="r-password">
                        <label for="v-password">Password</label>
                        <div class="value">
                            <input type="text" name="v-password" id="v-password" size="20" class="password"/>
                        </div>
                    </div>
                    <div class="element" id="r-messagetype">
                        <label for="v-messagetype">Type of message</label>
                        <div class="value">
                            <input type="text" name="v-messagetype" id="v-messagetype" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-forwhom">
                        <label for="v-forwhom">Message is for</label>
                        <div class="value">
                            <input type="text" name="v-forwhom" id="v-forwhom" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-problem">
                        <label for="v-problem">Problem Type</label>
                        <div class="value">
                            <textarea name="v-problem" id="v-problem" rows="3" cols="30"></textarea>
                        </div>
                    </div>
                    <div class="element" id="r-message">
                        <label for="v-message">Message</label>
                        <div class="value">
                            <textarea name="v-message" id="v-message" rows="4" cols="30"></textarea>
                        </div>
                    </div>
                    <div class="element" id="r-eta">
                        <label for="v-eta">ETA</label>
                        <div class="value">
                            <textarea name="v-eta" id="v-eta" rows="4" cols="10"></textarea>
                        </div>
                    </div>
                    <div class="element" id="r-hour">
                        <label for="v-hour">Hour</label>
                        <div class="value">
                            <input type="text" name="v-hour" id="v-hour" size="5"/>
                        </div>
                    </div>
                    <div class="element" id="r-date">
                        <label for="v-date">Date</label>
                        <div class="value">
                            <input type="text" name="v-date" id="v-date" size="20"/>
                        </div>
                    </div>
                    <div class="element" id="r-sendtech">
                        <label for="v-sendtech">Send tech</label>
                        <div class="value">
                            <input type="text" name="v-sendtech" id="v-sendtech" size="20"/>
                        </div>
                    </div>
                    <div class="element" id="r-pingtime">
                        <label for="v-pingtime">Ping time</label>
                        <div class="value">
                            <input type="text" name="v-pingtime" id="v-pingtime" size="10" value="0"/>
                        </div>
                    </div>
                    <div class="element" id="r-speedtestdown">
                        <label for="v-speedtestdown">Speedtest Download</label>
                        <div class="value">
                            <input type="text" name="v-speedtestdown" id="v-speedtestdown" size="10" value="0"/>
                        </div>
                    </div>
                    <div class="element" id="r-speedtestup">
                        <label for="v-speedtestup">Speedtest Upload</label>
                        <div class="value">
                            <input type="text" name="v-speedtestup" id="v-speedtestup" size="10" value="0"/>
                        </div>
                    </div>
                    <div class="element" id="r-hasrouter">
                        <label for="v-hasrouter">Has router</label>
                        <div class="value">
                            <input type="text" name="v-hasrouter" id="v-hasrouter" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-phonetype">
                        <label for="v-phonetype">Phone type</label>
                        <div class="value">
                            <input type="text" name="v-phonetype" id="v-phonetype" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-minimumspeed">
                        <label for="v-minimumspeed">Minimum Speed</label>
                        <div class="value">
                            <input type="text" name="v-minimumspeed" id="v-minimumspeed" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-routerwifi">
                        <label for="v-routerwifi">Routerwifi</label>
                        <div class="value">
                            <input type="text" name="v-routerwifi" id="v-routerwifi" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-webproblemtype">
                        <label for="v-webproblemtype">Problem type</label>
                        <div class="value">
                            <input type="text" name="v-webproblemtype" id="v-webproblemtype" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-onecomputer">
                        <label for="v-onecomputer">Computers affected</label>
                        <div class="value">
                            <input type="text" name="v-onecomputer" id="v-onecomputer" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-callin">
                        <label for="v-callin">Calling in</label>
                        <div class="value">
                            <input type="text" name="v-callin" id="v-callin" />
                        </div>
                    </div>
                    <div class="element" id="r-callout">
                        <label for="v-callout">Calling out</label>
                        <div class="value">
                            <input type="text" name="v-callout" id="v-callout" />
                        </div>
                    </div>
                    <div class="element" id="r-voipreg">
                        <label for="v-voipreg">VoIP registration</label>
                        <div class="value">
                            <input type="text" name="v-voipreg" id="v-voipreg" />
                        </div>
                    </div>
                    <div class="element" id="r-referredby">
                        <label for="v-referredby">Heard about from or referred by</label>
                        <div class="value">
                            <input type="text" name="v-referredby" id="v-referredby" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-switchip">
                        <label for="v-switchip">Switch IP</label>
                        <div class="value">
                            <input type="text" name="v-switchip" id="v-switchip" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-switchport">
                        <label for="v-switchport">Switch Port</label>
                        <div class="value">
                            <input type="text" name="v-switchport" id="v-switchport" size="3"/>
                        </div>
                    </div>
                    <div class="element" id="r-urgency">
                        <label for="v-urgency">Urgency</label>
                        <div class="value">
                            <input type="text" name="v-urgency" id="v-urgency" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-cancelagain">
                        <label for="v-cancelagain">Cancel another service</label>
                        <div class="value">
                            <input type="text" name="v-cancelagain" id="v-cancelagain" />
                        </div>
                    </div>
                    <div class="element" id="r-retrieve">
                        <label for="v-retrieve">Make Retrieval Ticket</label>
                        <div class="value">
                            <input type="text" name="v-retrieve" id="v-retrieve" />
                        </div>
                    </div>
                    <div class="element" id="r-node">
                        <label for="v-node">Service</label>
                        <div class="value">
                            <input type="text" name="v-node" id="v-node" size="15"/>
                        </div>
                    </div>
                    <div class="element" id="r-aptservice">
                        <label for="v-aptservice">Service Level</label>
                        <div class="value">
                            <input type="text" name="v-aptservice" id="v-aptservice" size="10"/>
                        </div>
                    </div>
                    <div class="element" id="r-ncservice">
                        <label for="v-ncservice">Service Level</label>
                        <div class="value">
                            <input type="text" name="v-ncservice" id="v-ncservice" size="10"/>
                        </div>
                    </div>
                </fieldset>
            </div><!--2}}}-->

            <button id="start_chat">Open Chat</button>
            
        </div><!--#o }}}-->
    </div>

    <div id="inputs"><!--{{{1-->
        <div class="element input-ticket">
            <label for="ticket">Ticket #</label>
            <div class="input">
                <input type="text" name="ticket" id="ticket" size="4" class="ticket"/>
            </div>
        </div>
        <div class="element input-eta">
            <label for="eta">ETA</label>
            <div class="input">
                <input type="text" name="eta" id="eta" size="10" class="eta"/>
            </div>
        </div>
        <div class="element input-callerphone">
            <label for="callerphone">Caller ID</label>
            <div class="input">
                <input type="text" name="callerphone" id="callerphone" size="12" class="phone"/>
            </div>
        </div>
        <div class="element input-phone">
            <label for="phone">Phone</label>
            <div class="input">
                <input type="text" name="phone" id="phone" size="12" class="phone"/>
            </div>
        </div>
        <div class="element input-username">
            <label for="username">Username</label>
            <div class="input">
                <input type="text" name="username" id="username" size="12" class="username"/>
            </div>
        </div>
        <div class="element input-firstname">
            <label for="firstname">First name</label>
            <div class="input">
                <input type="text" name="firstname" id="firstname" size="10"/>
            </div>
        </div>
        <div class="element input-lastname">
            <label for="lastname">Last name</label>
            <div class="input">
                <input type="text" name="lastname" id="lastname" size="10"/>
            </div>
        </div>
        <div class="element input-serviceaddress">
            <label for="serviceaddress">Service address</label>
            <div class="input">
                <input type="text" name="serviceaddress" id="serviceaddress" size="27"/>
            </div>
            <label for="aptunit">Apt #</label>
            <div class="input">
                <input type="text" name="aptunit" id="aptunit" size="5"/>
                <button id="not_an_apartment">Not an apartment</button>
            </div>
            <label for="servicezip">Zip code</label>
            <div class="input">
                <input type="text" name="servicezip" id="servicezip" size="5" class="zip"/>
            </div>
        </div>
        <div class="element input-servicecity">
            <label for="servicecity">City</label>
            <div class="input">
                <input type="text" name="servicecity" id="servicecity" size="5" class="email"/>
            </div>
        </div>
        <div class="element input-billingemail">
            <label for="billingemail">Billing Email</label>
            <div class="input">
                <input type="text" name="billingemail" id="billingemail" size="5" class="email"/>
            </div>
        </div>
        <div class="element input-email">
            <label for="email">Email</label>
            <div class="input">
                <input type="text" name="email" id="email" size="20" class="email"/>
            </div>
        </div>
        <div class="element input-password">
            <label for="password">Password</label>
            <div class="input">
                <input type="text" name="password" id="password" size="20" class="password"/>
            </div>
        </div>
        <div class="element input-customer">
            <label for="customer">Account #</label>
            <div class="input">
                <input type="text" name="customer" id="customer" size="6" class="account"/>
            </div>
        </div>
        <div class="element input-accountpassword">
            <label for="accountpassword">Password</label>
            <div class="input">
                <input type="text" name="accountpassword" id="accountpassword" size="6" class="password"/>
            </div>
        </div>
        <div class="element input-balance">
            <label for="balance">Balance</label>
            <div class="input">
                <input type="text" name="balance" id="balance" size="6" class="balance"/>
            </div>
        </div>
        <div class="element input-service">
            <label for="service">Service</label>
            <div class="input">
                <input type="text" name="service" id="service" size="15"/>
            </div>
        </div>
        <div class="element input-node">
            <label for="node">Node</label>
            <div class="input">
                <input type="text" name="node" id="node" size="6"/>
            </div>
        </div>
        <div class="element input-tncplan">
            <label for="tncplan">TNC Plan</label>
            <div class="input">
                <select name="tncplan" id="tncplan">
                    <option value="">&mdash; Select one &mdash;</option>
                    <option value="128">75 Mbs - $29.95/month</option>
                </select>
            </div>
        </div>
        <div class="element input-winfieldplan">
            <label for="winfieldplan">Winfield Plan</label>
            <div class="input">
                <select name="winfieldplan" id="winfieldplan">
                    <option value="">&mdash; Select one &mdash;</option>
                    <option value="59">250 MB/day - $20/month</option>
                    <option value="60">500 MB/day - $25/month</option>
                    <option value="61">Bulk (unlimited) - $25/month</option>
                </select>
            </div>
        </div>
        <div class="element input-baileyplan">
            <label for="baileyplan">Bailey Plan</label>
            <div class="input">
                <select name="baileyplan" id="baileyplan">
                    <option value="">&mdash; Select one &mdash;</option>
                    <option value="178">Apt 10 - $19.95 per month</option>
                    <option value="195">Light Usage - $29.95 per month</option>
                    <option value="196">Medium Usage - $49.95 per month</option>
                    <option value="194">Heavy Usage - $59.95 per month</option>
                    <option value="168">Medium Prepay - $500 one time (20% savings!)</option>
                    <option value="169">Heavy Prepay - $600 one time (20% savings!)</option>
                </select>
            </div>
        </div>
        <div class="element input-ip">
            <label for="ip">IP address</label>
            <div class="input">
                <input type="text" name="ip" id="ip" size="15" class="ip"/>
            </div>
        </div>
        <div class="element input-company">
            <label for="company">Company</label>
            <div class="input">
                <input type="text" name="company" id="company" size="10"/>
            </div>
        </div>
        <div class="element input-activated">
            <label for="activated">Activated On</label>
            <div class="input">
                <input type="date" name="activated" id="activated" size="10"/>
            </div>
        </div>
        <div class="element input-deactivated">
            <label for="deactivated">Deactivated On</label>
            <div class="input">
                <input type="date" name="deactivated" id="deactivated" size="10"/>
            </div>
        </div>
        <div class="element input-calltime">
            <label for="calltime">Time of call</label>
            <div class="input">
                <input type="text" name="calltime" id="calltime" size="7" class="time"/>
            </div>
        </div>
        <div class="element input-hour">
            <label for="hour">Desired hour</label>
            <select name="hour" id="hour">
              <option value="">&mdash; Select one &mdash;</option>
              <option value="09">9:00  AM</option>
              <option value="10">10:00 AM</option>
              <option value="11">11:00 AM</option>
              <option value="12">12:00 PM</option>
              <option value="13">1:00  PM</option>
              <option value="14">2:00  PM</option>
              <option value="15">3:00  PM</option>
              <option value="16">4:00  PM</option>
              <option value="17">5:00  PM</option>
            </select>
        </div>
        <div class="element input-date">
            <label for="date">Desired date</label>
            <div class="input">
                <input type="date" name="date" id="date" size="20" class="date"/>
            </div>
        </div>
        <div class="element input-sendtech">
            <label for="sendtech">Send Tech</label>
            <div class="input">
                <input type="text" name="sendtech" id="sendtech" size="20" class="sendtech"/>
            </div>
        </div>
        <div class="element input-messagetype">
            <label for="messagetype">Type of message</label>
            <div class="input">
                <select name="messagetype" id="messagetype">
                    <option value="">&mdash; Select one &mdash;</option>
                    <option>Technical</option>
                    <option>Sales</option>
                    <option>Web hosting</option>
                    <option>Billing and accounts</option>
                    <option>Other</option>
                </select>
            </div>
        </div>
        <div class="element input-forwhom">
            <label for="forwhom">Message is for</label>
            <div class="input">
                <select name="forwhom" id="forwhom">
                    <option value="">Anyone</option>
                    <option>Tony</option>
                    <option>Peter</option>
                    <option>Thomas</option>
                    <option>Kevin</option>
                    <option>Kristin</option>
                    <option>Mike Thrash</option>
                    <option>Scott Thrash</option>
                    <option>Darren (Champaign Computers)</option>
                    <option>Tammy</option>
                </select>
            </div>
        </div>
        <div class="element input-problem">
            <label for="problem">Problem Type</label>
            <div class="input">
                <textarea name="problem" id="problem" rows="3" cols="30"></textarea>
            </div>
        </div>
        <div class="element input-message">
            <label for="message">Message</label>
            <div class="input">
                <textarea name="message" id="message" rows="4" cols="30"></textarea>
            </div>
        </div>
        <div class="element input-pingtime">
            <label for="pingtime">Ping time</label>
            <div class="input">
                <input type="text" name="pingtime" id="pingtime" size="10" value="0"/>
            </div>
        </div>
        <div class="element input-speedtestdown">
            <label for="speedtestdown">Speedtest Download</label>
            <div class="input">
                <input type="text" name="speedtestdown" id="speedtestdown" size="10" value="0"/>
            </div>
        </div>
        <div class="element input-speedtestup">
            <label for="speedtestup">Speedtest Upload</label>
            <div class="input">
                <input type="text" name="speedtestup" id="speedtestup" size="10" value="0"/>
            </div>
        </div>
        <div class="element input-hasrouter">
            <label for="hasrouter">Has router</label>
            <div class="input">
                <select name="hasrouter" id="hasrouter">
                    <option>Don't know</option>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>
        </div>
        <div class="element input-phonetype">
            <label for="phonetype">Phone type</label>
            <div class="input">
                <select name="phonetype" id="phonetype">
                    <option selected disabled>Phone Type</option>
                    <option selected="selected">Grandstream</option>
                    <option>Polycom</option>
                    <option>Other</option>
                </select>
            </div>
        </div>
        <div class="element input-switchip">
            <label for="switchip">Switch IP</label>
            <div class="input">
                <input type="text" name="switchip" id="switchip" size="15"/>
            </div>
        </div>
        <div class="element input-switchport">
            <label for="switchport">Switch Port</label>
            <div class="input">
                <input type="text" name="switchport" id="switchport" size="3"/>
            </div>
        </div>
        <div class="element input-minimumspeed">
            <div class="input">
                <input type="hidden" name="minimumspeed" id="minimumspeed" />
            </div>
        </div>
        <div class="element input-routerwifi">
          <label for"routerwifi">Problem</label>
          <div class="input">
            <select name="routerwifi" id="routerwifi">
              <option value="direct">Direct connection</option>
              <option value="wired">Router wired</option>
              <option value="wifi">Router WiFi</option>
              <option value="volowifi">Provided WiFi</option>
            </select>
          </div>
        </div>
        <div class="element input-webproblemtype">
          <label for"webproblemtype">Problem</label>
          <div class="input">
            <select name="webproblemtype" id="webproblemtype">
              <option value="down">No service</option>
              <option value="slow">Slow service</option>
              <option value="comcast">Xfinity</option>
            </select>
          </div>
        </div>
        <div class="element input-onecomputer">
            <label for="onecomputer">Computers Impacted</label>
            <div class="input">
                <select name="onecomputer" id="onecomputer">
                    <option>Don't know</option>
                    <option>Only have one</option>
                    <option>One affected, one or more not affected</option>
                    <option>More than one, but not all</option>
                    <option>All affected</option>
                </select>
            </div>
        </div>
        <div class="element input-callin">
            <label for="callin">Calling In</label>
            <div class="input">
                <input type="checkbox" name="callin" id="callin" defaultValue="callin" value="callin" />
            </div>
        </div>
        <div class="element input-callout">
            <label for="callout">Calling out</label>
            <div class="input">
                <input type="checkbox" name="callout" id="callout" value="callout" />
            </div>
        </div>
        <div class="element input-voipreg">
            <label for="voipreg">Line Registered</label>
            <div class="input">
                <input type="checkbox" name="voipreg" id="voipreg" value="yes" />
            </div>
        </div>
        <div class="element input-referredby">
            <label for="referredby">Heard about from or referred by</label>
            <div class="input">
                <input type="text" name="referredby" id="referredby" size="30"/>
            </div>
        </div>
        <div class="element input-urgency">
            <label for="urgency">Urgency</label>
            <div class="input">
                <select name="urgency" id="urgency">
                    <option>Standard</option>
                    <option>Today</option>
                    <option>Immediate</option>
                </select>
            </div>
        </div>
        <div class="element input-cancelagain">
            <label for="cancelagain">Cancel another service</label>
            <div class="input">
                <select name="cancelagain" id="cancelagain" >
                    <option>No</option>
                    <option>Yes</option>
                </select>
            </div>
        </div>
        <div class="element input-retrieve">
            <label for="retrieve">Make Retrieval Ticket</label>
            <div class="input">
                <select name="retrieve" id="retrieve" >
                    <option>No</option>
                    <option>Yes</option>
                </select>
            </div>
        </div>
        <div class="element input-aptservice">
            <label for="aptservice">Service level</label>
            <div class="input">
                <select name="aptservice" id="aptservice">
                    <option selected>Choose Service Level</option>
                    <!--
                    <option value="189">Light</option>
                    <option value="190">Medium</option>
                    <option value="192">Heavy</option>
                    <option value="188">Apt 10</option>
                    --!>
                </select>
            </div>
        </div>
        <div class="element input-ncservice">
            <label for="ncservice">NC Service level</label>
            <div class="input">
                <select name="ncservice" id="ncservice">
                    <option selected>Choose Service Level</option>
                    <option value="203">Light</option>
                    <option value="204">Medium</option>
                    <option value="202">Heavy</option>
                    <option value="188">Apt 10</option>
                </select>
            </div>
        </div>
        <div class="element input-servicestart">
            <label for="servicestart">Service start date</label>
            <div class="input">
                <input type="date" name="servicestart" id="servicestart" size="20" class="servicestart"/>
            </div>
        </div>
        <div class="element input-operator">
            <label for="operator">Operator</label>
            <div class="input">
                <input type="text" name="operator" id="operator" size="15" value="<?= $operator ?>" />
            </div>
        </div>
    </div><!--#inputs }}}-->

</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script> 
<script type="text/javascript" src="testscreens.js"></script>
<script type="text/javascript" src="testcallcenter.js"></script>

<?php require_once(".includes.php") ?>
</body>

</html>

<!-- vim: set foldmethod=marker: -->
