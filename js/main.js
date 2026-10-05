const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card .button[data-product]');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

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

if (orderDialog && closeDialogButton) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((el) => {
      if (el.willValidate) el.removeAttribute('aria-invalid');
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((el) => {
        if (el.willValidate && !el.checkValidity()) {
          el.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    if (successMessage) successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) orderDialog.close();
  });
}

const scrollTopButton = document.getElementById('scroll-top');

if (scrollTopButton) {
  const toggleScrollButton = () => {
    if (window.scrollY > 400) {
      scrollTopButton.classList.add('scroll-top--visible');
    } else {
      scrollTopButton.classList.remove('scroll-top--visible');
    }
  };

  window.addEventListener('scroll', toggleScrollButton, { passive: true });
  toggleScrollButton();

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}