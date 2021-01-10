<?php

include_once("../../utils/response_helper.php");

class OrderRepository
{
  private $conn;

  public function __construct($conn)
  {
    $this->conn = $conn;
    $this->conn->autocommit(FALSE);
  }

  public function getAllOrdersByUserId($userId)
  {
    $data = array();
    $order_stmt = $this->conn->prepare("SELECT * FROM `t_orders` WHERE `user_id`=?");
    $order_stmt->bind_param('i', $userId);
    if (!$order_stmt->execute()) {
      return;
    }
    $result = $order_stmt->get_result();
    $orders = array();
    while ($row = $result->fetch_assoc()) {
      if (!array_key_exists($row['order_number'], $orders)) {
        $orders[$row['order_number']] = array();
      }
      array_push($orders[$row['order_number']], $row);
    }
    if (count($orders) > 0) {
      $data = $this->prepareUserOrderData($orders);
      return $data;
    }
    return null;
  }

  private function prepareUserOrderData($orders)
  {
    $preparedData = array();
    foreach ($orders as $orderNumber => $orderList) {
      $preparedOrder = array();
      $preparedOrder['orderNumber'] = $orderNumber;

      $orderProducts = array();
      $orderTotalCost = 0.0;

      foreach ($orderList as $orderRow) {
        $preparedOrder['orderDate'] = $orderRow['order_datetime'];
        $orderTotalCost += (floatval($orderRow['product_price'] * $orderRow['amount']));
        $orderProduct = array();
        $prodId = $orderRow['product_id'];
        $orderProduct['id'] = $prodId;
        $orderProduct['name'] = $this->fetchProductName($prodId);
        $orderProduct['price'] = $orderRow['product_price'];
        $orderProduct['amount'] = $orderRow['amount'];
        array_push($orderProducts, $orderProduct);
      }
      $preparedOrder['orderTotalCost'] = floatval($orderTotalCost);
      $preparedOrder['orderProducts'] = $orderProducts;
      array_push($preparedData, $preparedOrder);
    }
    return $preparedData;
  }

  private function fetchProductName($prodId)
  {
    $stmt = $this->conn->prepare("SELECT `name` FROM `t_products` WHERE id=?");
    $stmt->bind_param("i", $prodId);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    if ($data === null) {
      return "Unknown";
    }
    return $data['name'];
  }

  public function getOrderByNumber($orderNumber)
  {
    $data = array();
    $order_stmt = $this->conn->prepare("SELECT * FROM `t_orders` WHERE `order_number`=?");
    $order_stmt->bind_param('s', $orderNumber);
    if (!$order_stmt->execute()) {
      return;
    }
    $result = $order_stmt->get_result();
    $orders = array();
    while ($row = $result->fetch_assoc()) {
      $orders[] = $row;
    }
    if (count($orders) > 0) {
      $data = $this->prepareOrderData($orders);
      return $data;
    }
    return null;
  }

  private function prepareOrderData($orders)
  {
    $preparedData = array();
    $orderProducts = array();
    $orderTotalCost = 0.0;
    foreach ($orders as $order) {
      $preparedData['orderNumber'] = $order['order_number'];
      $preparedData['orderDate'] = $order['order_datetime'];
      $orderProduct = array();
      $orderProduct['id'] = $order['id'];
      $orderProduct['name'] = $this->fetchProductName($order['product_id']);
      $orderProduct['amount'] = $order['amount'];
      $orderProduct['price'] = $order['product_price'];
      $orderTotalCost += (floatval($order['product_price'] * $order['amount']));
      array_push($orderProducts, $orderProduct);
    }
    $preparedData['orderProducts'] = $orderProducts;
    $preparedData['orderTotalCost'] = floatval($orderTotalCost);
    return $preparedData;
  }

  public function order($data)
  {
    $userId = $data->userId;
    $orders = $data->orders;
    if (!is_int($userId) || !is_array($orders)) {
      return msg(0, 406, 'Required request parameters have wrong data type.');
    }
    $product_query = "SELECT `price`, `amount`, `name` FROM `t_products` WHERE `id`=?";
    $order_query = "INSERT INTO `t_orders` (`product_id`, `user_id`, `product_price`, `amount`, `order_number`, `order_datetime`) VALUES (?, ?, ?, ?, ?, NOW());";
    $product_update_amount_query = "UPDATE `t_products` SET `amount`=? WHERE `id`=?";
    $newOrderNumber = uniqid("order-", true);
    $this->conn->begin_transaction();
    foreach ($orders as $order) {
      $productId = $order->productId;
      $amount = $order->amount;
      $product_stmt = $this->conn->prepare($product_query);
      $product_stmt->bind_param('i', $productId);
      if (!$product_stmt->execute()) {
        $this->conn->rollback();
        return msg(0, 400, 'Retrieving product with id ' . $productId . ' failed');
      }
      $result = $product_stmt->get_result();
      $prod_data = $result->fetch_assoc();
      if ($prod_data === null) {
        $this->conn->rollback();
        return msg(0, 400, "Product doesn't exist.");
      }
      if (intval($prod_data['amount']) < $amount) {
        $this->conn->rollback();
        return msg(0, 500, "There is not enough products (" . $prod_data['name'] . ") in stock.");
      }
      $price = floatval($prod_data['price']);
      $order_stmt = $this->conn->prepare($order_query);
      $order_stmt->bind_param('iidis', $productId, $userId, $price, $amount, $newOrderNumber);
      if (!$order_stmt->execute()) {
        $this->conn->rollback();
        return msg(0, 500, "Order cannot be finalized due to: " . $order_stmt->error);
      }
      $newAmount = (intval($prod_data['amount']) - $amount);
      $amount_stmt = $this->conn->prepare($product_update_amount_query);
      $amount_stmt->bind_param('ii', $newAmount, $productId);
      if (!$amount_stmt->execute()) {
        $this->conn->rollback();
        return msg(0, 500, "Amount could not be updated due to: " . $amount_stmt->error);
      }
    }
    $this->conn->commit();
    return msg(1, 200, "Order successfully created", ['orderNumber' => $newOrderNumber]);
  }
}
