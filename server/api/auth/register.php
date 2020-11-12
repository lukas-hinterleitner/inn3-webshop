<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../../config/Database.php");
include_once("../../utils/response_helper.php");

$database = new Database();
$conn = $database->getConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  $returnData = msg(0, 404, 'Page Not Found!');
} else if (
  !isset($data->firstname)
  || !isset($data->lastname)
  || !isset($data->email)
  || !isset($data->pwd)
  || !isset($data->country)
  || !isset($data->city)
  || !isset($data->address)
  || !isset($data->zip)
  || empty(trim($data->firstname))
  || empty(trim($data->lastname))
  || empty(trim($data->email))
  || empty(trim($data->pwd))
  || empty(trim($data->country))
  || empty(trim($data->city))
  || empty(trim($data->address))
  || empty(trim($data->zip))
) {
  $fields = ['fields' => ['firstname', 'lastname', 'email', 'country', 'city', 'zip', 'pwd', 'address']];
  $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
} else {
  $firstname = htmlspecialchars(strip_tags(trim($data->firstname)));
  $lastname = htmlspecialchars(strip_tags(trim($data->lastname)));
  $email = htmlspecialchars(strip_tags(trim($data->email)));
  $password = trim($data->pwd);
  $country = htmlspecialchars(strip_tags(trim($data->country)));
  $city = htmlspecialchars(strip_tags(trim($data->city)));
  $zip = htmlspecialchars(strip_tags(trim($data->zip)));
  $address = htmlspecialchars(strip_tags(trim($data->address)));

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $returnData = msg(0, 422, 'Invalid Email Address!');
  } else if (strlen($password) < 8) {
    $returnData = msg(0, 422, 'Your password must be at least 8 characters long!');
  } else {
    $check_email = "SELECT `email` FROM `t_users` WHERE `email`=?";
    $check_email_stmt = $conn->prepare($check_email);
    $check_email_stmt->bind_param('s', $email);
    $check_email_stmt->execute();
    $result = $check_email_stmt->get_result();
    $row = $result->fetch_assoc();
    if ($row != null) {
      $returnData = msg(0, 422, 'This E-mail already in use!');
    } else {
      $insert_query = "INSERT INTO `t_users` (`firstname`, `lastname`, `pwd`, `email`, `country`, `city`, `zip`, `address`) VALUES (?,?,?,?,?,?,?,?)";
      $insert_stmt = $conn->prepare($insert_query);
      $pwd = password_hash($password, PASSWORD_DEFAULT);
      $insert_stmt->bind_param(
        'ssssssss',
        $firstname,
        $lastname,
        $pwd,
        $email,
        $country,
        $city,
        $zip,
        $address
      );
      $insert_stmt->execute();
      $returnData = msg(1, 201, 'You have successfully registered.');
    }
  }
}

echo json_encode($returnData);
