
var CONFIRM_NAVIGATION = 0;

function openConfirmDialog(body, callbacks){
  openDialog("Confermare azione", body, "confirm", callbacks);
}

function openInfoDialog(body){
  openDialog("", body, "alert", null);
}

function openAlertDialog(body){
  openDialog("Nota", body, "alert", null);
}

// var used to store the dialog answer
function openDialog(title, text, buttons, callbacks){

  if(buttons == "alert"){ buttons = ["Chiudi"];}
  if(buttons == "confirm"){ buttons = ["Si", "No"];}
  if(buttons == "confirm_cancellable"){ buttons = ["Si", "No"];}

  if(isNullOrUndefined(title)){ title = "Messaggio dal sito";}
  if(isNullOrUndefined(text)){ text = "";}
  if(isNullOrUndefined(buttons)){ buttons = ["Chiudi"];}
  if(isNullOrUndefined(callbacks)){ callbacks = []; }

  if(buttons.length == 0){ buttons = ["Chiudi"];}

  dialog_user_answer = undefined;

  let inkdrop = document.createElement("div");
  inkdrop.className = "modal_dialog_inkdrop";
  inkdrop.id = "modal_ink_drop";

  let dialog = document.createElement("div");
  dialog.className = "modal_dialog";

  let inner_dialog =  "<div class=\"modal_title\">"+title+"</div>"+"<div class=\"modal_text\">"+generateMultilineHTMLfromString(text)+"</div>\n";

  inner_dialog += "<div style=\"text-align: end;\">\n";
  for(let i = 0; i < buttons.length; i++){
    let callback = callbacks.length > i ? callbacks[i] : "";
    inner_dialog += "<div class=\"modal_button\" onclick=\"dialogButtonCallback('"+callback+"');\">"+buttons[i]+"</div>\n";
  }
  inner_dialog += "</div>\n";

  dialog.innerHTML = inner_dialog;

  inkdrop.appendChild(dialog);

  document.documentElement.appendChild(inkdrop);

  setTimeout(fadeInDialog, 50);
}

function isNullOrUndefined(obj) {
    return (obj == undefined || obj == null || obj == "undefined");
}

function generateMultilineHTMLfromString(text){
  if(isNullOrUndefined(text)){
    return "";
  }

  let spl = text.split("\n");
  if(spl.length == 1){
    return text;
  }else{
    let output = "";
    for(let i = 0; i < spl.length; i++){
        output += "<div>"+spl[i]+"</div>";
    }
    return output;
  }
}

function fadeInDialog(){
  let drop = document.getElementById("modal_ink_drop");
  drop.style.opacity = "1";
}

function dialogButtonCallback(callback){

  let drop = document.getElementById("modal_ink_drop");
  drop.parentNode.removeChild(drop);

  if(callback.length > 0){
    window[callback]();
  }
}



function toggleAPISpinner(toggle){

  if(toggle){

        let spinner_backdrop = document.createElement("div");
        spinner_backdrop.className = "api_spinner_backdrop";
        document.body.appendChild(spinner_backdrop);

        let spinner = document.createElement("div");
        spinner.className = "api_spinner";
        document.body.appendChild(spinner);
  }else{
        let l = document.getElementsByClassName("api_spinner_backdrop");
        if (l.length != 0) {
          l[0].parentElement.removeChild(l[0]);
        }
        let r = document.getElementsByClassName("api_spinner");
        if (r.length != 0) {
          r[0].parentElement.removeChild(r[0]);
        }
  }
}


function textForApiErrorCode(message){

  if(message == undefined){ return "Il sito era momentaneamente occupato e non ha potuto gestire la richiesta. Fare un altro tentativo dovrebbe risolvere il problema.";}

  if(message == "invalid username/password"){ return "Credenziali errate."; }
  if(message == "password must be between 6 and 128 characters"){return "La password deve essere lunga tra 6 e 128 caratteri.";}
  if(message == "name already in use"){ return "Esiste già un utente registrato con questa email.";}
  if(message == "invalid token data"){ return "Token non valido. Ripetere la procedura.";}
  if(message == "already confirmed"){ return "Questa email è associata ad un account già correttamente registrato.";}
  if(message == "userpass token is expired or invalid"){ return "Il token di accesso è scaduto o invalido.";}
  if(message == "user not found"){ return "L'email indicata non è associata ad alcun utente registrato.";}

  return "Errore sconosciuto ("+message+")";
}


function handleApiResult(result, success){

  let error_result = false;

  try{
      error_result = (result.message != undefined);
  }catch(e){

  }

  if(error_result){

    if(result.message != "silent"){
      let text = textForApiErrorCode(result.message);
      openAlertDialog(text);
    }

  }else{
    openInfoDialog(success);
  }

  let my_url_var = (window.location != window.parent.location)
              ? document.referrer
              : document.location.href;

  let params_list = my_url_var.split("?");

  if(params_list.length == 1){
    if(!error_result){
      pageNavigate();
    }
  }else{
    setNavigation("home");
  }

  return result;
}


