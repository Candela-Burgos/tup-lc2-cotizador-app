const btn = document.getElementById('button');


 btn.addEventListener('click', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_lkk7fqk';

   emailjs.sendForm(serviceID, templateID, "#form")
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});