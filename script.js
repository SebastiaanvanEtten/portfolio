window.onwheel = function(){return false;};

setTimeout(() => {
    document.getElementById('screen_overlay').style.opacity = '0';
}, 1500);
setTimeout(() => {
    RemoveAnimElement(0,'down');
    window.onwheel =  function(e) {
        if (AllowedToMove) {
            if (!ScrollIsBusy){
                ScrollIsBusy = true;
                if (e.deltaY < 0){
                    MoveToPage(page - 1);
                }
                else {
                    MoveToPage(page + 1);
                }
            }
        }
    };
}, 1750);
setTimeout(() => {
    document.getElementById('screen_overlay').remove();
}, 2000);
window.onload = function(){
    alert('de website is nog niet af, komt u later nog eens terug');
    $('[data-toggle="tooltip"]').tooltip(); 
    $('html, body').animate({
        scrollTop: $("#main").offset().top
    }, 1);

    configureButtons();

    document.getElementById('age').innerHTML = GetAge();
    document.getElementById('schooljaar').innerHTML = GetSchoolYear();

    var main = document.getElementById('main');
}
var previous = 0;
var page = 0;
var MenuOpen = false;
var ScrollIsBusy = false;
var AllowedToMove = true;

function GetAge(){
    return Math.floor(Math.abs(new Date() - new Date(1997,1,10))/31536000000);
}
function GetSchoolYear() {
    return Math.ceil(Math.abs(new Date()-new Date(2016,9,1))/31536000000);
}


async function MoveToPage(pagenumero){
    if (pagenumero >= 0 && pagenumero <= 4){
        $('html, body').animate({
            scrollTop: $("#"+pagenumero).offset().top
        }, 1000);
    }
    setTimeout( () => { ScrollIsBusy = false; },1000)
} 

window.onscroll = function() {
    if (AllowedToMove) {
        for (var i = 0; i < 5;i++){
            var halfwindow = window.innerHeight / 2;
            if ((window.innerHeight * i)-1 < (window.scrollY + halfwindow) && (window.scrollY + halfwindow) < (window.innerHeight * (i+1))){
                
                if (page != i){
                    previous = page;
                    if (i > previous){
                        UpdateView(i,'up');
                    }
                    else {
                        UpdateView(i,'down');
                    }
                    highlightSideMenu(i);
                }
                page = i;
                if (window.innerWidth > 768){
                    if (page > 0) {
                        document.getElementById('side_menu').style.transform = 'translateX(0px)';
                    }
                    else {
                        document.getElementById('side_menu').style.transform = 'translateX(-100px)';
                    }
                }
                //document.getElementById('homo').innerHTML = 'Page: '+page+" prev: "+previous+" | scroll: "+window.scrollY;
                var prgrs = ((window.scrollY*100)/(main.offsetHeight*100))*100;
                document.getElementById('prgrs').style.height = 'calc('+prgrs + '% - 10px)';
            }
        }
    }
}
function defectit() {
    var modalname = document.getElementsByClassName('active')[0].children[0].dataset.target;
    AllowedToMove = false;
    $(modalname).on("hidden.bs.modal", function (e) {
        AllowedToMove = true;
    });
}

