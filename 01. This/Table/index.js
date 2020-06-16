function solve() {
   const tBody = document.querySelector('tbody');
   tBody.addEventListener('click', changeBackground);

   function changeBackground(e) {
      const tr = e.target.parentNode;

      Array.from(this.children).forEach(child => {
         if (child !== tr) {
            child.style.backgroundColor = '';
         }
      });

      tr.style.backgroundColor = tr.style.backgroundColor ? '' : '#413f5e';
   }
}

// function solve(){
//    const tBody = document.querySelector('tbody');
//    const tRows = document.querySelectorAll('tbody tr');

//    tBody.addEventListener('click', (e) => {
//       const tr = e.target.parentNode;

//       Array.from(tRows).forEach(r => {
//          if (r !== tr) {
//             r.style.cssText = '';
//          }
//       });

//       tr.style.cssText = tr.style.cssText ? '' : 'background-color: rgb(65, 63, 94)';
//    });
// }
