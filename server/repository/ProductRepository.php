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
      // $product = new Product($row['id'], $row['name'], $row['description'], $row['price'], $row['created']);
      $data[] = $row;
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
      $data['error'] = "No product found with id '$id'";
      $data['statusCode'] = "404";
    }
    // $product = new Product($data['id'], $data['name'], $data['description'], $data['price'], $data['created']);
    return $data;
  }
}
