const CreateCardBtn = document.querySelector('button');
const cards = document.querySelector('.cards');
const form = document.querySelector('.addCard');
const overlay = document.querySelector('.overlay');

// Card Save
let cardSave = JSON.parse(localStorage.getItem('card')) ? JSON.parse(localStorage.getItem('card')) : [];
if (cardSave.length) addCard();


// form edit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const NumPhone = Number(form.phone.value);
    const money = form.money.value.trim();
    form.reset();
    // small error
    console.log(NumPhone)
    const small = document.querySelector('small');
    if (name.length && phone.length && money.length) {
        cardSave.push({ name: name, phone: phone, money: NumPhone });
        showCard()
        addCard();
        removeForm();
    } else {
        small.textContent = "inputlarni hammsini to'ldiring va qayta urinib ko'ring.";

        setTimeout(() => {
            small.textContent = "";
        }, 2500);
    }
})
// form edit end

// add card
function addCard() {
    cards.innerHTML = '';
    cardSave.forEach((item, i) => {
        cards.innerHTML += `<div class="card">
        <div class="name">
            "Taklif qilgan odamni ismi ${i + 1}, " <b>${item.name}</b>
        </div>
        <div class="phone_name">
            "telefon nomi" <b>${item.phone}</b>
        </div>
        <div class="how_much">
            "telefon summasi" <b onclick='replese(${i})'>${item.money} so'm</b>
        </div>
        <div class="remove_card">
            <button onclick="removeCard(${i})">x</button>
        </div>
    </div>`
    });
}
// add card end

// add card button
CreateCardBtn.addEventListener('click', () => {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');
})

// save Storage card
function showCard() {
    localStorage.setItem('card', JSON.stringify(cardSave));
}

// remove form
function removeForm() {
    form.classList.add('hidden');
    overlay.classList.add('hidden');
}
// remove Card
function removeCard(id) {
    const cardFilter = cardSave.filter((item, i) => {
        return i !== id;
    })
    cardSave = cardFilter;
    showCard()
    addCard();
    removeForm();
}
// replese class remove()
function repleseRemove() {
    const replese = document.querySelector('.replese');
    const buttons = document.querySelector('.buttons');
    replese.classList.add('hidden');
    buttons.classList.add('hidden');
}
function replese(id) {
    // buttonlarni tanlab olsih.
    const buttons = document.querySelector('.buttons');
    const lets = document.getElementById('let');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');

    overlay.classList.remove('hidden');

    buttons.classList.remove('hidden');

    // o'zgartirmoqchi bo'lganda chiqadigan hodisa.
    lets.addEventListener('click', () => {
        const replese = document.querySelector('.replese');
        replese.classList.remove('hidden');
        overlay.classList.remove('hidden');
        buttons.classList.add('hidden');

        replese.addEventListener('submit', e => {
            e.preventDefault();

            const repValue = replese.replese.value.trim();
            replese.reset();

            if (repValue.length) {
                const cardMap = cardSave.map((item, i) => {
                    if (id == i) {
                        return { ...item, money: repValue };
                    } else {
                        return { ...item }
                    }
                })
                cardSave = cardMap;
                showCard();
                addCard();
                repleseRemove();
                overlay.classList.add('hidden');
                buttons.classList.add('hidden');
            }
        })
    })
    // lets tugadi.

    // qiymatga qo'shigin.
    plus.addEventListener('click', () => {
        const replese = document.querySelector('.replese');
        replese.classList.remove('hidden');
        overlay.classList.remove('hidden');
        buttons.classList.add('hidden');

        replese.addEventListener('submit', e => {
            e.preventDefault();

            const repValue = Number(replese.replese.value);
            replese.reset();

            if (repValue.length) {
                const cardMap = cardSave.map((item, i) => {
                    if (id == i) {
                        return { ...item, money: item.money += repValue };
                    } else {
                        return { ...item };
                    }
                })
                cardSave = cardMap;
                showCard();
                addCard();
                repleseRemove();
                overlay.classList.add('hidden');
                buttons.classList.add('hidden');
            }
        })
    })
}

// overlay
overlay.addEventListener('click', () => {
    removeCard();
    repleseRemove();

})
document.addEventListener('keyup', e => {
    if (e.key == 'Escape') {
        removeForm();
        repleseRemove();
    }
})

