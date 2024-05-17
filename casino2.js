let number = document.querySelectorAll(".num"),
start = document.querySelector(".start"),
score = document.querySelector(".score"),
spins = document.querySelector(".spins"),
plusY = document.querySelector(".plus").getBoundingClientRect().y,
setting = document.querySelector(".setting"),
cup = document.querySelector(".cup"),
signinOther = document.querySelector(".signinOther"),
loginOther = document.querySelector(".loginOther"),
signin = document.querySelector(".signin"),
login = document.querySelector(".login"),
blur = document.querySelector(".blur"),
signInput = document.querySelector(".signInput"),
signPass = document.querySelector(".signPass"),
logInput = document.querySelector(".logInput"),
logPass = document.querySelector(".logPass"),
leaderBoard = document.querySelector(".leaderBoard"),
startClick = true,
id = null,
sum = 0,
ballance = 0,
spin = 0



async function updateData(url, updatedData) {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        console.log('Успешное обновление:', result);
    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
    }
}

 




async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
	body: JSON.stringify(data),
  });
  return response.json();
}



signin.addEventListener('click', async () => {
	let arr = await listenerUser('https://c79c5ec2a76f5ec8.mokky.dev/users')
	if (signInput.value.length > 0 && signPass.value.length > 0 && signInput.value.length < 20 && arr.filter(le => le.login === signInput.value).length == 0) {
		postData("https://c79c5ec2a76f5ec8.mokky.dev/users", { login: signInput.value, pass: signPass.value, score: 0, spins: 15 })
		document.querySelector(".logIn").style.display = 'flex'
		document.querySelector(".signIn").style.display = 'none'
		document.querySelector(".loginErr").innerText = 'Теперь войдите в аккаунт'
	}else if (signInput.value.length == 0 || signPass.value.length == 0) {
		document.querySelector(".signinErr").innerText = 'Минимум один символ'
	}else if (signInput.value.length >= 20) {
		document.querySelector(".signinErr").innerText = 'Слишком много символов'
	}else{
		document.querySelector(".signinErr").innerText = 'Имя уже занято'
	}
})
signInput.addEventListener("input", () => {
	document.querySelector(".signinErr").innerText = ''
})
signPass.addEventListener("input", () => {
	document.querySelector(".signinErr").innerText = ''
})

async function leaders() {
	let arr = await listenerUser('https://c79c5ec2a76f5ec8.mokky.dev/users?sortBy=-score')
	for(let i = 0; i < arr.length; i++){
		let div = document.createElement('div');
		div.className = "alert";
		div.innerHTML = `${i + 1}. ${arr[i].login} - ${arr[i].score}`
		leaderBoard.appendChild(div)
	}
}
const listenerUser = async (url) => {
	let res = await fetch(url)
	let text = await res.text()
	let arr = JSON.parse(text)
	return arr
}


async function loginOn(arr) {
	await leaders()
	document.querySelector(".game").style.display = 'block'
	document.querySelector(".logIn").style.display = 'none'
    id = arr.findIndex(obj => obj.login == logInput.value) + 1
    score.innerText = `Ваш счет: ${arr[id - 1].score}`
	spins.innerText = `Попыток: ${arr[id - 1].spins}`
	spin = arr[id - 1].spins
	ballance = arr[id - 1].score
}

login.addEventListener('click', async () => {
	let arr = await listenerUser('https://c79c5ec2a76f5ec8.mokky.dev/users')
	for(let i = 0; i < arr.length; i++){
        if (arr[i].login == logInput.value && arr[i].pass == logPass.value) {
    		loginOn(arr)
    	}else{
    		document.querySelector(".loginErr").innerText = 'Неверный логин или пароль'
    	}
	}
})

signinOther.addEventListener("click", () => {
	document.querySelector(".signIn").style.display = 'flex'
	document.querySelector(".logIn").style.display = 'none'
	document.querySelector(".loginErr").innerText = ''
	document.querySelector(".signinErr").innerText = ''
})
loginOther.addEventListener("click", () => {
	document.querySelector(".logIn").style.display = 'flex'
	document.querySelector(".signIn").style.display = 'none'
	document.querySelector(".loginErr").innerText = ''
	document.querySelector(".signinErr").innerText = ''
})


setting.addEventListener("click", () => {
	document.querySelector(".settingPop").style.visibility = "visible"
	document.querySelector(".blur").style.display = "block"
})
cup.addEventListener("click", () => {
	document.querySelector(".leaderBoard").style.visibility = "visible"
	document.querySelector(".blur").style.display = "block"
})
close.forEach(le => {
	le.addEventListener("click", () => {
		document.querySelector(".settingPop").style.visibility = "hidden"
		document.querySelector(".leaderBoard").style.visibility = "hidden"
		document.querySelector(".blur").style.display = "none"
	})
});
blur.addEventListener("click", () => {
		document.querySelector(".settingPop").style.visibility = "hidden"
		document.querySelector(".leaderBoard").style.visibility = "hidden"
		document.querySelector(".blur").style.display = "none"
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

async function checkPlus(num){
	ballance += num
	spin--
	score.innerText = `Ваш счет: ${ballance}`
	spins.innerText = `Попыток: ${spin}`
	await updateData(`https://c79c5ec2a76f5ec8.mokky.dev/users/${id}`, { score: ballance, spins: spin});
	document.querySelector(".plus").innerText = `+${num}`
	leaderBoard.innerHTML = "<img src='x.svg' alt='x' class='close'>"
	await leaders()
	close = document.querySelectorAll(".close")
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