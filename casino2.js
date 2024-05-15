let number = document.querySelectorAll(".num"),
start = document.querySelector(".start"),
score = document.querySelector(".score"),
spins = document.querySelector(".spins"),
plusY = document.querySelector(".plus").getBoundingClientRect().y,
setting = document.querySelector(".setting"),
startClick = true,
sum = 0,
ballance = 0,
spin = 10

let vis = true
setting.addEventListener("click", () => {
	if (vis == true) {
		document.querySelector(".settingPop").style.visibility = "visible"
		 vis = false
	}else{
		vis = true
		document.querySelector(".settingPop").style.visibility = "hidden"
	}
})


let jump = true 
function jumpPlus() {
	if (window.innerWidth > 250) {
		if (plusY > 40 && jump == true) {
			setTimeout(() => {
				jumpPlus()
				document.querySelector(".plus").style.top = plusY + "px"
				plusY--
				jump = true
			}, 16)
		}else if (plusY < 71){
			setTimeout(() => {
				jumpPlus()
				document.querySelector(".plus").style.top = plusY + "px"
				plusY++
				jump = false
			}, 16)
		}
	}else{
		if (plusY > 25 && jump == true) {
			setTimeout(() => {
				jumpPlus()
				document.querySelector(".plus").style.top = plusY + "px"
				plusY--
				jump = true
			}, 23)
		}else if (plusY < 41){
			setTimeout(() => {
				jumpPlus()
				document.querySelector(".plus").style.top = plusY + "px"
				plusY++
				jump = false
			}, 23)
		}
	}
}


///-------------------------------приз за крутку---------------------

function checkPlus(num){
	ballance += num
	spin--
	score.innerText = `Ваш счет: ${ballance}`
	spins.innerText = `Попыток: ${spin}`
	document.querySelector(".plus").innerText = `+${num}`
}

function check(index, randNum) {
	number[index].innerText = randNum
	if (sum == 3) {
		if (number[0].innerText == number[1].innerText && number[1].innerText == number[2].innerText) {
			checkPlus(2000)
		}else if(number[0].innerText == number[2].innerText){
			checkPlus(1500)
		}else if (Number(number[0].innerText) == Number(number[1].innerText) - 1 && Number(number[1].innerText) == Number(number[2].innerText) - 1) {
			checkPlus(1000)			
		}else if (Number(number[0].innerText) == Number(number[1].innerText) + 1 && Number(number[1].innerText) == Number(number[2].innerText) + 1) {
			checkPlus(1000)
		}else{
			checkPlus(Math.floor(Math.random() * (300 - 100) + 100))
		}
		startClick = true
		start.style.opacity = 1
		jump = true 
		jumpPlus()
		sum = 0
	}
}

///---------------------------запуск казино----------------------



function startCasino1(num) {
	let randNum = Math.floor(Math.random() * 9)
	if (num > 0) {
		setTimeout(() => {
			number[0].innerText = randNum
			startCasino1(num - 1)
		}, 30)
	}else{
		sum++
		check(0, randNum)
	}
}
function startCasino2(num) {
	let randNum = Math.floor(Math.random() * 9)
	if (num > 0) {
		setTimeout(() => {
			number[1].innerText = randNum
			startCasino2(num - 1)
		}, 30)
	}else{
		sum++
		check(1, randNum)
	}
}
function startCasino3(num) {
	let randNum = Math.floor(Math.random() * 9)
	if (num > 0) {
		setTimeout(() => {
			number[2].innerText = randNum
			startCasino3(num - 1)
		}, 30)
	}else{
		sum++
		check(2, randNum)
	}
}

function rand(max, min = 50){
	return Math.floor(Math.random() * (max - min) + min)
}

start.addEventListener("click", () => {
	if (spin > 0 && startClick == true) {
		let rand1 = rand(Math.floor(Math.random() * (100 - 50) + 50))
		let rand2 = rand(Math.floor(Math.random() * (100 - 50) + 50))
		let rand3 = rand(Math.floor(Math.random() * (100 - 50) + 50))
		startCasino1(rand1)
		startCasino2(rand2)
		startCasino3(rand3)
		startClick = false
		start.style.opacity = 0.4
	}
})