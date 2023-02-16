<?php
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\WidgetService;
use App\Models\Product;
use App\Models\Country;
use App\Models\State;
use App\Models\City;

function slug($string = null) {
  $slug = strtolower($string);
  $slug = preg_replace("/[^a-z0-9_\s-]/", "", $slug);
  $slug = preg_replace("/[\s-]+/", " ", $slug);
  $slug = preg_replace("/[\s_]/", "-", $slug);
  return $slug;
}

function pr($array = array()) {
  echo '<pre>';
  print_r(json_decode(json_encode($array), true));
  echo '</pre>';
}

function pd($array = array()) {
  echo '<pre>';
  print_r(json_decode(json_encode($array), true));
  echo '</pre>';
  die;
}

function generateRandomString(int $length): String {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

function uniqueId(int $length): String {
  $characters = '0123456789';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return 'DKO'.$randomString;
}

function generateCode(int $length): String {
  $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $shuffled = str_shuffle($characters);
  return substr($shuffled,$charactersLength-$length);
}


/**
* Create Razorpay Order ID for Donation
* created by: CPC
* created on: July 12, 2022
*/
function CreateOrder($data = array()) {
  $order_id = '';
  $key = config('constants.RAZORPAY_DOMESTIC')[config('constants.SERVER_ENV')]['RAZOR_KEY'];
  $RAZOR_SECRET = config('constants.RAZORPAY_DOMESTIC')[config('constants.SERVER_ENV')]['RAZOR_SECRET'];

  if (!empty($key) && !empty($RAZOR_SECRET)) {
    //echo ($key . ":" . $RAZOR_SECRET);die;
    $c_data = json_encode($data);
    $url = "https://api.razorpay.com/v1/orders/";
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // Make it so the data coming back is put into a string
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $c_data); // Insert the data
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json')); // set the content type json//
    curl_setopt($curl, CURLOPT_USERPWD, $key . ":" . $RAZOR_SECRET);
    curl_setopt($curl, CURLOPT_POST, 1); // We POST the data
    curl_setopt($curl, CURLOPT_TIMEOUT, 60);
    $result = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $order_created = json_decode($result);
    //Order ID generation
    if (isset($order_created->id)) {
      $order_id = $order_created->id;
    }
    return array('order_id' => $order_id, 'key' => $key);
  } else {
    return response()->json([
      'status' => 0,
      'message' => "Errors from razorpay",
    ]);
  }
}

function _sdata($index, $id = null) {
  $orderData = Session::get("orderData");
  switch ($index) {
    case 'c_id':
      $country = Country::where('id', $id)->value('name');
      return   isset($country) && !empty($country) ? $country : 'N/A';
      break;
    case 's_id':
      $state   = State::where('id', $id)->value('name');
      return   isset($state) && !empty($state) ? $state : 'N/A';
      break;
    case 'city_id':
      $city    = City::where('id', $id)->value('name');
      return   isset($city) && !empty($city) ? $city : 'N/A';
      break;
    default:
      return isset($orderData[$index]) && !empty($orderData[$index]) ? $orderData[$index] : '';
      break;
  } 
}

function sendOtpMessage($param = []) {
  $fields = array(
    "variables_values" => $param['otp'] . " OurGuest Team.",
    "route" => "otp",
    "numbers" => $param['mobile_number'],
  );
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($fields),
    CURLOPT_HTTPHEADER => array(
      "authorization: gX0r2bOJKQL5awEmo3Zs7kIdCiNYeTSnMxGlvPA8hWUz6fVquRy3eLFJ15tzRV0sdxwqEKDc72UjkZlI",
      "accept: */*",
      "cache-control: no-cache",
      "content-type: application/json"
    ),
  ));
  $response = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);
  if ($err) {
    echo "cURL Error #:" . $err;
  } else {
    return true;
    // echo $response;
  }
}

function sendServiceSms($param = []) {
  $fields = array(
    "sender_id" => "TXTIND",
    "message" => $param['message'],
    "route" => "v3",
    "numbers" => $param['mobile_number'],
  );
  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($fields),
    CURLOPT_HTTPHEADER => array(
      "authorization: gX0r2bOJKQL5awEmo3Zs7kIdCiNYeTSnMxGlvPA8hWUz6fVquRy3eLFJ15tzRV0sdxwqEKDc72UjkZlI",
      "accept: */*",
      "cache-control: no-cache",
      "content-type: application/json"
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    echo "cURL Error #:" . $err;
  } else {
    return true;
  }
}

function getAmountByLength($amount, $amount_length) {
  $converted_amount = number_format($amount, $amount_length, '.', '');
  $break_value = explode('.', $converted_amount);
  return (int)$break_value[0] . '.' . (int)substr($break_value[1], 0, $amount_length);
}

