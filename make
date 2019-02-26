#!/usr/bin/perl

open(HTML, "callcenter.php");
while(<HTML>) {
    if(/callcenter.css/) {
        print "<style type=\"text/css\">\n";
        print `cat callcenter.css`;
        print '</style>'."\n";
    }
    if(/jquery.autocomplete.css/) {
        print "<style type=\"text/css\">\n";
        print `cat jquery.autocomplete.css`;
        print '</style>'."\n";
    }
    elsif(/callcenter.js/) {
        print "<script type=\"text/javascript\">\n//<![CDATA[\n";
        print `cat callcenter.js`;
        print "//]]>\n</script>\n";
    }
    elsif(/jquery.autocomplete.js/) {
        print "<script type=\"text/javascript\">\n//<![CDATA[\n";
        print `cat jquery.autocomplete.js`;
        print "//]]>\n</script>\n";
    }
    elsif(/screens.js/) {
        print "<script type=\"text/javascript\">\n//<![CDATA[\n";
        print `cat screens.js`;
        print "//]]>\n</script>\n";
    }
    else {
        print;
    }
}

