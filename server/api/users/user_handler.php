<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../../config/Database.php");
include_once("../../repository/UserRepository.php");

$database = new Database();
$conn = $database->getConnection();

$repo = new UserRepository($conn);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
}