function priceFormat($amount) {
  return '₹ '. number_format($amount, 2);
}

// Get IP Address
function getClientIp() {
  $ipaddress = '';
  if (getenv('HTTP_CLIENT_IP'))
  $ipaddress = getenv('HTTP_CLIENT_IP');
  else if (getenv('HTTP_X_FORWARDED_FOR'))
  $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
  else if (getenv('HTTP_X_FORWARDED'))
  $ipaddress = getenv('HTTP_X_FORWARDED');
  else if (getenv('HTTP_FORWARDED_FOR'))
  $ipaddress = getenv('HTTP_FORWARDED_FOR');
  else if (getenv('HTTP_FORWARDED'))
  $ipaddress = getenv('HTTP_FORWARDED');
  else if (getenv('REMOTE_ADDR'))
  $ipaddress = getenv('REMOTE_ADDR');
  else
  $ipaddress = 'UNKNOWN';
  return $ipaddress;
}

function ipInfo($ip = NULL, $purpose = "location", $deep_detect = TRUE) {
  $url = "http://ip-api.com/json/" . $ip;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36');
  curl_setopt($ch, CURLOPT_URL, $url); // The fetch URL.
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // TRUE/1  : get output/response after curl execution ( curl_exec() ).
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // FALSE/0 : stop cURL to verify the peer's certificate.
  // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); //	TRUE/1  : follow any "Location:"header which is sent by server as a part of the HTTP response header
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); // The number of seconds to wait while trying to connect. Use 0 to wait indefinitely.
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);         // The maximum number of seconds to allow cURL functions to execute.
  $result = curl_exec($ch);
  if ($result === FALSE) {
    $output = "Error occurred while fetching data";
  }
  $ipdata = json_decode($result, true);
  if ($ipdata['status'] == true) {
    return $ipdata;
  } else {
    return false;
  }
}

function removeHtmlTags($content) {
  $removedHtmlTags = preg_replace('/<[^>]*>/', '', $content);
  $content = str_replace("&nbsp;", " ", $removedHtmlTags);
  $content = html_entity_decode($content);
  return $content;
}


// =========================================================================================================================================
// =========================================================================================================================================


/**
* Checks weathers the current site is on local or production
* @return boolean TRUE ON PRODUCTION else FALSE if site is on LOCAL
*/
function onProduction(){
  // return app()->environment(['local', 'staging']) ? false : true;
  return config('divya_config.RELEASE_STATUS') == 'staging' ? false : true;
}

/**
*  It return admin URL for or Project
*  @params $url the url/page to link
*  @params $params any additional parameters
* @return null full admin URL with /
*/
function adminUrl($url, $params = []){
  return url('admin/' . $url);
}

/**
*  It return site URL for or Project
*  @params $url the url/page to link
*  @params $params any additional parameters
* @return null full admin URL with /
*/
function siteUrl($url = '', $params = []){
  return (isset($url) && !empty($url)) ? url($url) : config('app.url');
}

/**
*  It return the date format based on user mode
* @params accept only string with given parameter.
* @return string if does not match the parameters else null
*/
function getDateFormat($type){
  $format = null;
  switch (strtolower($type)) {
    case 'custom':
    $format = config('custom.DATE_TIME_FORMAT');
    break;
    case 'custom_semi':
    $format = config('custom.DATE_TIME_FORMAT_LONG2');
    break;
    case 'custom_semi2':
    $format = config('custom.DATE_TIME_FORMAT_LONG3');
    break;
    case 'custom_full':
    $format = config('custom.DATE_TIME_FORMAT_LONG');
    break;
    case 'system':
    $format = config('custom.SYSTEM_DATE_TIME');
    break;
    case 'system_full':
    $format = config('custom.SYSTEM_DATE_TIME_FORMAT_LONG');
    break;
    case 'user':
    $format = config('custom.DATE_TIME_FORMAT2');
    break;
  }
  return $format;
}

/**
*  It returns today date in either System format or user defined format
* @param accepts custom|custom_semi|custom_full|system_full|system
* @return today date based on param
*/
function getTodayDate($mode = 'system'){
  if (isset($mode) && !empty($mode)) {
    $format = getDateFormat($mode);
    return (isset($format)) ? date($format) : null;
  }
  return null;
}


/**
* Converts date between two different date format
* @param $date Date to be converted
* @param $format_from Date format which is converted
* @param $format_to Date format to be converted
* @return Date/DateTime based on given format or NULL on failure
*/
function convertDate($date, $formatFrom, $formatTo){
  $from = getDateFormat($formatFrom);
  pd($formatFrom);
  $to = getDateFormat($formatTo);
  $convertedDate = null;
  if (isset($from) && isset($to)) {
    try {
      $finalDate = Carbon::createFromFormat($from, $date);
      $convertedDate = $finalDate->format($to);
    } catch (\Exception $e) {
      echo $e->getMessage();
      die;
    }
  }
  return $convertedDate;
}

