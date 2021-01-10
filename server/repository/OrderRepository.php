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
    return null;
  }

  public function getOrderByNumber($orderNumber)
  {
    return null;
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
