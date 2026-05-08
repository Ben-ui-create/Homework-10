const user = JSON.parse(localStorage.getItem('userDate'));

console.log(user)

const userInfo = document.querySelector('#user_info')

if (userInfo) {
  for (const [key, value] of Object.entries(user)) {
    const span = document.createElement('span');
    const br = document.createElement('br');

    span.innerHTML = `
    <strong style="color: #00B7FF">${key}:</strong>
    <strong>${value}</strong>
    `;

    userInfo.append(span);
    userInfo.append(br);
  }
}


// const postData = document.querySelector('#postData');
//
// // if (postData) {
//
//   const btn = document.querySelector('#saveBtn');
//
//   btn.addEventListener('click', async () => {
//
//     const inputTitle = document.querySelector('#input_title');
//     const inputContent = document.querySelector('#input_content');
//
//     const post = {
//       title: inputTitle.value,
//       content: inputContent.value,
//     };
//
//     console.log(post);
//
//     try {
//       const response = await fetch('/posts/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(post),
//       });
//
//       const data = await response.json();
//       console.log(data);
//
//       window.location.href = '/posts/create';
//     } catch (e) {
//       console.error(e);
//     }
//   });
// // }

console.log('HOME SCRIPT initialized');

const saveBtn = document.querySelector('#saveBtn');

if (saveBtn) {

  saveBtn.addEventListener('click', async () => {

    const inputTitle = document.querySelector('#input_title');
    const inputContent = document.querySelector('#input_content');

    const generalErrorDiv = document.querySelector('#generalError');

    if (!inputTitle || !inputContent) {
      console.error('Inputs not found');
      return;
    }

    const data = {
      title: inputTitle.value,
      content: inputContent.value,
    };

    console.log(data);

    try {

      const response = await fetch('/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          // JWT token
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {

        if (generalErrorDiv) {
          generalErrorDiv.textContent =
            result.message || 'Post creation failed';
        }

        return;
      }

      // очистка полей
      inputTitle.value = '';
      inputContent.value = '';

      // закрытие modal bootstrap
      const modalElement = document.querySelector('#exampleModal');

      const modal = bootstrap.Modal.getInstance(modalElement);

      modal.hide();

      // обновление страницы
      window.location.reload();

    } catch (e) {

      console.error(e);

      if (generalErrorDiv) {
        generalErrorDiv.textContent =
          'Network error';
      }

    }

  });

}