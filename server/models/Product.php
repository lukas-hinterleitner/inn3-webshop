<?php

class Product
{
  public $id;
  public $name;
  public $description;
  public $price;
  public $imgName;
  public $amount;
  public $createdAt;

  public function __construct($id, $name, $description, $price, $imgName, $amount, $createdAt)
  {
    $this->id = $id;
    $this->name = $name;
    $this->description = $description;
    $this->price = $price;
    $this->imgName = $imgName;
    $this->amount = $amount;
    $this->createdAt = $createdAt;
  }
}