/**
 * Convert datetime to specific date format
 * @param $dataTime to be converted
 * @param $convertTo to be converted to
 * @return Date/DateTime based on given format or null on failure
 */
function convertDatetime($dateTime,$convertTo){
  return date($convertTo,strtotime($dateTime));
}


/**
* This method returns session based alert message
* @return Alert message within HTML Tags empty string in failure
*/
function getAlertMessage(){
  $message = '';
  $messageClass = '';
  if (session('success')) {
    $message = session('success');
    $messageClass = 'success';
  } else if (session('warning')) {
    $message = session('warning');
    $messageClass = 'warning';
  } else if (session('error')) {
    $message = session('error');
    $messageClass = 'danger';
  } else if (session('info')) {
    $message = session('info');
    $messageClass = 'info';
  }

  if ($messageClass != '') {
    $message = '<div class="mt-2 mb-2 alert alert-' . $messageClass . '">' . $message . '</div>';
  }
  return $message;
}



/**
* This method returns Serial order for a list based on current page value
* @return integer based number on success else return 1 (integer)
*/
function get_SL_order(){
  $sl = 0;
  $page = (isset(request()->page) && !empty(request()->page)) ? request()->page : 1;
  if ($page > 1) {
    $sl = ($page - 1) * config('custom.RECORDS_PER_PAGE');
  }
  return $sl;
}


/**
* This method returns value list as for dropdown or any other usage
* @param string $mode type that will be passed
* @return array list of values
*/
function get_value_list_data($mode){
  $data = [];
  switch ($mode) {
    case 'status':
    $data = [["id" => 1, "val" => "Active"], ["id" => 0, "val" => "In-Active"]];
    break;
    case 'post':
    $data = [["id" => 2, "val" => "Draft"], ["id" => '1', "val" => "Active"], ["id" => '0', "val" => "In-Active"]];
    break;
  }
  return $data;
}

/**
* This method trim and converts empty data as null values
* @param array must be an array
* @return array will returns the sanitized array
*/
function sanitize_data($data){
  $data = array_map(fn ($value) => is_array($value) ? $value : trim($value), $data); // TRIMMING THE DATA
  $data = array_map(fn ($value) => $value === "" ? NULL : $value, $data); // returning NULL INSTEAD OF EMPTY STRING
  return $data;
}

/**
* isSuperAdminLoggedIn()
* This will check if the current logged in user is speer admin or not
* @return true on success and false on failure
*/
function isSuperAdminLoggedIn(){
  return auth()->guard('admin')->user()->id == 1;
}



/**
* get browser details
*/
function getBrowser() {
  $u_agent = $_SERVER['HTTP_USER_AGENT'];
  $break_agent = explode('/', $u_agent);
  if (count($break_agent) > 0) {
    if ($break_agent[0] == "PostmanRuntime") {
      return "PostmanRuntime";
    }
  }

  $bname = 'Unknown';
  $platform = 'Unknown';
  $version = "";

  //First get the platform?
  if (preg_match('/linux/i', $u_agent)) {
    $platform = 'linux';
  } elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
    $platform = 'mac';
  } elseif (preg_match('/windows|win32/i', $u_agent)) {
    $platform = 'windows';
  }


  // Next get the name of the useragent yes seperately and for good reason
  if (preg_match('/MSIE/i', $u_agent) && !preg_match('/Opera/i', $u_agent)) {
    $bname = 'Internet Explorer';
    $ub = "MSIE";
  } elseif (preg_match('/Trident/i', $u_agent)) { // this condition is for IE11
    $bname = 'Internet Explorer';
    $ub = "rv";
  } elseif (preg_match('/Firefox/i', $u_agent)) {
    $bname = 'Mozilla Firefox';
    $ub = "Firefox";
  } elseif (preg_match('/Chrome/i', $u_agent)) {
    $bname = 'Google Chrome';
    $ub = "Chrome";
  } elseif (preg_match('/Safari/i', $u_agent)) {
    $bname = 'Apple Safari';
    $ub = "Safari";
  } elseif (preg_match('/Opera/i', $u_agent)) {
    $bname = 'Opera';
    $ub = "Opera";
  } elseif (preg_match('/Netscape/i', $u_agent)) {
    $bname = 'Netscape';
    $ub = "Netscape";
  }


  // finally get the correct version number
  // Added "|:"
  $known = array('Version', $ub, 'other');
  $pattern = '#(?<browser>' . join('|', $known) .
  ')[/|: ]+(?<version>[0-9.|a-zA-Z.]*)#';
  if (!preg_match_all($pattern, $u_agent, $matches)) {
    // we have no matching number just continue
  }

  // see how many we have
  $i = count($matches['browser']);
  if ($i != 1) {
    //we will have two since we are not using 'other' argument yet
    //see if version is before or after the name
    if (strripos($u_agent, "Version") < strripos($u_agent, $ub)) {
      $version = $matches['version'][0];
    } else {
      $version = $matches['version'][1];
    }
  } else {
    $version = $matches['version'][0];
  }

  // check if we have a number
  if ($version == null || $version == "") {
    $version = "?";
  }

  // return array(
  //     'userAgent' => $u_agent,
  //     'name'      => $bname,
  //     'version'   => $version,
  //     'platform'  => $platform,
  //     'pattern'    => $pattern
  // );


  return $u_agent;
}