function UpdateView(i,direction){
    RemoveAnimElement(i);
    AddAnimElements(previous, direction);
}
function AddAnimElements(pagenum,dir){
    var targets = document.getElementsByClassName(pagenum);
    var animations = ['up','down','left','right','blur']
    for (var i = 0; i < targets.length;i++){
        for (var k = 0;k < animations.length;k++){
            targets[i].classList.add('smoothstyle');
            if (targets[i].classList.contains('anim_page')){
                targets[i].classList.add('from_'+dir);
            }
            else if (targets[i].classList.contains('anim_up_or_down')){
                if (dir == 'down'){
                    targets[i].classList.add('from_up');
                }
                else {
                    targets[i].classList.add('from_down');
                }
            }
            else if (targets[i].classList.contains('anim_'+animations[k])){
                targets[i].classList.add('from_'+animations[k]);
            }
        }
        SmoothAddOrDel(pagenum,'add');
    }
}
async function SmoothAddOrDel(pagenum,operation) {
    if (operation == 'del'){
        setTimeout( () => {
            var targets = document.getElementsByClassName(pagenum);
            for (var i = 0; i < targets.length;i++){
                targets[i].classList.remove('smoothstyle');
            }
        },1000);
    }
    else if (operation == 'add') {
        setTimeout( () => {
            var targets = document.getElementsByClassName(pagenum);
            for (var i = 0; i < targets.length;i++){
                targets[i].classList.add('smoothstyle');
            }
        },1010);
    }
    else {
        console.log("operation doesn't exist");
    }
}
function RemoveAnimElement(pagenum){
    var targets = document.getElementsByClassName(pagenum);
    for (var i = 0; i < targets.length;i++){
        targets[i].classList.remove('from_up');
        targets[i].classList.remove('from_down');
        targets[i].classList.remove('from_left');
        targets[i].classList.remove('from_right');
        targets[i].classList.remove('from_blur');

        SmoothAddOrDel(pagenum,'del');
    }
}
function highlightSideMenu(pagenumber){
    var docs = document.getElementsByClassName('side_menu_icon_afbeelding');
    for (var i = 0;i<docs.length;i++){
        if (i == pagenumber){
            docs[i].style.opacity = '1';
        }
        else {
            docs[i].style.opacity = '0.3';
        }
    }
}
function ttt() {
    return 'hoomooo';
}
var Dutch = true; 

