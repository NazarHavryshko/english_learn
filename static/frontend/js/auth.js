function login(date) {
	const url = '/api/user/login/'
	const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

	const raw = JSON.stringify(date)

	const xhr = new XMLHttpRequest()

	xhr.open('POST', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('X-CSRFToken', csrfToken)

	xhr.onload = function () {
		localStorage.setItem('token', JSON.parse(xhr.response).token)
		window.location.href = '/'
	}

	xhr.send(raw)
}

function registration(date) {
	const url = '/api/user/registration/'
	const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

	const raw = JSON.stringify(date)

	const xhr = new XMLHttpRequest()

	xhr.open('POST', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('X-CSRFToken', csrfToken)

	xhr.onload = function () {
		const responseDate = JSON.parse(xhr.response)

		if (
			responseDate.username === date.username &&
			responseDate.email === date.email
		) {
			login({
				username: date.username,
				password: date.password,
			})
		}
	}

	xhr.send(raw)
}

function registrationDate() {
	const registrationBtn = document.querySelector('.reg_but')

	if (registrationBtn) {
		registrationBtn.addEventListener('click', event => {
			const username = document.querySelector('#username')
			const email = document.querySelector('#email')
			const password1 = document.querySelector('#password1')
			const password2 = document.querySelector('#password2')

			if (username && email && password1 && password2) {
				if (password1.value === password2.value) {
					const date = {
						username: username.value,
						email: email.value,
						password: password1.value,
					}
					registration(date)
				} else {
					console.error('Passwords do not match.')
				}
			} else {
				console.error('One or more elements not found.')
			}
		})
	} else {
		console.error('.reg_but not found.')
	}
}

function loginDate() {
	const registrationBtn = document.querySelector('.login_btn')

	if (registrationBtn) {
		registrationBtn.addEventListener('click', event => {
			const username = document.querySelector('#loginUsername')
			const password = document.querySelector('#loginPassword')

			if (username && password) {
				const date = {
					username: username.value,
					password: password.value,
				}
				login(date)
			} else {
				console.error('One or more elements not found.')
			}
		})
	} else {
		console.error('.reg_but not found.')
	}
}

registrationDate()
loginDate()
