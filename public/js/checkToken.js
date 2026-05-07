if (!localStorage.getItem('token')) {
  window.location.href = '/users/login';
}

(async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('/users/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      alert('Invalid token');
      window.location.href = '/users/login';
    }

    localStorage.setItem('userDate', JSON.stringify(result.user));
  } catch (e) {
    alert('Invalid token');
    window.location.href = '/users/login';
  }
})();