<?php
    if (!$_SERVER['PHP_AUTH_USER']) {
        header('WWW-Authenticate: Basic realm="Contracker Login"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'You have to be authenticated to get at the contracker!';
        exit;
    }
    session_cache_limiter('nocache');
    $REMOTE_USER = $_SERVER['PHP_AUTH_USER'];
?>
