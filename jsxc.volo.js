
$('#start_chat').ready(function(){
    var operator = $('#operator').val();
    jsxc.init({
      root: '/jsxc/',
      xmpp: {
         url: 'https://volo.net/secure/jsxc/',
         jid: 'CSR@volo.net/' + operator,
         password: '19v0joij'
      },
    });
    
    jsxc.xmpp.login();
});
$(document).one('cloaded.roster.jsxc', function (){
    var operator = $('#operator').val();
    var room = 'volotalk@conference.volo.net';
    jsxc.muc.join(room, operator+" (CSR)",'broadband','VoloTalk',null,false,false);
    jsxc.gui.window.open(room);
    
    $('#operator').change(function(){
        var room = 'volotalk@conference.volo.net';
        jsxc.muc.leave(room);
        setTimeout(function (){
            var operator = $('#operator').val();
            jsxc.muc.join(room, operator+" (CSR)",'broadband','VoloTalk',null,false,false);
            jsxc.gui.window.open(room);
        },3000);
    });
});
