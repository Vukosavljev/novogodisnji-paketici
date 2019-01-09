function Artikal(ime, a, b) {
    this.ime = ime;
    this.cena = a;
    this.kolicina = b;
}

Artikal.prototype.izracunajUk = function () {
    return this.cena * this.kolicina;
}
let UkupnaVrednostPoklona = 0;
let paketici;
if (localStorage.getItem('paketici') === null) {
    paketici = [];
} else {
    paketici = JSON.parse(localStorage.getItem('paketici'));
} 

let porudzbina = [new Artikal('Lopta', 750, 0), new Artikal('Novogodisnji ukras', 400, 0),
 new Artikal('Slatkisi', 400, 0), new Artikal('Lutka', 1100, 0), new Artikal('Automobil', 1100, 0)]
document.getElementById('izaberi-poklon').addEventListener('click', function (e) {
    e.preventDefault();
    let ime = document.getElementById('ime').value;
    let muski = document.getElementById('muski').checked;
    let zenski = document.getElementById('zenski').checked;
    
    if(/^[A-ZŠĐČĆŽ]{2,}$/gi.test(ime) && (muski || zenski)) {
        document.getElementById('tabela').style.display = 'block';
        if(muski) {
            document.getElementById('lutka-cena').style .backgroundColor = 'red';
            document.getElementById('lutka-cena').readOnly = true;
            document.getElementById('lutka-kolicina').style .backgroundColor = 'red';
            document.getElementById('lutka-kolicina').readOnly = true;
            document.getElementById('lutka-ukupno').readOnly = true;
            document.getElementById('lutka-ukupno').style.backgroundColor = 'red';
        }
        if(zenski) {
            document.getElementById('automobil-cena').style .backgroundColor = 'red';
            document.getElementById('automobil-cena').readOnly = true;
            document.getElementById('automobil-kolicina').style .backgroundColor = 'red';
            document.getElementById('automobil-kolicina').readOnly = true;
            document.getElementById('automobil-ukupno').readOnly = true;
            document.getElementById('automobil-ukupno').style.backgroundColor = 'red';
        }
    }
    else {
        alert("Za odabir artikala neophodno je popuniti ime i pol deteta")
    }
});

document.getElementById('odustani').addEventListener('click', function () {
    location.reload();
})

document.querySelectorAll('.kolicina').forEach(element => {
    element.addEventListener('keyup', function () {

        let loptaUkupno = document.getElementById('lopta-ukupno')
        let NUUkupno = document.getElementById('NU-ukupno')
        let slatkisiUkupno = document.getElementById('slatkisi-ukupno')
        let automobilUkupno = document.getElementById('automobil-ukupno')
        let lutkaUkupno = document.getElementById('lutka-ukupno')

        porudzbina[0].kolicina = Number(document.getElementById('lopta-kolicina').value);
        porudzbina[1].kolicina = Number(document.getElementById('NU-kolicina').value);
        porudzbina[2].kolicina = Number(document.getElementById('slatkisi-kolicina').value);
        porudzbina[3].kolicina = Number(document.getElementById('lutka-kolicina').value);
        porudzbina[4].kolicina = Number(document.getElementById('automobil-kolicina').value);

        loptaUkupno.value = porudzbina[0].izracunajUk();
        NUUkupno.value = porudzbina[1].izracunajUk();
        slatkisiUkupno.value = porudzbina[2].izracunajUk();
        lutkaUkupno.value = porudzbina[3].izracunajUk();
        automobilUkupno.value = porudzbina[4].izracunajUk();
        UkupnaVrednostPoklona = Number(loptaUkupno.value) + Number(NUUkupno.value)
         + Number(slatkisiUkupno.value) + Number(lutkaUkupno.value) + Number(automobilUkupno.value);
        })
    })
    
document.getElementById('potvrdi-kupovinu').addEventListener('click', function () {
    if (UkupnaVrednostPoklona > document.getElementById('select-value').value) {
        alert('Vas poklon premasuje planirani iznos')
    }

    document.getElementById('select-value').value
    porudzbina.push(UkupnaVrednostPoklona);
    localStorage.setItem('paketici', JSON.stringify(porudzbina))
    console.log(porudzbina);
    
    window.open('izbrani-pokloni.html', '_blank', 'width=300, heigth=300, top=0, rigth=0');
})



