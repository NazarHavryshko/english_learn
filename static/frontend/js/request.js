import { start, closePopup, closeChapterCreat, ckickWord } from './events.js'

function generateFoldersHTML(folders) {
	let html = `<div class="folders_div">`
	let chapterValues = {}

	function generateFolder(folder, depth) {
		const svg_folder =
			'<svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2,18.8V5.3A2.3,2.3,0,0,1,4.3,3H9.6a1.1,1.1,0,0,1,.8.4l2.8,3.2a1.1,1.1,0,0,0,.8.4h5.6A2.2,2.2,0,0,1,22,9.2v9.7A2.2,2.2,0,0,1,19.8,21H4.2A2.2,2.2,0,0,1,2,18.8Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>'
		const svg_plus_folser =
			'<svg fill="green" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>plus-folder</title><path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h16.992q2.432 0 4.512-1.216t3.296-3.296 1.184-4.48v-12.992q0-2.496-1.76-4.256t-4.224-1.76h-6.368q-0.64-1.76-2.176-2.88t-3.456-1.12h-8q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h8q0.8 0 1.408 0.608t0.576 1.408v1.984h10.016q0.8 0 1.408 0.576t0.576 1.408v5.536q-2.272-1.536-4.992-1.536-1.824 0-3.488 0.736t-2.88 1.92-1.92 2.848-0.704 3.52q0 2.72 1.504 4.992h-9.504q-0.832 0-1.44-0.576t-0.576-1.408zM18.016 23.008q0-2.080 1.44-3.552t3.552-1.472 3.52 1.472 1.472 3.552q0 2.080-1.504 3.52t-3.488 1.472q-2.080 0-3.552-1.472t-1.44-3.52zM20 24h2.016v1.984h1.984v-1.984h2.016v-2.016h-2.016v-1.984h-1.984v1.984h-2.016v2.016z"></path></svg>'
		const svg_plus_chapter =
			'<svg fill="green" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M4 30.016q0 0.832 0.576 1.408t1.44 0.576h16.992q1.824 0 3.488-0.704t2.88-1.92 1.92-2.88 0.704-3.488q0-2.272-1.088-4.224t-2.912-3.232v-7.552l-8-8h-13.984q-0.832 0-1.44 0.608t-0.576 1.408v28zM8 28v-24h10.016v6.016h5.984v4.096q-0.576-0.128-0.992-0.128-1.824 0-3.488 0.736t-2.88 1.92-1.92 2.848-0.704 3.52q0 2.72 1.504 4.992h-7.52zM18.016 23.008q0-2.080 1.44-3.52t3.552-1.472 3.52 1.472 1.472 3.52-1.472 3.552-3.52 1.44-3.552-1.44-1.44-3.552zM20 24h2.016v2.016h1.984v-2.016h2.016v-1.984h-2.016v-2.016h-1.984v2.016h-2.016v1.984z"></path></svg>'
		const svg_delete =
			'<svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H20" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
		const svg_update =
			'<svg width="15px" height="15px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 2C11.3358 2 11 2.33579 11 2.75C11 3.16421 11.3358 3.5 11.75 3.5H13.25V24.5H11.75C11.3358 24.5 11 24.8358 11 25.25C11 25.6642 11.3358 26 11.75 26H16.25C16.6642 26 17 25.6642 17 25.25C17 24.8358 16.6642 24.5 16.25 24.5H14.75V3.5H16.25C16.6642 3.5 17 3.16421 17 2.75C17 2.33579 16.6642 2 16.25 2H11.75Z" fill="orange"/><path d="M6.25 6.01958H12.25V7.51958H6.25C5.2835 7.51958 4.5 8.30308 4.5 9.26958V18.7696C4.5 19.7361 5.2835 20.5196 6.25 20.5196H12.25V22.0196H6.25C4.45507 22.0196 3 20.5645 3 18.7696V9.26958C3 7.47465 4.45507 6.01958 6.25 6.01958Z" fill="orange"/><path d="M21.75 20.5196H15.75V22.0196H21.75C23.5449 22.0196 25 20.5645 25 18.7696V9.26958C25 7.47465 23.5449 6.01958 21.75 6.01958H15.75V7.51958H21.75C22.7165 7.51958 23.5 8.30308 23.5 9.26958V18.7696C23.5 19.7361 22.7165 20.5196 21.75 20.5196Z" fill="orange"/></svg>'
		const svg_file = `<svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g id="Complete"><g id="F-File"><g id="Remove"><g><path d="M18,22H6a2,2,0,0,1-2-2V4A2,2,0,0,1,6,2h7.1a2,2,0,0,1,1.5.6l4.9,5.2A2,2,0,0,1,20,9.2V20A2,2,0,0,1,18,22Z" fill="none" id="File" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9" x2="15" y1="16.5" y2="16.5"/></g></g></g></g></svg>`

		const insideClass = `inside-${folder.id}`
		const folderClass = `folder-${folder.id}`
		const chapterClass = `chapter-${folder.id}`
		const insideClasses = `inside close ${insideClass}`
		const valueAttribute = `data-value="${folder.id}"`
		html += `<div class="folder pad">`
		if (folder.type_v === 'folder') {
			html += `<div class="folder_attributes">`
			html += `<div class="icon_name">`
			html += svg_folder
			html += `<span class="name-folder ${folderClass}" ${valueAttribute}>${folder.name}</span>`
			html += '</div>'
			html += `<span class="btns">`
			html += `<button class="add_chapter_btn" ${valueAttribute}>${svg_plus_chapter}</button>`
			html += '<hr size="15">'
			html += `<button class="add_bnt" ${valueAttribute}>${svg_plus_folser}</button>`
			html += `<button class="update_bnt" ${valueAttribute}>${svg_update}</button>`
			html += `<button class="delete_bnt" ${valueAttribute}>${svg_delete}</button>`
			html += `</span>`
			html += '</div>'
		} else if (
			folder.type_v === 'chapter' &&
			!(valueAttribute in chapterValues)
		) {
			html += `<div class="folder_attributes">`
			html += `<div class="icon_name">`
			html += svg_file
			html += `<span class="chapter ${chapterClass}" ${valueAttribute}>${folder.name}</span>`
			html += '</div>'
			html += `<span class="btns">`
			html += `<button class="update_bnt_chapter" ${valueAttribute}>${svg_update}</button>`
			html += `<button class="delete_bnt_chapter" ${valueAttribute}>${svg_delete}</button>`
			html += `</span>`
			html += '</div>'
			chapterValues[valueAttribute] = true
		}

		if (folder.inside && folder.inside.length > 0) {
			html += `<div class="${insideClasses}">`
			html += '<hr>'
			folder.inside.forEach(innerFolder => {
				generateFolder(innerFolder, depth + 1)
			})
			html += `</div>`
		}

		html += `</div>`
	}

	folders.forEach(folder => {
		generateFolder(folder, 1)
	})

	html += '</div>'
	return html
}

