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