const tabs = document.querySelector(".card");
const tabButton = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".content");
const loginButton = document.querySelector(".btn-log");
const registerButton = document.querySelector(".btn-register");

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

tabs.onclick = e => {
  if (e.target.classList.contains('tab-button')) { 
    const id = e.target.dataset.id;

    if (id) {
      tabButton.forEach(btn => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
      contents.forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  }
};

const clearForm = () => {
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('#reg-name').value = '';
  document.querySelector('#reg-email').value = '';
  document.querySelector('#reg-password').value = '';
};

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showToast('Lütfen tüm alanları doldurun.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('Lütfen bir e-posta giriniz.', 'error');
    return;
  }

  try {
    const response = await fetch('https://6794dcfbaad755a134ea9ec0.mockapi.io/users');
    const users = await response.json();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      showToast('Giriş başarılı!', 'success');
    } else {
      showToast('Kullanıcı bulunamadı! Tekrar deneyin!', 'error');
    }
  } catch (error) {
    console.error(error);
    showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
  }
  clearForm();
});

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.classList.add('toast', type, 'show');
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 500); 
  }, 3000);
}

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  if (!name || !email || !password) {
    showToast('Lütfen tüm alanları doldurun.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('Lütfen bir e-posta giriniz.', 'error');
    return;
  }
 
  try {
    const response = await fetch('https://6794dcfbaad755a134ea9ec0.mockapi.io/users');
    const users = await response.json();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      showToast('Bu e-posta ile bir hesap zaten var!', 'error');
      return; 
    }

    const createUserResponse = await fetch('https://6794dcfbaad755a134ea9ec0.mockapi.io/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (createUserResponse.ok) {
      const newUser = await createUserResponse.json();
      showToast('Kullanıcı başarıyla oluşturuldu!', 'success');
      console.log('Yeni kullanıcı:', newUser);
    } else {
      showToast('Kullanıcı oluşturulurken bir hata oluştu.', 'error');
    }
  } catch (error) {
    console.error(error);
    showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
  }

  clearForm();
});

const loginForm = document.querySelector("#login");  
const registerForm = document.querySelector("#register");  

loginForm.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    loginButton.click(); 
  }
});

registerForm.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    registerButton.click(); 
  }
});
