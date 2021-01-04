<?php

include_once("../../models/User.php");
include_once("../../utils/response_helper.php");

class UserRepository
{
  private $conn;

  public function __construct($conn)
  {
    $this->conn = $conn;
  }

  public function updateUser($data)
  {
    if (
      !isset($data->id)
      || !isset($data->firstname)
      || !isset($data->lastname)
      || !isset($data->email)
      || !isset($data->country)
      || !isset($data->city)
      || !isset($data->address)
      || !isset($data->zip)
      || empty(trim($data->id))
      || empty(trim($data->firstname))
      || empty(trim($data->lastname))
      || empty(trim($data->email))
      || empty(trim($data->country))
      || empty(trim($data->city))
      || empty(trim($data->address))
      || empty(trim($data->zip))
    ) {
      $fields = ['fields' => ['id', 'firstname', 'lastname', 'email', 'country', 'city', 'zip', 'address']];
      return msg(0, 422, 'Please Fill in all Required Fields!', $fields);
    }
    // clean data
    $id = $data->id;
    $firstname = htmlspecialchars(strip_tags(trim($data->firstname)));
    $lastname = htmlspecialchars(strip_tags(trim($data->lastname)));
    $email = htmlspecialchars(strip_tags(trim($data->email)));
    $country = htmlspecialchars(strip_tags(trim($data->country)));
    $city = htmlspecialchars(strip_tags(trim($data->city)));
    $zip = htmlspecialchars(strip_tags(trim($data->zip)));
    $address = htmlspecialchars(strip_tags(trim($data->address)));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return msg(0, 422, 'Invalid Email Address on update!');
    }
    $query_without_pwd = "UPDATE `t_users` SET `firstname`=?, `lastname`=?, `email`=?, `country`=?, `city`=?, `zip`=?, `address`=? WHERE `id`=?";
    $stmt = $this->conn->prepare($query_without_pwd);
    $stmt->bind_param(
      'sssssssi',
      $firstname,
      $lastname,
      $email,
      $country,
      $city,
      $zip,
      $address,
      $id
    );
    if (!$stmt->execute()) {
      return msg(0, 404, $stmt->error);
    }
    if (isset($data->pwd)) {
      $query_pwd = "UPDATE `t_users` SET `pwd`=? WHERE `id`=?";
      $stmt_pwd = $this->conn->prepare($query_pwd);
      $password = trim($data->pwd);
      if (strlen($password) < 8) {
        return msg(0, 422, 'Your password must be at least 8 characters long!');
      }
      $pwd = password_hash($password, PASSWORD_DEFAULT);
      $stmt_pwd->bind_param('si', $pwd, $id);
      if (!$stmt_pwd->execute()) {
        return msg(0, 404, $stmt->error);
      }
    }
    return msg(1, 200, "User update was successfull");
  }
}
