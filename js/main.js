// ===================================
// Модальное окно с формой заявки
// ===================================

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button, .product-detail__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

// Открываем модалку по кнопкам «Заказать» / «Оформить заявку»
if (orderDialog && orderButtons.length) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      if (selectedProductInput) {
        selectedProductInput.value = productName;
      }
      orderDialog.showModal();
    });
  });
}

// Закрытие по кнопке «Закрыть»
if (orderDialog && closeDialogButton) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// ===================================
// Обработка формы (и в модалке, и на order.html)
// ===================================

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Сброс предыдущих ошибок
    const formElements = Array.from(orderForm.elements);
    formElements.forEach((el) => {
      if (el.willValidate) el.removeAttribute('aria-invalid');
    });

    // Проверка валидности
    if (!orderForm.checkValidity()) {
      formElements.forEach((el) => {
        if (el.willValidate && !el.checkValidity()) {
          el.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    // Успех
    if (successMessage) successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) orderDialog.close();
  });
}

// ===================================
// Кнопка «Наверх»
// ===================================

const scrollTopButton = document.getElementById('scroll-top');

if (scrollTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopButton.classList.add('scroll-top--visible');
    } else {
      scrollTopButton.classList.remove('scroll-top--visible');
    }
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}