// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Додавання активного класу до navbar links (підсвічування) =============================================================
const activePage = window.location.pathname;
const links = document.querySelectorAll('.menu__link');
const actions = document.querySelectorAll('.header__action');
// active links - active pages
const activeLinks = links.forEach(link => {
  if (activePage === '/' || activePage === '/index.html') {
    link.classList.add('_white');
    links[0].classList.add('active-page');
  } else if (
    activePage === ('/concrete.html') || 
    activePage === ('/concrete-repair.html') || 
    activePage === ('/waterproofing.html') || 
    activePage === ('/foundation.html') || 
    activePage === ('/underpinning.html') || 
    activePage === ('/drain.html') || 
    activePage === ('/plumbing.html') || 
    activePage === ('/demolition.html')) {
    links[2].classList.add('active-page');
  } else if (link.href.includes(`${activePage}`)) {
    link.classList.add('active-page');
  }
});
// active actions
const activeActions = actions.forEach(action => {
  if (activePage === '/' || activePage === '/index.html') {
    action.classList.add('_white');
  }
});
// ==================================================================================================================



// Перевірка валідності форми відправки =============================================================================
"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', formSend);
  }

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    // для додавання файлу фото
    // formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert("Error!");
        form.classList.remove('_sending');
      }
    } else {
      alert ('Please, fill in all the required fields correctly!');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
          error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  // Функція тесту e-mail
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});



// Меню бургер/додавання классів .body__lock та .icon__menu _active  ====================================================
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}
// ==================================================================================================================

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight = animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_watcher-view');
      } else {
        animItem.classList.remove('_watcher-view');
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop
  }
  animOnScroll()
} 