<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../../config/Database.php");
include_once("../../repository/UserRepository.php");

$database = new Database();
$conn = $database->getConnection();

$repo = new UserRepository($conn);
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
  // get raw posted data
  $data = json_decode(file_get_contents("php://input"));
  $returnData = $repo->updateUser($data);
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
}

echo json_encode($returnData);