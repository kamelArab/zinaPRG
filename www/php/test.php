<?php
$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data
// validate the variables ======================================================
if (empty($_POST['nom']))
$errors['name'] = 'Name is required.';
if (empty($_POST['email']))
$errors['email'] = 'Email is required.';
// return a response ===========================================================
// response if there are errors
if ( ! empty($errors)) {
  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors'] = $errors;
  $data['messageError'] = 'Please check the fields in red';
} else {
  // if there are no errors, return a message
  $data['success'] = true;
  $data['messageSuccess'] = 'Hey! Thanks for reaching out. I will get back to you soon';
  // CHANGE THE TWO LINES BELOW
  $email_to = "postmaster@benzina2016.com";

  $nom = $_POST['nom']; // required
  $prenom = $_POST['prenom'];
  $email_from = $_POST['email']; // required
  $reception = $_POST['reception'];
  $brunch = $_POST['brunch'];
  $adult = $_POST['adult'];
  $enfant = $_POST['enfants']; // required
  $email_message = "DETAIL : ";
  $email_message .= "Nom: ".$nom."n";
  $email_message .= "Prenom: ".$prenom."n";
  $email_message .= "Email: ".$email_from."n";
  $email_message .= "Reception: ".$reception."n";
  $email_message .= "Brunch: ".$brunch."n";
  $email_message .= "Adulte: ".$adult."n";
  $email_message .= "Enfant: ".$enfant."n";
  $email_subject = "[" .$nom." ".$prenom."] Fiche réponse M";

  $headers = 'From: '.$email_from."rn".
  'Reply-To: '.$email_from."rn" .
  'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $email_subject, $email_message, $headers);
}
// return all our data to an AJAX call
echo json_encode($data);