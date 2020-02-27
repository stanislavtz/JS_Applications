function solve(){
   const tBody = document.querySelector('tbody');
   const tRows = document.querySelectorAll('tbody tr');

   tBody.addEventListener('click', (e) => {
      const tRow = e.target.parentNode;

      Array.from(tRows).forEach(r => {
         if (r !== tRow || r.style.cssText) {
            r.style.cssText = '';
         }
         else {
            r.style.cssText = 'background-color: rgb(65, 63, 94)';
         }
      });
   });
}