function Change_lang(langu) {
    var nl = document.getElementById('dutchL');
    var eng = document.getElementById('engL');
    if (langu == 'nl') {
        if (!Dutch){
            Dutch = true;
            nl.classList.add('HL');
            eng.classList.remove('HL');
            document.getElementById('text1').innerHTML = 'Welkom op mijn portfolio, mijn naam is Sebastiaan van Etten. Ik ben een programmeur in opleiding aan de Hogeschool Rotterdam. Op deze website upload ik projecten waar ik aan heb gewerkt, Zowel school projecten als eigen projecten.'
            document.getElementById('text2').innerHTML = 'Lees meer over mij';
            document.getElementById('text3').innerHTML = 'Over mij';
            document.getElementById('text4').innerHTML = 'Mijn naam is Sebastiaan van Etten. Ik ben een '+GetSchoolYear()+'e jaars informatica student op de Hogeschool Rotterdam.';
            document.getElementById('text5').innerHTML = 'Ik ben '+GetAge()+' jaar oud en beschrijf mijzelf als een ambitieuze ontwikkelaar. Van jongs af aan ben ik al bezig met ontdekken hoe dingen in elkaar zitten. Zelf vind ik het erg mooi om iets te bouwen.';
            document.getElementById('text6').innerHTML = 'Programmeren past erg bij mij, omdat ik het leuk vind om oplossingen te ontdekken voor complexe problemen en deze te bouwen.';
            document.getElementById('text7').innerHTML = 'Naast school ben ik onder andere bezig met eigen projecten en freelance werk. Zo ben ik af en toe bezig met het maken of onderhouden van een website.';
            document.getElementById('text8').innerHTML = "dit ben ik ook actief bezig met het opdoen van ervaring tijdens mijn bijbaan als junior developer bij <a target='_blank' href='https://www.idealnet.nl/' >Idealnet</a>.";
            document.getElementById('text9').innerHTML = 'Natuur &#38; Techniek';
            document.getElementById('text10').innerHTML = 'Digitale Media certificaat';
            document.getElementById('text11').innerHTML = 'HBO 1e jaar Propedeuse,<br>Hogeschool Rotterdam, informatica';
            document.getElementById('text12').innerHTML = 'Projecten';
            document.getElementById('text13').innerHTML = 'Vaardigheden';
            document.getElementById('text14').innerHTML = 'Programmeertalen';
            document.getElementById('text15').innerHTML = 'Programmeer software';
            document.getElementById('text16').innerHTML = 'Overige software';
            document.getElementById('text17').innerHTML = '';
            document.getElementById('text18').innerHTML = '';
            document.getElementById('text19').innerHTML = '';
            document.getElementById('text20').innerHTML = '';
            document.getElementById('text21').innerHTML = '';
            document.getElementById('text22').innerHTML = '';
            document.getElementById('text23').innerHTML = '';
        }
    }
    else if (langu == 'eng') {
        if (Dutch) {
            Dutch = false;
            eng.classList.add('HL');
            nl.classList.remove('HL');
            document.getElementById('text1').innerHTML = 'Welcome to my portfolio, my name is Sebastiaan van Etten. I am currently studying computer science at the Rotterdam university of applied sciences. On this website I will be uploading projects that I have worked on, both school and personal projects.'
            document.getElementById('text2').innerHTML = 'Read more about me';
            document.getElementById('text3').innerHTML = 'About me';
            document.getElementById('text4').innerHTML = 'My name is Sebastiaan van Etten. I am studying computer science at the Rotterdam university of applied science. I am currently in my '+GetSchoolYear()+'nd year.';
            document.getElementById('text5').innerHTML = 'I am '+GetAge()+' years old and describe myself as an ambitious developer. I have always been eager to discovering how things work. I also like to build things of my own.';
            document.getElementById('text6').innerHTML = 'computer programming is something that fits me, because i like figuring out complex problems and find a solution for them.';
            document.getElementById('text7').innerHTML = 'In addition to school, I am also working on my own projects and doing freelance work. from time to time I am busy with creating a website or maintaining one.';
            document.getElementById('text8').innerHTML = "In addition to all this, I am also gaining experience during my job as a junior developer at <a target='_blank' href='https://www.idealnet.nl/' >Idealnet</a>.";
            document.getElementById('text9').innerHTML = 'Nature &#38; Technology';
            document.getElementById('text10').innerHTML = 'Digital Media certificate';
            document.getElementById('text11').innerHTML = 'HBO 1st year propaedeutic diploma,<br>Rotterdam university of applied science, computer science';
            document.getElementById('text12').innerHTML = 'Projects';
            document.getElementById('text13').innerHTML = 'Skills';
            document.getElementById('text14').innerHTML = 'Programming languages';
            document.getElementById('text15').innerHTML = 'Programming software';
            document.getElementById('text16').innerHTML = 'Other software';
            document.getElementById('text17').innerHTML = '';
            document.getElementById('text18').innerHTML = '';
            document.getElementById('text19').innerHTML = '';
            document.getElementById('text20').innerHTML = '';
            document.getElementById('text21').innerHTML = '';
            document.getElementById('text22').innerHTML = '';
            document.getElementById('text23').innerHTML = '';
        }
    }
}

function configureButtons(){
    $("#about").click(function() {
        $('html, body').animate({
            scrollTop: $("#1").offset().top
        }, 1000);
    });
    $("#pff").click(function() {
        $('html, body').animate({
            scrollTop: $("#1").offset().top
        }, 1000);
    });
    
    $("#contact").click(function() {
        $('html, body').animate({
            scrollTop: $("#4").offset().top
        }, 1000);
    });

    $("#menu_home").click(function() {
        $('html, body').animate({
            scrollTop: $("#0").offset().top
        }, 1000);
    });
    $("#menu_about").click(function() {
        $('html, body').animate({
            scrollTop: $("#1").offset().top
        }, 1000);
    });

    $("#menu_projects").click(function() {
        $('html, body').animate({
            scrollTop: $("#2").offset().top
        }, 1000);
    });
    
    $("#menu_skills").click(function() {
        $('html, body').animate({
            scrollTop: $("#3").offset().top
        }, 1000);
    });
    
    $("#menu_contact").click(function() {
        $('html, body').animate({
            scrollTop: $("#4").offset().top
        }, 1000);
    });
}