function generateChapterTextHTML(chapter) {
	let html = `<h2 class="chpter_name">${chapter.name}</h2>`
	const paragraphs = chapter.text.split(`\n\n`)
	paragraphs.forEach(element => {
		html += `<p>`
		element.split(' ').forEach(el => {
			html += `<span class="click_word">${el} </span>`
		})
		html += `</p>`
	})

	return html
}

function getFolders() {
	const url = 'http://127.0.0.1:8000/api/folder/'

	const token = `Token ${localStorage.getItem('token')}`

	const xhr = new XMLHttpRequest()

	xhr.open('GET', url)
	xhr.setRequestHeader('Authorization', token)

	xhr.onload = function () {
		const resultHTML = generateFoldersHTML(JSON.parse(xhr.response))
		const folders = document.querySelector('.folder_div')
		folders.innerHTML = resultHTML
		start()
	}

	xhr.send()
}

function getUsername() {
	const url = 'http://127.0.0.1:8000/api/user/username/'
	if (localStorage.getItem('token')) {
		const token = `Token ${localStorage.getItem('token')}`

		const xhr = new XMLHttpRequest()

		xhr.open('GET', url)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.setRequestHeader('Authorization', token)

		xhr.onload = function () {
			const folders = document.querySelectorAll('.user_name')
			folders.forEach(element => {
				element.innerHTML = JSON.parse(xhr.response)[0]['username']
			})
		}

		xhr.send()
	}
}

function createFolder(date) {
	const url = 'http://127.0.0.1:8000/api/folder/'
	const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

	const raw = JSON.stringify(date)

	const xhr = new XMLHttpRequest()

	xhr.open('POST', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('X-CSRFToken', csrfToken)

	xhr.onload = function () {
		closePopup()
		getFolders()
	}

	xhr.send(raw)
}

function updateElement(type_el, id, date) {
	let url
	if (type_el === 'folder') {
		url = `http://127.0.0.1:8000/api/folder/${id}/`
	} else if (type_el === 'chapter') {
		url = `http://127.0.0.1:8000/api/chapter/${id}/`
	}
	const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

	const raw = JSON.stringify(date)

	const xhr = new XMLHttpRequest()

	xhr.open('PATCH', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('X-CSRFToken', csrfToken)

	xhr.onload = function () {
		closePopup()
		getFolders()
	}

	xhr.send(raw)
}

function deleteElement(type_el, id) {
	let url
	if (type_el === 'folder') {
		url = `http://127.0.0.1:8000/api/folder/${id}/`
	} else if (type_el === 'chapter') {
		url = `http://127.0.0.1:8000/api/chapter/${id}/`
	}

	const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

	const xhr = new XMLHttpRequest()

	xhr.open('DELETE', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('X-CSRFToken', csrfToken)

	xhr.onload = function () {
		getFolders()
	}

	xhr.send()
}

function createChpater(date) {
	const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

	const url = 'http://127.0.0.1:8000/api/chapter/'

	const raw = JSON.stringify(date)

	const token = `Token ${localStorage.getItem('token')}`

	const xhr = new XMLHttpRequest()

	xhr.open('POST', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('Authorization', token)
	xhr.setRequestHeader('X-CSRFToken', csrfToken)

	xhr.onload = function () {
		closeChapterCreat()
		getFolders()
	}

	xhr.send(raw)
}

function getChapter(id) {
	const url = `http://127.0.0.1:8000/api/chapter/${id}`

	const token = `Token ${localStorage.getItem('token')}`

	const xhr = new XMLHttpRequest()

	xhr.open('GET', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('Authorization', token)

	xhr.onload = function () {
		const resultHTML = generateChapterTextHTML(JSON.parse(xhr.response))
		const folders = document.querySelector('.main_text')
		folders.innerHTML = resultHTML
		ckickWord()
	}

	xhr.send()
}

getFolders()
getUsername()

export { createFolder, updateElement, deleteElement, createChpater, getChapter }
