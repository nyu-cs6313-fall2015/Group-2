<?php

require_once(__DIR__ . '/../PhpConsole/__autoload.php');

$handler = PhpConsole\Handler::getInstance();
$handler->start(); // start handling PHP errors & exceptions
$handler->getConnector()->setSourcesBasePath($_SERVER['DOCUMENT_ROOT']);

function cors() {
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
//     if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//         if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
//             header("Access-Control-Allow-Methods: OPTIONS, HEAD, GET, POST, PUT, DELETE");
//         if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
//             header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
//         exit(0);
//     }
}
function curl_get($url, $method, $params, array $get = NULL, array $options = array())
    {
        $defaults = array(
            CURLOPT_URL => $url. (strpos($url, '?') === FALSE ? '?' : ''). http_build_query($get),
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 30000
        );
        $ch = curl_init();
         curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($ch, CURLOPT_USERPWD, $_SERVER["PHP_AUTH_USER"] . ":" . $_SERVER['PHP_AUTH_PW']);
        if ($method == 'POST')
        {
            //$data = json_decode(file_get_contents('php://input'), true);
            //$data_string = json_encode($data);
            $data_string = file_get_contents('php://input');
            curl_setopt($ch, CURLOPT_POST, TRUE);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        }
        if ($method == 'DELETE'){
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        }
        if ($method == 'OPTIONS'){
            //$data_string = file_get_contents('php://input');
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'OPTIONS');
            //curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        }
        if ($method == 'PUT')
        {
            $data = json_decode(file_get_contents('php://input'), true);
            $data_string = json_encode($data);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        }
        curl_setopt_array($ch, ($options + $defaults));
        if( ! $result = curl_exec($ch))
        {
            echo "Error ";
            echo curl_error($ch);
            //trigger_error(curl_error($ch));
        }
        header('Content-Type: ' . curl_getinfo($ch, CURLINFO_CONTENT_TYPE));
        $mime = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        curl_close($ch);
        return $result;
    }
try {
    set_time_limit(500000);
    cors();
    $mime = "";
    $query = $_SERVER['REQUEST_URI'];
    $query = substr($query, 21, strlen($query)-21);
    $index = explode("/", $query);
    $index = $index[0];
    $index = explode("?", $index);
    //$args = $index[1];
    $index = $index[0];
    //$url = "vgchead.poly.edu:8124" . $query;
    $url = "vidaserver1:1987/" . $query;
    $result = curl_get($url, $_SERVER['REQUEST_METHOD']);
    echo $result;
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>
