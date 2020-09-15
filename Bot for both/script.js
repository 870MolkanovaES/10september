// ==UserScript==
// @name         Bot for both1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==
let sites={
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой', 'Как звучит флейта', 'Кларнет', 'Саксофон', 'Тромбон', 'Валторна'],
    "crushdrummers.ru":['Барабанное шоу', 'Заказать барабанное шоу', 'Шоу барабанщиков в Москве']
};
let site=Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let yandexInput=document.getElementById("text");
let googleInput=document.getElementsByName("q")[0];
let keywords=sites[site];
let keyword=keywords[getRandom(0,keywords.length)];
let button=document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];
let btnK=document.getElementsByName("btnK")[0];
let i=0;
let links=document.links;

let searchPages={
    "yandex.ru":[],
    "www.google.com":[]
};
let searchPage=Object.keys(searchPages)[getRandom(0, Object.keys(searchPages).length)];


if(button !=undefined){
    document.cookie="site="+site;
}else if(location.hostname=="yandex.ru"){
    site=getCookie("site");
}else{
    site=location.hostname;
}

if(button !=undefined){
    document.cookie="site="+site;
    let timerId=setInterval(()=>{
     yandexInput.value += keyword[i];
     i++;
     if (i==keyword.length){
     clearInterval(timerId);
     button.click();
     }
    },1000);
}else if(location.hostname==site){
 setInterval(()=>{
        let index=getRandom(0,links.length);
        if (getRandom(0,101)>=80){
        location.href=searchPage;
        }
        else if (links[index].href.indexOf(site) != -1)
          links[index].click();
        },getRandom(3000,7000));
}else{
 let nextYandexPage=true;
 for(let i=0; i<links.length; i++){
     if (links[i].href.indexOf(site) != -1) {
         let link=links[i];
         link.removeAttribute("target");
         nextYandexPage=false;
         setTimeout(()=>{link.click();},getRandom(1000,4000));
         break;
     }
 }
 if (document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0].innerText=="10"){
     nextYandexPage=false;
     location.href='https://yandex.ru/';
 }
 if (nextYandexPage){
     setTimeout(()=>{document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem link_js_inited")[0].click();},getRandom(1000,4000));
 }
}






if(btnK !=undefined){
 document.cookie= "site="+site;
}else if(location.hostname=="www.google.com"){
    site=getCookie("site");
}else{
    site=location.hostname;
}

if(btnK !=undefined){
 document.cookie= "site="+site;
 let timerId=setInterval(()=>{
  googleInput.value += keyword[i];
  i++;
  if (i==keyword.length){
     clearInterval(timerId);
     btnK.click();
  }
 },1000);
}else if(location.hostname==site){
    setInterval(()=>{
        let index=getRandom(0,links.length);
        if (getRandom(0,101)>=80){
        location.href='https://www.google.com/';
        }
        else if (links[index].href.indexOf(site) != -1)
          links[index].click();
        },getRandom(3000,7000));
}else{
 let nextGooglePage=true;
 for(let i=0; i<links.length; i++){
  if (links[i].href.indexOf(site) != -1) {
      let link=links[i];
      nextGooglePage=false;
      setTimeout(()=>{link.click();},getRandom(1000,4000));
      break;
  }
 }
 if (document.querySelector('.YyVfkd').innerText=="10"){
     nextGooglePage=false;
     location.href='https://www.google.com/';
 }
 if (nextGooglePage){
     setTimeout(()=>{pnnext.click();},getRandom(1000,4000));
 }
}



function getRandom(min,max){
 return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