function pageNavigate(){

  if(CONFIRM_NAVIGATION == 2) {
    return;
  }

  if(CONFIRM_NAVIGATION == 1){
    openConfirmDialog("Sei sicuro di voler cambiare pagina? Il lavoro non salvato andrà perduto.",["confirmPageNavigate", "abortPageNavigate"]);
  }else{
    pageNavigateInner();
  }

}

function abortPageNavigate(){

  CONFIRM_NAVIGATION = 2;

  history.back();

  setTimeout(function(){
    CONFIRM_NAVIGATION = 1;
  }, 300);
}

function confirmPageNavigate(){
  CONFIRM_NAVIGATION = 0;
  pageNavigate();
}

function pageNavigateInner() {

    let page = getUrlSection(1);

    let page_no_args = page.split("?")[0];

    if (page_no_args == "login") {
        showLoginPage();
        return;
    }

    if (page_no_args == "home") {
        showHomePage();
        return;
    }

    showUnknownPage();
}

function showUnknownPage() {

  let p = getCleanNavigationPanel();
  let last;

  last = betterAppendChild(p, betterCreateElement("div", [["className", "unknown_page_label"], ["innerHTML", "Pagina sconosciuta."]]));

}

function showLoginPage() {

  let p = getCleanNavigationPanel();
  p.className = "login_page";
  let last;

  last = betterAppendChild(p, betterCreateElement("img",[["className","travel_gif"], ["src","airplane.gif"]]));
  last = betterAppendChild(p, betterCreateElement("div",[["className","title"], ["innerHTML","Pianifica e Viaggia"]]));
  last = betterAppendChild(p, betterCreateElement("input",[["id","login_email"], ["type","text"], ["className", "input_entry"], ["placeholder", "Email"] ]));
  last = betterAppendChild(p, betterCreateElement("input",[["id","login_password"], ["type","password"], ["className", "input_entry"], ["placeholder", "Password"] ]));

  last = betterAppendChild(p, betterCreateElement("div", [["className", "button"], ["onclick", "performLogin();"], ["innerHTML", "ACCEDI"]]));

  last = betterAppendChild(p, betterCreateElement("div", [["className", "noaccount"], ["innerHTML", "Non hai un account?"]]));
  last = betterAppendChild(last, betterCreateElement("div", [["className", "register_label"], ["innerHTML", "registrati!"], ["onclick", ""]]));


}

function showHomePage() {

  let p = getCleanNavigationPanel();
  let last;

}

// 0 will give base url, 1 will give page name
function getUrlSection(segment) {

    if (segment != 0 && segment != 1) {
        return;
    }

    let default_page = "login";
    let curr_url = decodeURI(window.location.href);


    // has page defined
    if (curr_url.split("#").length > 1) {
        return curr_url.split("#")[segment];
    } else {
        window.location.href = encodeURI(window.location.href + "#" + default_page);
        return default_page;
    }
}

function getCleanNavigationPanel() {

    let panel = document.getElementById("page_content");

    if(isNullOrUndefined(document.body)){ return null; }

    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }
    return panel;
}


function betterAppendChild(father, son) {
  father.appendChild(son);
  return son;
}

function betterCreateElement(type, moreFlags){

  let el = document.createElement(type);

  if(!isNullOrUndefined(moreFlags)){

    for(let i = 0; i < moreFlags.length; i++){

      if(moreFlags[i][0] != "onclick"){
        el[moreFlags[i][0]] = moreFlags[i][1];
      }else{
        el.setAttribute("onclick", moreFlags[i][1]);
      }

    }
  }

  return el;
}


function setNavigation(pagerequest) {

    if (pagerequest != getUrlSection(1)) {
        let new_url = encodeURI(getUrlSection(0) + "#" + pagerequest);
        history.pushState(null, null, new_url);

        pageNavigate();
    }

    return ''; // chrome requires return value
}


function boot(){
  pageNavigate();
  window.addEventListener('hashchange', pageNavigate, false);
}

var fullSqeuenceLoadRemoteModel = function(){};
var updateRemoteModel = function(){};
var deleteRemoteSpecificField = function(field){};
var confirmEmail = function(){};
var resetPasswordEmail = function(email){};
var performRegisterResend = function(){};
var performRegister = function(){};
var performLogout = function(){};
var performLogin = function(){};
var loadRemoteModel = function(){};
var updateRequestStatus = function(list){};
var performResetPassword = function(){};
var publishRequest = function(request){};
var publishNewSong = function(request){};
var updateRemoteSpecificField = function(field){};
var updateDeveloperFlag = function(field){};
var grabRemoteModel = function (){};
var deleteRemoteModel = function(){};
var initUserPage = function(){};
