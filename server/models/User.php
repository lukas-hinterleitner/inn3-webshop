<?php

class User
{
  public $id;
  public $firstname;
  public $lastname;
  public $email;
  public $password;
  public $country;
  public $city;
  public $zipCode;
  public $address;

  public function __construct($id, $firstname, $lastname, $email, $password, $country, $city, $zipCode, $address)
  {
    $this->id = $id;
    $this->firstname = $firstname;
    $this->lastname = $lastname;
    $this->email = $email;
    $this->password = $password;
    $this->country = $country;
    $this->city = $city;
    $this->zipCode = $zipCode;
    $this->address = $address;
  }
}
