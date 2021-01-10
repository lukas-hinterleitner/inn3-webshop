<?php

function responseNotFoundID($id)
{
  $data = array();
  $data['errorMsg'] = "No product found with id '$id'";
  $data['errorCode'] = "404";
  return $data;
}

function responseNotFoundInternCode($code)
{
  $data = array();
  $data['errorMsg'] = "No product found with intern article code '$code'";
  $data['errorCode'] = "404";
  return $data;
}

function responseNotFoundUserId($id)
{
  $data = array();
  $data['errorMsg'] = "No user found with id '$id'";
  $data['errorCode'] = "404";
  return $data;
}

function msg($success, $status, $message, $extra = [])
{
  return array_merge([
    'success' => $success,
    'status' => $status,
    'message' => $message
  ], $extra);
}
