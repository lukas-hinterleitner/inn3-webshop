<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../../config/Database.php");
include_once("../../utils/response_helper.php");
include_once("../../config/JwtHandler.php");

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  $returnData = msg(0, 404, 'Page Not Found!');
} else if (
  !isset($data->email)
  || !isset($data->pwd)
  || empty(trim($data->email))
  || empty(trim($data->pwd))
) {
  $fields = ['fields' => ['email', 'pwd']];
  $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
} else {
  $email = trim($data->email);
  $password = trim($data->pwd);

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $returnData = msg(0, 422, 'Invalid Email Address!');
  } else if (strlen($password) < 8) {
    $returnData = msg(0, 422, 'Your password must be at least 8 characters long!');
  } else {
    $fetch_user_by_email = "SELECT * FROM `t_users` WHERE `email`=?";
    $query_stmt = $conn->prepare($fetch_user_by_email);
    $query_stmt->bind_param('s', $email);
    $query_stmt->execute();

    $result = $query_stmt->get_result();
    $row = $result->fetch_assoc();
    if ($row === null) {
      $returnData = msg(0, 422, 'Invalid Email Address!');
    } else {
      $check_password = password_verify($password, $row['pwd']);
      if ($check_password) {
        $jwt = new JwtHandler();
        $token = $jwt->_jwt_encode_data(
          'http://localhost/db_inn3_webshop/',
          array("user_id" => $row['id'])
        );
        $returnData = [
          'success' => 1,
          'message' => 'You have successfully logged in.',
          'token' => $token
        ];
      } else {
        $returnData = msg(0, 422, 'Invalid Password!');
      }
    }
  }
}

echo json_encode($returnData);
