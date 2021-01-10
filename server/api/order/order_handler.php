<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../../config/Database.php");
include_once("../../repository/OrderRepository.php");
include_once("../../utils/response_helper.php");

$database = new Database();
$conn = $database->getConnection();

$repo = new OrderRepository($conn);
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $data = $repo->getAllOrdersByUserId($id);
    if ($data === null) {
      $data = responseNotFoundUserId($id);
      header("HTTP/1.1 404 Not Found");
      exit(json_encode($data));
    }
    $returnData = $data;
  }
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"));
  $returnData = $repo->order($data);
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
}

echo json_encode($returnData);
