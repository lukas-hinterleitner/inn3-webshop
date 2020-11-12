<?php

require __DIR__ . '/../config/JwtHandler.php';
class Auth extends JwtHandler
{
  protected $db;
  protected $headers;
  protected $token;

  public function __construct($db, $headers)
  {
    parent::__construct();
    $this->db = $db;
    $this->headers = $headers;
  }

  public function isAuth()
  {
    if (array_key_exists('Authorization', $this->headers) && !empty(trim($this->headers['Authorization']))) {
      $this->token = explode(" ", trim($this->headers['Authorization']));
      if (isset($this->token[1]) && !empty(trim($this->token[1]))) {
        $data = $this->_jwt_decode_data($this->token[1]);
        if (isset($data['auth']) && isset($data['data']->user_id) && $data['auth']) {
          $user = $this->fetchUser($data['data']->user_id);
          return $user;
        }
        return null;
      }
      return null;
    }
    return null;
  }

  protected function fetchUser($user_id)
  {
    $fetch_user_by_id = "SELECT `firstname`, `lastname`, `email`, `country`, `city`, 'zip', 'address' FROM `t_users` WHERE `id`=?";
    $query_stmt = $this->db->prepare($fetch_user_by_id);
    $query_stmt->bind_param('i', $user_id);
    $query_stmt->execute();

    $result = $query_stmt->get_result();
    $row = $result->fetch_assoc();
    if ($row !== null) {
      return [
        'success' => 1,
        'status' => 200,
        'user' => $row
      ];
    }
    return null;
  }
}
