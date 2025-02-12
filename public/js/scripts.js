// // Fonction pour afficher un message d'erreur
// function showError(message) {
//   const errorElement = document.createElement('div');
//   errorElement.className = 'error-message'; // Assurez-vous que ce style est bien défini dans votre CSS
//   errorElement.innerText = message;

//   document.body.appendChild(errorElement);
//   setTimeout(() => {
//     errorElement.remove(); // Supprime l'erreur après 5 secondes
//   }, 5000);
// }

// // Gestion de la suppression d'un livre
// const deleteButtons = document.querySelectorAll('.delete-button');
// deleteButtons.forEach(button => {
//   button.addEventListener('click', function(event) {
//     const bookId = button.dataset.id; // Récupère l'ID du livre à supprimer

//     if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
//       fetch(`/books/${bookId}`, {
//         method: 'DELETE', // Utilise la méthode DELETE pour supprimer
//       })
//       .then(response => {
//         if (response.ok) {
//           window.location.reload(); // Recharge la page si la suppression réussit
//         } else {
//           showError('Erreur lors de la suppression du livre');
//         }
//       })
//       .catch(() => showError('Erreur de connexion')); // Gère les erreurs de connexion
//     }
//   });
// });

// // Gestion du formulaire de création ou de mise à jour de livre
// const bookForm = document.querySelector('.updateForm'); // Sélectionne le formulaire 
//   bookForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Empêche le formulaire d'être soumis
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok'); // Vérifie si la réponse est correcte
//       }
//       return response.json(); // Convertit la réponse en JSON
//     })
//     .then(data => {
//       if (data._id) {
//         window.location.href = `/books/${data._id}`; // Redirige vers la page du livre modifié
//       } else {
//         showError('Erreur lors de la soumission du formulaire');
//       }
//     })
//     .catch(() => showError('Erreur de connexion')); // Gère les erreurs de connexion

