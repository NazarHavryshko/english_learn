import {
	createFolder,
	updateElement,
	deleteElement,
	createChpater,
	getChapter,
} from './request.js'
// Folder open and close (start)
function openFolderEL(event) {
	const folderValue = event.target.getAttribute('data-value')
	const x = `.inside-${folderValue}`
	const inside = document.querySelector(x)
	if (inside.classList.contains('close')) {
		inside.classList.remove('close')
	} else {
		inside.classList.add('close')
	}
}

function openFolder() {
	const folders = document.querySelectorAll('.name-folder')

	folders.forEach(element => {
		element.removeEventListener('click', openFolderEL)
		element.addEventListener('click', openFolderEL)
	})
}
// Folder open and close (end)

// Folder, update create (start)
function openPopup() {
	document.getElementById('popupOverlay').style.display = 'flex'
}

function closePopup() {
	document.getElementById('popupOverlay').style.display = 'none'
}

function addFolderSend() {
	const name = document.querySelector('#popupInput').value
	const value = document.querySelector('.accept_btn').getAttribute('data-value')
	if (name) {
		let date
		if (value === 'null') {
			date = {
				name: name,
			}
		} else {
			date = {
				name: name,
				parent: parseInt(value),
			}
		}
		console.log(date)
		createFolder(date)
	}
}

const updateFolderSend = type_el => {
	const name = document.querySelector('#popupInput').value
	const value = document.querySelector('.accept_btn').getAttribute('data-value')
	if (name && value) {
		const date = {
			name: name,
		}
		updateElement(type_el, parseInt(value), date)
	}
}

const onAcceptBtnClick = event => {
	const typeRequest = document
		.querySelector('#popupInput')
		.getAttribute('data-value')

	if (typeRequest === 'add') {
		addFolderSend()
	} else if (typeRequest === 'updateFolder') {
		updateFolderSend('fodler')
	} else if (typeRequest === 'updateChapter') {
		updateFolderSend('chapter')
	}
}

function addNewFolderEL(event) {
	const value = event.currentTarget.getAttribute('data-value')
	const acceptBtn = document.querySelector('.accept_btn')
	const popupInput = document.querySelector('#popupInput')
	popupInput.setAttribute('data-value', 'add')
	popupInput.setAttribute('value', '')
	acceptBtn.setAttribute('data-value', value)
	openPopup()

	acceptBtn.removeEventListener('click', onAcceptBtnClick)
	acceptBtn.addEventListener('click', onAcceptBtnClick)
}

function addNewFolder() {
	const addBtn = document.querySelectorAll('.add_bnt')

	addBtn.forEach(element => {
		element.removeEventListener('click', addNewFolderEL)
		element.addEventListener('click', addNewFolderEL)
	})
}

function updateFolderEL(event) {
	const value = event.currentTarget.getAttribute('data-value')
	const acceptBtn = document.querySelector('.accept_btn')
	const popupInput = document.querySelector('#popupInput')
	const folderName = document.querySelector(`.folder-${parseInt(value)}`)
	popupInput.setAttribute('data-value', 'updateFolder')
	popupInput.setAttribute('value', folderName.textContent)
	acceptBtn.setAttribute('data-value', value)
	openPopup()

	acceptBtn.removeEventListener('click', onAcceptBtnClick)
	acceptBtn.addEventListener('click', onAcceptBtnClick)
}

function updateFolder() {
	const Btns = document.querySelectorAll('.update_bnt')

	Btns.forEach(element => {
		element.removeEventListener('click', updateFolderEL)
		element.addEventListener('click', updateFolderEL)
	})
}

// Folder, update create (end)

// Folder delete (start)
function deleteFolderEL(event) {
	const value = event.currentTarget.getAttribute('data-value')

	deleteElement('folder', value)
}

function deleteFolder() {
	const Btns = document.querySelectorAll('.delete_bnt')

	Btns.forEach(element => {
		element.removeEventListener('click', deleteFolderEL)
		element.addEventListener('click', deleteFolderEL)
	})
}
// Folder delete (end)
// Chapter delete (start)
function deleteChapterEL(event) {
	const value = event.currentTarget.getAttribute('data-value')

	deleteElement('chapter', value)
}

function deleteChapter() {
	const deleteBtns = document.querySelectorAll('.delete_bnt_chapter')

	deleteBtns.forEach(element => {
		element.removeEventListener('click', deleteChapterEL)
		element.addEventListener('click', deleteChapterEL)
	})
}
// Chapter delete (end)
// Chapter update (start)
function updateCpaterEL(event) {
	console.log(123)
	const value = event.currentTarget.getAttribute('data-value')
	const acceptBtn = document.querySelector('.accept_btn')
	const popupInput = document.querySelector('#popupInput')
	const folderName = document.querySelector(`.chapter-${parseInt(value)}`)
	popupInput.setAttribute('data-value', 'updateChapter')
	popupInput.setAttribute('value', folderName.textContent)
	acceptBtn.setAttribute('data-value', value)
	openPopup()

	acceptBtn.removeEventListener('click', onAcceptBtnClick)
	acceptBtn.addEventListener('click', onAcceptBtnClick)
}

function updateCpater() {
	const Btns = document.querySelectorAll('.update_bnt_chapter')

	Btns.forEach(element => {
		element.removeEventListener('click', updateCpaterEL)
		element.addEventListener('click', updateCpaterEL)
	})
}
//Chapter update (end)

