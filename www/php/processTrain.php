<?php
$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data
// validate the variables ======================================================
if (empty($_POST['nom']))
  $errors['nom'] = 'Name is required.';
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
  $email_to = "postmaster@benzina2016.com,zina.djaiz@gmail.com";

  $nom = $_POST['nom']; // required
  $prenom = $_POST['prenom'];
  $email_from = $_POST['email']; // required
  $depart = $_POST['depart'];
  $retour = $_POST['retour'];
    $nbr = $_POST['nbr'];
  $email_message = "DETAIL : ";
  $email_message .= "Nom: ".$nom."n";
  $email_message .= "Prenom: ".$prenom."n";
  $email_message .= "Email: ".$email_from."n";
  $email_message .= "Reception: ".$reception."n";
  $email_message .= "Brunch: ".$brunch."n";
  $email_message .= "Adulte: ".$adult."n";
  $email_message .= "Enfant: ".$enfant."n";
  $email_subject = "[" .$nom." ".$prenom."] Demande de billet de train";

  $message = "
     <html>
      <head>
       <title>Mariage</title>
      </head>
      <body>
       <p>Détail formulaire : </p>
       <table>
        <tr>
         <td>Nom</td><td>".$nom."</td>
        </tr>
        <tr>
         <td>Email</td><td>".$email_from."</td>
        </tr>
        <tr>
         <td>Départ</td><td>".$depart."</td>
        </tr>
        <tr>
         <td>Retour</td><td>".$retour."</td>
        </tr>
        <tr>
         <td>Nombre de places</td><td>".$nbr."</td>
        </tr>
       </table>
      </body>
     </html>";
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  // En-têtes additionnels
  $headers .= 'To: Mariage <postmaster@benzina2016.com>, Zina Djaïz <zina.djaiz@gmail.com>' . "\r\n";
  $headers .= 'From: '.$email_from.'\r\n';
  $headers .= 'Cc: anniversaire_archive@example.com' . "\r\n";
  $headers .= 'Bcc: kamel.arab@gmail.com' . "\r\n";
  $headers .='Reply-To: '.$email_from."rn" .
      'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $email_subject, $message, $headers);
}
// return all our data to an AJAX call
echo json_encode($data);