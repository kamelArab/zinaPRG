<?php
$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data
// validate the variables ======================================================
if (empty($_POST['nom']))
  $errors['nom'] = 'Name is required.';
if (empty($_POST['inputEmail']))
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
  $email_to = "postmaster@benzina2016.com,zina.djaiz@gmail.com,benjaminmampuya@gmail.com,kamel.arab@gmail.com";

  $nom = $_POST['nom']; // required
    $prenom = $_POST['prenom'];
    $email_from = $_POST['inputEmail']; // required
  $subject = $_POST['inputObjet'];
    $email_message = $_POST['inputMessage'];



  $message = "
     <html>
      <head>
       <title>Contact</title>
      </head>
      <body>
       <p>Détail formulaire : </p>
       <table>
        <tr>
         <td>Nom :</td><td>".$nom."</td>
        </tr>
         <tr>
         <td>prenom :</td><td>".$prenom."</td>
        </tr>
        <tr>
         <td>Email :</td><td>".$email_from."</td>
        </tr>
        <tr>
         <td>Message : </td><td>".$email_message."</td>
        </tr>

       </table>
      </body>
     </html>";
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    // En-têtes additionnels
    $headers .= 'To: Mariage <postmaster@benzina2016.com>, Zina Djaïz <zina.djaiz@gmail.com>, Benjamin Mampuya<benjaminmampuya@gmail.com>' . "\r\n";
    $headers .= 'From: '.$email_from.'\r\n';
    $headers .='Reply-To: '.$email_from."rn" .
        'X-Mailer: PHP/' . phpversion();

  @mail($email_to, $subject, $message, $headers);
}
// return all our data to an AJAX call
echo json_encode($data);