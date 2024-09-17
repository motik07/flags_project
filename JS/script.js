//*            made by the student moti oved! 😉
//! ****************** sider declarations: ******************
let sider = document.querySelector("#sider_id");
let hamburger = document.querySelector("#id_sider_btn");
let bool = true;
hamburger.addEventListener("click", (event) => {
  bool = !bool;
  switch (bool) {
    case false:
      sider.style.left = "0%";
      break;
    case true:
      sider.style.left = "-100%";
      break;
  }
  console.log(bool);
});

//?                   code declarations:
let inout = document.querySelector("#id_search_input");
let btn = document.querySelector("#id_1_btn");
let flagImage = document.querySelector("#id_flag_image");
flagImage.src = 'https://icons.iconarchive.com/icons/iconshock/super-vista-business/256/checkered-flag-icon.png';
// flagImage.src = '../image/ready.jpg'
let parent = document.querySelector("#parent");
let countryName = document.querySelector("#id_country_name");
let countryDescription = document.querySelector("#id_country_description");
let URL = "https://restcountries.com/v3.1/all?fields=name,flags";

//^ ……………………………………………………………… API CODE: ………………………………………………………………

async function doApi(flag) {
  try {
    let response = await fetch(URL);
    let data = await response.json();
    rendToHTML(data, flag); //! …………………… DATA TO HTML
    return data;
  } catch (error) {
    console.log(error);
  }
}

//^ ……………………………………………………………… HTML CODE: ………………………………………………………………

function rendToHTML(data, flag) {
  let found = false;
  if (data) {
    for (let item of data) {
      if (item.name.common === flag) {
        console.log(`Country name:`);
        console.log(item.name.common); //! …………………… Extract the country name
        let lang = "";
        for (let keyName in item.name.nativeName) {
          for (let keyNameOf in item.name.nativeName[keyName]) {
            if (
              !lang.includes(`${item.name.nativeName[keyName][keyNameOf]} `)
            ) {
              lang += `${item.name.nativeName[keyName][keyNameOf]} `; //! …………………… Insert to string!
            }
          }
        }
        console.log(`named: ${lang}`);
        countryName.textContent = `Named: "${item.name.common}" or: ${lang}`;
        console.log(`Flag description:` + item.flags.alt); //! …………………… Extract flag description
        countryDescription.textContent = item.flags.alt;
        console.log(`flag src: ` + item.flags.svg);
        flagImage.src = item.flags.png; //! …………………… Extract flag picture
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Error: no matching found!");
      countryName.textContent = `No matching found!`;
      flagImage.src = 'https://icons.iconarchive.com/icons/studiomx/web/256/Earth-Stop-icon.png';
    }
  }
}

//^ ……………………………………………………………… BUTTON EVENTS: ………………………………………………………………

btn.addEventListener("click", (e) => {
  let str = inout.value;
  str[str.length - 1] === " " ? str = str.slice(0, -1) : str;
  str[0] === " " ? str = str.slice(1) : str;
  let flagName = "";
  if (str.length === 0) {
    countryName.textContent = `Please enter country name!`;
    countryDescription.textContent = "";
    flagImage.src = 'https://icons.iconarchive.com/icons/studiomx/web/256/Earth-Scan-icon.png';
  }
  if (str[0] === str[0].toUpperCase()) {
    flagName = str[0] + str.slice(1).toLowerCase();
  } else {
    flagName = str[0].toUpperCase() + str.slice(1);
  }
  doApi(flagName);
});

window.addEventListener("keypress", ($event) => {
  if ($event.key === "Enter") {
    let str = inout.value;
    str[str.length - 1] === " " ? str = str.slice(0, -1) : str;
    str[0] === " " ? str = str.slice(1) : str;
    let flagNmae = "";
    if (str.length === 0) {
      countryName.textContent = `Please enter country name!`;
      countryDescription.textContent = "";
      flagImage.src = 'https://icons.iconarchive.com/icons/studiomx/web/256/Earth-Stop-icon.png';
    }
    if (str[0] === str[0].toUpperCase()) {
      flagNmae = str[0] + str.slice(1).toLowerCase();
    } else {
      flagNmae = str[0].toUpperCase() + str.slice(1);
    }
    doApi(flagNmae);
  }
});





