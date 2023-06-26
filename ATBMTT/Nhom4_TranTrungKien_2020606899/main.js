import mammoth from 'mammoth';
import fs from "fs";
const CryptoJS = require("crypto-js");
const bigInt = require('big-integer');

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// get Textbox element
var tbVanBanKy = $('#van-ban-ky');
var tbChuKy = $('#chu-ky');
var tbCKVanBanKy = $('#ck-van-ban-ky');
var tbCKChuKy = $('#ck-chu-ky');
var tbThongBao = $('#thong-bao');
// var tbNumberP = $('.numberP');

// get Button element
// Type: File
var btnFileVanBanKy = $('#btn-ps-file');
var btnCkFilelVanBanKy = $('#btn-ck-file-van-ban');
var btnCkFileChuKy = $('#btn-ck-file-chu-ky');
// Type: Button
var btnKy = $(".btn-ky");
var btnChange = $(".btn-chuyen");
var btnSave = $(".btn-luu");
var btnCKKy = $(".btn-check-ky");

function readDocx(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const arrayBuffer = e.target.result;

            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                .then(result => {
                    const extractedText = result.value;
                    resolve(extractedText);
                })
                .catch(error => {
                    reject(error);
                });
        };

        reader.onerror = function (e) {
            reject(new Error("Đã xảy ra lỗi khi đọc file."));
        };

        reader.readAsArrayBuffer(file);
    });
}

// Tai file
function download(file, text) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element)
}

