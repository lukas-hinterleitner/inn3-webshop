<?php

class Product
{
  public $id;
  public $name;
  public $description;
  public $price;
  public $imgName;
  public $internArticleCode;
  public $amount;
  public $createdAt;

  public function __construct($id, $name, $description, $price, $internArticleCode, $imgName, $amount, $createdAt)
  {
    $this->id = $id;
    $this->name = $name;
    $this->description = $description;
    $this->price = $price;
    $this->internArticleCode = $internArticleCode;
    $this->imgName = $imgName;
    $this->amount = $amount;
    $this->createdAt = $createdAt;
  }
}
