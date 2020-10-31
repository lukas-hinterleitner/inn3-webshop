<?php

class Product
{
  public $id;
  public $name;
  public $description;
  public $price;
  public $createdAt;

  public function __construct($id, $name, $description, $price, $createdAt)
  {
    $this->id = $id;
    $this->name = $name;
    $this->description = $description;
    $this->price = $price;
    $this->createdAt = $createdAt;
  }
}
