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

function checkBrowser() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if (check) {
        window.location.replace("./mobile.html");
    }
};
checkBrowser();

async function MoveToPage(pagenumero){
    if (pagenumero >= 0 && pagenumero <= 4){
        $('html, body').animate({
            scrollTop: $("#"+pagenumero).offset().top
        }, 1000);
    }
    setTimeout( () => { ScrollIsBusy = false; },1000)
} 

window.onmousemove = function(e){
    if (page < 1){
        if (e.screenX < 120) {
            document.getElementById('side_menu').style.transform = 'translateX(0px)';
        } else {
            document.getElementById('side_menu').style.transform = 'translateX(-100px)';
        }
    }
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
    var animations = ['up','down','left','right','blur','kitt']
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
        targets[i].classList.remove('from_kitt');

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

function reveal_info(info) {
    var infobox = document.getElementById('telormail')
    infobox.classList.add('from_blur');
    infobox.innerHTML = info;
    setTimeout(() => {
        infobox.classList.remove('from_blur');
        infobox.style.transition = '0.5s ease';
    }, 50);
    infobox.style.transition = '0.0s ease';
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
            // document.getElementById('text17').innerHTML = '';
            // document.getElementById('text18').innerHTML = '';
            // document.getElementById('text19').innerHTML = '';
            // document.getElementById('text20').innerHTML = '';
            // document.getElementById('text21').innerHTML = '';
            // document.getElementById('text22').innerHTML = '';
            // document.getElementById('text23').innerHTML = '';
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
            // document.getElementById('text17').innerHTML = '';
            // document.getElementById('text18').innerHTML = '';
            // document.getElementById('text19').innerHTML = '';
            // document.getElementById('text20').innerHTML = '';
            // document.getElementById('text21').innerHTML = '';
            // document.getElementById('text22').innerHTML = '';
            // document.getElementById('text23').innerHTML = '';
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

