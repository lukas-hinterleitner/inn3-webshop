<?php

include_once("../../models/Product.php");

class ProductRepository
{
  private $conn;

  public function __construct($conn)
  {
    $this->conn = $conn;
  }

  public function getAllProducts()
  {
    $data = array();
    $sql = $this->conn->query("SELECT * FROM `t_products`");
    while ($row = $sql->fetch_assoc()) {
      $data[] = $this->prepareSimpleData($row);
    }
    return $data;
  }

  public function getProductById($gId)
  {
    $id = $this->conn->real_escape_string($gId);
    $stmt = $this->conn->prepare("SELECT * FROM `t_products` WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    if ($data === null) {
      $data = array();
      $data['errorMsg'] = "No product found with id '$id'";
      $data['errorCode'] = "404";
      $data['error'] = true;
      return $data;
    }
    return $this->prepareData($data);
  }

  private function prepareSimpleData($data)
  {
    $preparedData = array();
    $preparedData['id'] = $data['id'];
    $preparedData['name'] = $data['name'];
    $preparedData['description'] = $data['description'];
    $preparedData['price'] = $data['price'];
    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $preparedData['imgPath'] = "/images/" . $data['img_name'];
    $preparedData['link'] = $actual_link . $data['id'];;
    return $preparedData;
  }

  private function prepareData($data)
  {
    $preparedData = array();
    $preparedData['id'] = $data['id'];
    $preparedData['name'] = $data['name'];
    $preparedData['description'] = $data['description'];
    $preparedData['price'] = $data['price'];
    $preparedData['imgPath'] = "/images/" . $data['img_name'];
    $preparedData['amount'] = $data['amount'];
    $preparedData['createdAt'] = $data['created'];
    return $preparedData;
  }
}
