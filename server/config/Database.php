<?php

class Database
{
  private $host = "localhost";
  private $db_name = "db_inn3_webshop";
  private $username = "root";
  private $password = "";
  private $conn = null;

  public function __construct()
  {
    $this->doConnect();
  }

  public function doConnect()
  {
    $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
  }

  public function getConnection()
  {
    return $this->conn;
  }
};