// Kiem tra so nguyen to
function isPrime(number) {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

//function get random A
function getRadomA(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Tim ucln của num1, num2
function gcd(num1, num2) {
    if (num1 === 0 || num2 === 0) return num1 + num2;
    if (num1 === num2) return num1;
    if (num1 > num2) return gcd(num1 - num2, num2);
    return gcd(num1, num2 - num1);
}

// Tim so nghich dao cua a (a^-1 mod m)
function modInverse(a, m) {
    let m0 = m;
    let y = 0, x = 1;
    if (m === 1) return 0;
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;

        m = a % m;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < 0) x += m0;
    return x;
}
// Chia lay du xu ly them neu a < 0
function mod(a, m) {
    let result;
    if (a >= 0) result = a % m;
    else {
        result = Math.floor(a / m);
        a = a - (result * m);
        if (a >= 0) result = a;
        else result = a + m;
    }
    return result;
}

// function exponantiation(a, x, p) {
//     let t = 1;
//     while (x > 0) {
//         if (x % 2 != 0) {
//             t = (t * a) % p;
//         }

//         a = (a * a) % p;
//         x = Math.floor(x / 2);
//     }
//     return t % p;
// }

//Tinh theo binh phuong va nhan (a^x mod p) 
function exponantiation(a, x, p) {
    a = bigInt(a);
    x = bigInt(x);
    p = bigInt(p);
    let t = bigInt(1);
    while (x.gt(0)) {
        if (x.mod(2).notEquals(0)) {
            t = t.multiply(a).mod(p);
        }

        a = a.square().mod(p);
        x = x.divide(2);
    }
    return t.mod(p).valueOf();
}


// Hàm băm SHA256 để tính giá trị x
function hash(message) {
    const hashValue = CryptoJS.SHA256(message).toString();
    // Trả về giá trị băm là giá trị x
    return hashValue;
}
// Kiem tra chuoi co phai so he 10
function isNumberic(str) {
    return /^[0-9]+$/.test(str);
}

// Lay ra gia tri trong o input
function getData(element) {
    return element.value;
}

// Gán giá trị cho ô thông báo
function thongMessage(message) {
    tbThongBao.value = message;
}

var App = {
    // Khoa cong khai
    keyPub: {
        valueP: 463,
        valueAlpha: 2,
        valueBeta: 249
    },
    // Khoa bi mat
    keyPri: {
        valueA: 211
    },
    // So x dai dien cho van ban ky( sau khi bam duoc so he hexa va tu hexa chuyen qua he 10)
    x: 112,
    // So k ngau nhien va phai cung nguyen to voi p - 1
    k: 235,
    // Chu ky y = (s1,s2)
    y: {
        s1: 16,
        s2: 108
    },

    // Chon ngau nhien khoa cong khai va khoa rieng tu
    generateElGamalKeys: function () {
        const arr = [];
        const randomP = Math.floor(Math.random() * 1000) + 2;

        for (let i = 1000; i < 10000; i++)
            if (isPrime(i))
                arr.push(i);
        // CHon ngau nhien so nguyen to p
        var valueP = arr[Math.floor(Math.random() * arr.length)];
        // tbNumberP.value = valueP;
        this.keyPub.valueP = valueP;

        //random alpha number a from (1, p-1)
        var valueAlpha;
        do {
            valueAlpha = getRadomA(1, valueP - 1);
        }
        while (gcd(valueP, valueAlpha) !== 1)
        // tbNumberAlpha.value = valueAlpha.toString();
        this.keyPub.valueAlpha = valueAlpha;
        //random a number a from (2, p - 2)
        const valueA = getRadomA(2, valueP - 2);
        // tbNumberA.value = valueA.toString();
        this.keyPri.valueA = valueA;
        // Tinh beta
        const valueBeta = exponantiation(valueAlpha, valueA, valueP);
        // tbNumberBeta.value = valueBeta.toString();
        this.keyPub.valueBeta = valueBeta;
        // Dua khoa cong khai vao localStorage
        var sendData = {
            keyPub: App.keyPub,
        }
        localStorage.setItem('key', JSON.stringify(sendData));
    },

    register: function () {
        // Lay ra nhung khoa ngau nhien da chon o tren
        const valueAlpha = this.keyPub.valueAlpha;
        const valueP = this.keyPub.valueP;
        const valueA = this.keyPri.valueA;
        // Chon khoa k ngau nhien trong khoang (1,p-2) va gcd(k, p - 1) = 1
        var valueK;
        do {
            valueK = getRadomA(1, valueP - 2);
        } while (gcd(valueK, valueP - 1) !== 1)
        // tbNumberK.value = valueK.toString();
        this.valueK = valueK;
        // Bam van ban ky
        const hashVanBanKy = hash(tbVanBanKy.value);
        // Tinh so thu nhat cua chu ky
        const s1 = exponantiation(valueAlpha, valueK, valueP);
        this.y.s1 = s1;
        // So dai dien cho van ban ky sau khi bam
        const x = Number.parseInt(bigInt(hashVanBanKy, 16).divide(Math.pow(10, 67)));
        this.x = x;
        // Tinh so thu hai cua chu ky
        const s2 = mod(((x - valueA * s1) * modInverse(valueK, valueP - 1)), (valueP - 1));
        this.y.s2 = s2;
        // tbNumberY.value = s2;
        // Hien thi ra o textarea chu ky
        tbChuKy.value = `${s1}, ${s2}`;
        console.log(`Khoa cong khai: p-${valueP}, alpha-${valueAlpha}, beta-${this.keyPub.valueBeta}`);
        console.log(`Khoa bi mat: a-${valueA}`);
        console.log(`So k va x: k-${valueK}, x-${x}`);
        console.log(`chu ky: r-${s1}, s-${s2}`);

        var sendData = {
            y: App.y,
        }
        localStorage.setItem('signature', JSON.stringify(sendData));
    },

    checkRegister: function () {
        // Khoa cong khai
        var checkKey = JSON.parse(localStorage.getItem('key'));
        // Chu ky gui di
        var signature = JSON.parse(localStorage.getItem('signature'));

        // Khoa cong khai
        let valueBeta = checkKey.keyPub.valueBeta;
        let valueP = checkKey.keyPub.valueP;
        let valueAlpha = checkKey.keyPub.valueAlpha;
        // Bam van ban ky
        let hashVanBanKy = hash(getData(tbCKVanBanKy));
        // Bam chu ky (nếu chữ ký không phải 1 chuỗi băm hệ hexa thì sẽ thông báo chữ ký sai)
        let chuKy = tbCKChuKy.value.split(", ");
        if (!(isNumberic(chuKy[0]) && isNumberic(chuKy[1]))) {
            thongMessage("Chữ ký sai!");
            return;
        }
        // Bien x la so dai dien cho thong diep
        let valueX = Number.parseInt(bigInt(hashVanBanKy, 16).divide(Math.pow(10, 67)));
        // Gia tri 1 cua chu ky
        let valueS1 = Number.parseInt(chuKy[0]);
        // Gia tri 2 cua chu ky
        let valueS2 = Number.parseInt(chuKy[1]);
        var request1 = mod(exponantiation(valueBeta, valueS1, valueP) * exponantiation(valueS1, valueS2, valueP), valueP);
        var request2 = exponantiation(valueAlpha, valueX, valueP);
        console.log(`Văn bản sau khi băm: ${hashVanBanKy}`);
        console.log(`Vế trái biểu thức-${request1}, Vế phải biểu thức-${request2}`);
        // Kiem tra chu ky va khoa
        if (request1 === request2) {
            thongMessage("Chữ ký đúng!");
        } else {
            thongMessage("Chữ ký sai!");
        }
    },

    sign: function () {
        const str = getData(tbVanBanKy);
        if (str == "") {
            window.alert("Hay nhap van ban ky hoac tai len tep van ban ky!");
            return false;
        }
        // Tao khoa cong khai
        this.generateElGamalKeys();
        // Tao chu ky
        this.register();
        return true
    },

    // Doc file
    readFile: (btnInputFile, tbOutput) => {
        btnInputFile.addEventListener('change', () => {
            const file = btnInputFile.files[0];
            const fileName = file.name;
            // Kiểm tra đuôi file
            const extension = fileName.split('.').pop().toLowerCase();
            // Doc file txt
            if (extension === 'txt') {
                let fileRegister = new FileReader();
                fileRegister.readAsText(file);
                fileRegister.onload = () => {
                    let str = fileRegister.result.toString();
                    tbOutput.value = str;
                }
            }
            // Doc file doc || docx
            else if (extension === 'doc' || extension === 'docx') {
                readDocx(file)
                    .then(extractedText => {
                        tbOutput.value = extractedText;
                    })
                    .catch(error => {
                        console.error("Lỗi khi đọc file .docx:", error);
                    });
            } else {
                console.log('File không hợp lệ');
                return;
            }
        })
    },

    start: function () {
        // Kich hoat lang nghe su kien thay doi khi nhan chon file cua button File ben phat sinh chu ky
        this.readFile(btnFileVanBanKy, tbVanBanKy);
        // Kich hoat lang nghe su kien thay doi khi nhan chon file cua button File van ban ben kiem tra chu ky
        this.readFile(btnCkFilelVanBanKy, tbCKVanBanKy);
        // Kich hoat lang nghe su kien thay doi khi nhan chon file cua button File chu ky ben kiem tra chu ky
        this.readFile(btnCkFileChuKy, tbCKChuKy);

        // Su kien click o nut Ky
        btnKy.addEventListener('click', () => {
            if (this.sign()) {
                window.alert("Ky van ban thanh cong!");
            }
        });
        // Su kien click o nut Chuyen
        btnChange.addEventListener('click', () => {
            if (tbVanBanKy.value == "") {
                window.alert("Chua co van ban ky");
                return;
            }
            if (!this.sign || tbChuKy.value == "") {
                window.alert("Chua tao chu ky!");
                return;
            }
            tbCKVanBanKy.value = tbVanBanKy.value;
            tbCKChuKy.value = tbChuKy.value;
        });
        // Su kien click o nut Luu
        btnSave.addEventListener('click', () => {
            if (this.sign && tbChuKy.value != "") {
                download("chuKy.txt", tbChuKy.value);
            } else {
                window.alert("Chua thuc hien ky hoac truong chu ky rong!");
            }
        });
        // Su kien click o nut Kiem tra chu ky
        btnCKKy.addEventListener('click', () => {
            this.checkRegister();
        })
    }
}

App.start();