/**
* Custom encryption and decryption
*/
function  encryptionDecryption(String $encriptionText, String $decryption = null): String {
  // Store the cipher method
  // $ciphering = "AES-128-CTR";
  $ciphering = "AES-256-CTR";

  // Use OpenSSl Encryption method
  $iv_length = openssl_cipher_iv_length($ciphering);
  $options = 0;

  // Non-NULL Initialization Vector for encryption
  $encryption_iv = 'P147112220221497';

  // Store the encryption key
  $encryption_key = "divyaBySundew1122";

  // Use openssl_encrypt() function to encrypt the data
  $encrypt = openssl_encrypt(
    $encriptionText,
    $ciphering,
    $encryption_key,
    $options,
    $encryption_iv
  );

  if (isset($decryption) && !empty($decryption) && $decryption == "decrypt") {
    $decryptedText = openssl_decrypt(
      $encriptionText,
      $ciphering,
      $encryption_key,
      $options,
      $encryption_iv
    );

    return $decryptedText;
  } else {
    return $encrypt;
  }
}

function checkUser() {
  if (Auth::check()) {
    return true;
  }
  return false;
}

function loggedInFname() {
  return isset(Auth::user()->id) && !empty(Auth::user()->id) ? Auth::user()->first_name : null;
}
function loggedInLname() {
  if (isset(Auth::user()->id) && !empty(Auth::user()->id)) {
    return Auth::user()->last_name;
  }
  return '';
}

function getUserId() {
    return isset(Auth::user()->id) && !empty(Auth::user()->id) ? Auth::user()->id : null;
}

function systemGeneratePassword() {
  $password                              = mt_rand();
  $number                                = "0123456789";
  $checkalphabet                         = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  $special_character                     = "@#$%&*";
  $password                              = substr(str_shuffle($checkalphabet), 0, 3);
  $password                              .= substr(str_shuffle($number), 0, 2);
  $password                              .= substr(str_shuffle($special_character), 0, 1);
  $password                              .= substr(str_shuffle($checkalphabet), 0, 2);
  return $password;
}

function widget($param, $take) {
  $result = (new WidgetService)->index($param, $take);
  return $result;
}

function insertProduct() {
  $faker = Faker\Factory::create();
  for ($i=0; $i < 100; $i++) {
    $category  = random_int(2, 100) % 2 == 0 ? 1 : 7;
    if($category == 1) {
      $group   =  random_int(1, 10);
      $option  = 1;
      $value   = random_int(1, 10);
    } else {
      $group   =  25;
      $option  = 4;
      $value   = random_int(26, 27);
    }

    $checkalphabet    = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
    $sku              = substr(str_shuffle($checkalphabet), 0, 6);
    $now              = date('Y-m-d H:i:s');
    $data = [
      'name'            => 'DIVYA '.substr($faker->text, 0, 50),
      'price'           => $faker->numberBetween($min = 8000, $max = 15000),
      'quantity'        => $faker->numberBetween($min = 8000, $max = 15000),
      'sku'             => $sku,
      'code'            => 'D'.generateCode(7),
      'is_new'          => random_int(0, 1),
      'is_best_selling' => random_int(0, 1),
      'image'           => '1.png',
      'description'     => $faker->realText($maxNbChars = 500, $indexSize = 2),
      'specification'   => $faker->realText($maxNbChars = 500, $indexSize = 2),
      'category_id'     => $category,
      'group_id'        => $group,
      'option_id'       => 1,
      'option_value_id' => 1,
      'created_at'      => $now,
      'created_by'      => 1
    ];
    Product::insert($data);
  }
}

function recaptcha_v3($request) {
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $remoteip = $_SERVER['REMOTE_ADDR'];
  $data = [
    'secret' => config('divya_config.recaptcha_v3_secret'),
    'response' => $request->get('recaptcha'),
    'remoteip' => $remoteip
  ];
  $options = [
    'http' => [
      'header' => "Content-type: application/x-www-form-urlencoded\r\n",
      'method' => 'POST',
      'content' => http_build_query($data)
    ]
  ];
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  $resultJson = json_decode($result);

  return $resultJson;
}