// Chapter add (start)
function openChapterCreat() {
	document.getElementById('popupChapter').style.display = 'flex'
}

function closeChapterCreat() {
	document.getElementById('popupChapter').style.display = 'none'
}

const createChapterSent = () => {
	const nameCpapter = document.getElementById('chapterName').value
	const textCpapter = document.getElementById('chapterText').value
	const foldeId = document
		.querySelector('.accept_add_chapter_btn')
		.getAttribute('data-value')
	const date = {
		folder: foldeId,
		name: nameCpapter,
		text: textCpapter.replace(new RegExp('"', 'g'), "'"),
	}
	createChpater(date)
}

const addCpatperAccept = () => {
	const addCpapterBtn = document.querySelector('.accept_add_chapter_btn')

	addCpapterBtn.removeEventListener('click', createChapterSent)
	addCpapterBtn.addEventListener('click', createChapterSent)
}

function addChapterEL(event) {
	const value = event.currentTarget.getAttribute('data-value')
	const acceptBtn = document.querySelector('.accept_add_chapter_btn')
	acceptBtn.setAttribute('data-value', value)
	openChapterCreat()

	addCpatperAccept()
}

function addChapter() {
	const Btns = document.querySelectorAll('.add_chapter_btn')

	Btns.forEach(element => {
		element.removeEventListener('click', addChapterEL)
		element.addEventListener('click', addChapterEL)
	})
}
// Chapter add (end)

// Chapter add (start)

const ckickGetChapterEL = event => {
	const value = event.currentTarget.getAttribute('data-value')
	getChapter(value)
}

function ckickGetChapter() {
	const Btns = document.querySelectorAll('.chapter')

	Btns.forEach(element => {
		element.removeEventListener('click', ckickGetChapterEL)
		element.addEventListener('click', ckickGetChapterEL)
	})
}
// Chapter add (end)

// World click (start)
function putLinks(words) {
	const item2 = words.length > 1 ? words.join('+') : words[0]
	const link1 = document.querySelector('.reverso')
	const link8 = document.querySelector('.thefreedictionary')
	link1.href = `https://context.reverso.net/translation/english-ukrainian/${item2}`
	link8.href = `https://www.thefreedictionary.com/${item2}`

	const item3 = words.length > 1 ? words.join('%20') : words[0]
	const link3 = document.querySelector('.merriam-webster')
	const link7 = document.querySelector('.dict')
	link3.href = `https://www.merriam-webster.com/dictionary/${item3}`
	link7.href = `https://www.dict.com/%D0%B0%D0%BD%D0%B3%D0%BB%D1%96%D0%B8%D1%81%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${item3}`

	const item1 = words.length > 1 ? words.join('-') : words[0]
	const link2 = document.querySelector('.ldoceonline')
	const link4 = document.querySelector('.cambridge')
	const link5 = document.querySelector('.oxfordlearnersdictionaries')
	const link6 = document.querySelector('.collinsdictionary')
	link2.href = `https://www.ldoceonline.com/dictionary/${item1}`
	link4.href = `https://dictionary.cambridge.org/dictionary/english/${item1}`
	link5.href = `https://www.oxfordlearnersdictionaries.com/definition/english/${item1}?q=${item2}`
	link6.href = `https://www.collinsdictionary.com/dictionary/english/${item1}`
}

function extractWord(inputString) {
	const filteredString = inputString.replace(/[^a-zA-Z-]/g, '')

	return filteredString
}
const ckickWordEL = event => {
	const word = event.currentTarget

	if (word.classList.contains('choosed')) {
		word.classList.remove('choosed')
	} else {
		word.classList.add('choosed')
	}
	const choosed = document.querySelectorAll('.choosed')

	let words = new Array()

	choosed.forEach(element => {
		words.push(extractWord(element.textContent))
	})

	putLinks(words)
}

function ckickWord() {
	const Btns = document.querySelectorAll('.click_word')

	Btns.forEach(element => {
		element.removeEventListener('click', ckickWordEL)
		element.addEventListener('click', ckickWordEL)
	})
}
// World click (end)

// hide folders (start)

function hideFoldersEL(event) {
	const btn = event.currentTarget
	const allName = document.querySelector('.fix_div_folders')
	const hideName = document.querySelector('.hide_name')
	const mainDiv = document.querySelector('.main_div')

	if (btn.classList.contains('all_name')) {
		allName.classList.add('close')
		mainDiv.classList.add('close_folder')
		hideName.classList.remove('close')
	} else if (btn.classList.contains('hide_name')) {
		allName.classList.remove('close')
		hideName.classList.add('close')
		mainDiv.classList.remove('close_folder')
	}
}

function hideFolders() {
	const Btns = document.querySelectorAll('.user_name')

	Btns.forEach(element => {
		element.removeEventListener('click', hideFoldersEL)
		element.addEventListener('click', hideFoldersEL)
	})
}
// hide folders (end)
function start() {
	openFolder()
	addNewFolder()
	updateFolder()
	deleteFolder()
	deleteChapter()
	updateCpater()
	addChapter()
	ckickGetChapter()
	hideFolders()
}
export { start, closePopup, closeChapterCreat, ckickWord }
