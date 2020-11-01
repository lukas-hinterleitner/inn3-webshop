<?php

include_once("../../models/User.php");

class UserRepository
{
  private $conn;

  public function __construct($conn)
  {
    $this->conn = $conn;
  }
}