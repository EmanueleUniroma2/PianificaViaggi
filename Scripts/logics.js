

var App_Pages = [
  {
    "name" : "login",
    "requiresAuth": false,
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_afterinit": "loginSetup",
        "node_childs": [
          {
            "node_type": "img",
            "node_tags": [["className","travel_gif"], ["src","./Assets/airplane.gif"]],
          },
          {
            "node_type": "div",
            "node_tags": [["className","title"], ["innerHTML","Pianifica e Viaggia"]],
          },
          {
            "node_type": "div",
            "node_tags": [["className","subtitle"], ["innerHTML","Vuoi organizzare un viaggio con varie persone, ma non conosci gli impegni di tutti? Usando <strong>Pianifica e Viaggia</strong> non dovrai più faticare a tener traccia di tutte le date scomode. Tu e i tuoi amici potete indicare quali sono le date del calendario che sono ottime, medie o pessime per viaggiare. Tutti gli amici di un gruppo vedono le date indicate dagli altri e dedurre così date perfette!"]],
          },
          {
            "node_type": "input",
            "node_tags" : [["id","login_email"], ["type","text"], ["className", "input_entry"], ["placeholder", "Email"]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","login_password"], ["type","password"], ["className", "input_entry"], ["placeholder", "Password"]]
          },
          {
            "node_type":"label",
            "node_tags":[["className","checkbox_label_wrap"], ["onclick", "rememberMeToggle();"]],
            "node_childs": [
              {
                "node_type":"input",
                "node_tags":[["type","checkbox"], ["id","rememberme"]]
              },
              {
                "node_type":"div",
                "node_tags":[["className","checkbox_label"],["innerHTML","Ricordami su questo dispositivo"]],
              }
            ]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "performLogin();"], ["innerHTML", "ACCEDI"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "inline_with_link_text"], ["innerHTML", "Non hai un account?"]],
            "node_childs": [
              {
                "node_type": "div",
                "node_tags": [["className", "inline_link_label"], ["innerHTML", "registrati!"], ["onclick", "navigate('register')"]]
              },
            ]
          },
          {
            "node_type": "br",
            "node_tags": [],
          },
          {
            "node_type": "div",
            "node_tags": [["className", "inline_with_link_text"], ["innerHTML", "Non riesci ad accedere?"]],
            "node_childs": [
              {
                "node_type": "div",
                "node_tags": [["className", "inline_link_label"], ["innerHTML", "resetta la tua password!"], ["onclick", "navigate('request_password_reset')"]]
              },
            ]
          }
        ]
      }
    ]
  },
  {
    "name" : "home",
    "requiresAuth": true,
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","inner_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "topbar_specification"]],
            "node_childs": [
              {
                "node_type": "div",
                "node_tags": [["$responsive", "x<600:toolbar_label_small ;x<inf:toolbar_label"], ["className", "toolbar_label"], ["innerHTML", "Pianifica e Viaggia!"]]
              },
              {
                "node_type": "div",
                "node_tags": [["innerHTML", "$call_getLoggedEmail"], ["className","toolbar_button"], ["onclick","openToolbarMenu(this)"]]
              }
            ]
          },
          {
            "node_type": "div",
            "node_tags": [["innerHTML", "Su quale gruppo vuoi lavorare?"],["className","generic_label new_group_label"]]
          },
          {
            "node_type": "select",
            "node_tags": [["id","group_select"],["onchange", "changeGroup()"], ["className","generic_select new_group_select"], ["$responsive", "x<750:new_group_select_small"]],
            "node_afterinit": "initGroupSelect"
          },
          {
            "node_type": "div",
            "node_tags": [["innerHTML", "Crea un nuovo gruppo"],["className","generic_button new_group_button"], ["$responsive", "x<750:new_group_button_small"], ["onclick", "createNewGroup()"]]
          },
          {
            "node_type": "table",
            "node_styles": [["display","none"]],
            "node_tags": [["id", "data_table"],["className", "home_squares_wrapper"]],
            "node_childs": [
                {
                  "node_type": "tr",
                  "node_tags": [],
                  "node_childs": [
                    {
                      "node_type": "td",
                      "node_tags": [["className","home_left_square"], ["$responsive", "x<750:home_left_square_small"]],
                      "node_childs": [
                            {
                              "node_type": "div",
                              "node_tags": [["innerHTML", "Inserisci le tue date"], ["onclick", "insertMyDatesForCurrentGroup()"],["className","generic_button"]]
                            },
                            {
                              "node_type": "div",
                              "node_tags": [["innerHTML", "Invita su questo gruppo"], ["onclick", "inviteOnCurrentGroup()"], ["className","generic_button"]]
                            },
                            {
                              "node_type": "div",
                              "node_tags": [["innerHTML", "Cancella questo gruppo"], ["onclick", "deleteCurrentGroup()"] ,["className","generic_button"]]
                            }
                      ]
                    },
                    {
                      "node_type": "td",
                      "node_tags": [["className","home_right_square"],  ["$responsive", "x<750:home_right_square_small"]],
                      "node_childs": [
                        {
                          "node_type": "div",
                          "node_tags": [["innerHTML", "Sezione destra"]]
                        }
                      ]
                    }
                  ]
                }
              ]
          }
        ]
      }
    ]
  },
  {
    "name" : "register",
    "requiresAuth": false,
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "topbar_specification"], ["innerHTML", "Registrarsi è gratis e ti permette di pianificare i viaggi con i tuoi amici e tenere traccia degli impegni che hanno pubblicato."]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","register_email"], ["type","text"], ["className", "input_entry"], ["placeholder", "Email"]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","register_password"], ["type","password"], ["className", "input_entry"], ["placeholder", "Password"]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","register_password_2"], ["type","password"], ["className", "input_entry"], ["placeholder", "Ripeti password"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "performRegister();"], ["innerHTML", "REGISTRATI"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "navigate('login')"], ["innerHTML", "INDIETRO"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "inline_with_link_text"], ["innerHTML", "Non hai ricevuto l'email?"]],
            "node_childs": [
              {
                "node_type": "div",
                "node_tags": [["className", "inline_link_label"], ["innerHTML", "Richiedi un altra email di conferma! *"], ["onclick", "performEmailResend();"]]
              },
            ]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "small_form_text"], ["innerHTML", "*Verrà utilizzato l'indirizzo email attualmente indicato nel form di questa pagina."]]
          },
        ]
      }
    ]
  },
  {
    "name": "confirm_user",
    "requiresAuth": false,
    "content": [
      {
        "node_type":"div",
        "node_afterinit": "performUserConfirmation",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "topbar_specification"], ["innerHTML", "Pagina di conferma dell'email. Se tutto va bene, dovresti vedere un messaggio di successo."]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "navigate('login')"], ["innerHTML", "VAI AL LOGIN"]]
          }
        ]
      }
    ]
  },
  {
    "name": "request_password_reset",
    "requiresAuth": false,
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "topbar_specification"], ["innerHTML", "Se non riesci ad accedere con il tuo account, inserisci la tua email. Se esiste un account registrato con quella email, ti invieremo una email con il link con cui potrai reimpostare la password."]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","reset_password_email"], ["type","text"], ["className", "input_entry"], ["placeholder", "Email"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "performResetPasswordEmailRequest();"], ["innerHTML", "INVIA EMAIL"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "navigate('login')"], ["innerHTML", "ANNULLA"]]
          }
        ]
      }
    ]
  },
  {
    "name": "reset_password",
    "requiresAuth": false,
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "topbar_specification"], ["innerHTML", "Reimposta la tua password tramite il form sottostante."]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","reset_password"], ["type","password"], ["className", "input_entry"], ["placeholder", "Password"]]
          },
          {
            "node_type": "input",
            "node_tags" : [["id","reset_password_2"], ["type","password"], ["className", "input_entry"], ["placeholder", "Ripeti password"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "performPasswordReset();"], ["innerHTML", "REIMPOSTA"]]
          },
          {
            "node_type": "div",
            "node_tags": [["className", "button"], ["onclick", "navigate('login')"], ["innerHTML", "ANNULLA"]]
          }
        ]
      }
    ]
  }
];

// tell the framework how to prepeare the empty datas that
// will be later syncked
const SyncModelsPrototypes = [
  {
    "name":"groups",
    "type":"list"
  }
];


// init here db name and realm app name
const version_label = "Versione 0.4 (non aperto al pubblico)";
const app_name = "pianificaeviaggia-ljhog";
const db_name = "pianifica_viaggi_user_data";
const user_data_collection_name = "user_data";
const user_requests_collection_name = "user_requests";

const stitchClient = new StitchAppClient(app_name, db_name);

var userSynckedModel = null;

function navigate(page){
  stitchClient.setNavigation(page);
}

function boot(){
  stitchClient.registerAppTargetNodeId("page_content");
  stitchClient.registerAppPages(App_Pages);
  stitchClient.setSyncModels(SyncModelsPrototypes);
  //stitchClient.setPageResizeHandle("handlePageResize");
  stitchClient.boot(user_data_collection_name);

  setVersion();
  loginSetup();
}

/*function handlePageResize() {} */

function loginSetup(){
  if(stitchClient.getUrlSection(1) == "login"){
    rememberMeFeature();
  }
}

async function performLogin(){

  let email = getInputValue("login_email");
  let password = getInputValue("login_password");

  if(storageGetItem("rememberme", rememberme)){
    storageSetItem("email", email);
    storageSetItem("password", password);
  }

  if(await stitchClient.fullLoginFetchSequence(email, password, user_data_collection_name) == null){
    navigate('home');
  }
}

function performRegister(){
  let email = getInputValue("register_email");
  let password = getInputValue("register_password");
  let password_2 = getInputValue("register_password_2");
  stitchClient.registerUser(email, password, password_2);
}

function performEmailResend() {
  let email = getInputValue("register_email");
  stitchClient.resendConfirmationEmail(email);
}

async function performPasswordReset(){
  let password = getInputValue("reset_password");
  let password_2 = getInputValue("reset_password_2");
  if(await stitchClient.resetPassword(password,password_2) == null){
    navigate('login');
  }
}

async function performUserConfirmation() {
  if(await stitchClient.confirmUser() == null){
    navigate('login');
  }
}

function setVersion() {
  let node = document.createElement("div");
  node.innerHTML = version_label;
  node.className = "version";
  document.body.appendChild(node);
}

function rememberMeToggle() {
  storageSetItem("rememberme", getCheckboxIsChecked("rememberme"));
}


function rememberMeFeature(){
  let checked = storageGetItem("rememberme", rememberme);

  setCheckboxIsChecked("rememberme",checked);

  if(checked){
    setInputValue("login_email", storageGetItem("email"));
    setInputValue("login_password", storageGetItem("password"));
  }else{
    setInputValue("login_email", "");
    setInputValue("login_password", "");
    storageRemoveItem("email");
    storageRemoveItem("password");
  }
}

async function performLogout() {
  if(await stitchClient.logout() == null){
    navigate('login');
  }
}

function getLoggedEmail(){
  return stitchClient.loggedEmail().split("@")[0];
}

function openToolbarMenu(targetNode) {

  // close it if open
  let menu = document.getElementById("toolbar_user_menu_id");
  if(!isNullOrUndefined(menu)){
    while(menu.firstChild){
      menu.removeChild(menu.firstChild);
    }
    menu.parentNode.removeChild(menu);
    return;
  }

  // create it if missing
  let voices = [["Cambia Password", "performResetPasswordEmailRequest()"], ["Logout","performLogout()"]];
  menu = document.createElement("div");
  menu.className = "toolbar_user_menu";
  menu.id = "toolbar_user_menu_id";

  for(let i = 0; i < voices.length;i++){
      let voice = voices[i];
      let row = document.createElement("div");
      row.className = "toolbar_user_menu_row";
      row.innerHTML = voice[0];
      row.setAttribute("onclick", voice[1]);
      menu.appendChild(row);
  }

  targetNode.appendChild(menu);
}

async function performResetPasswordEmailRequest() {
  let form_email = getInputValue("reset_password_email");
  if(await stitchClient.sendResetPasswordEmail(form_email) == null){
    if(!isVoidString(form_email)){
      navigate('login');
    }
  }
}

function getUserGroups(){
  let groups = storageGetItem("groups");
  if(isNullOrUndefined(groups)){
    groups = [];
    storageSetItem("groups",groups);
  }
  return groups;
}

function initGroupSelect() {

  let select = document.getElementById("group_select");
  let groups = getUserGroups();

  for(let i = 0; i < groups.length;i++){
    let group = groups[i];
    let option = document.createElement("option");
    option.innerHTML = group["title"];
    option.value = group["id"];
    if(i == 0){
      option.setAttribute("select","true");
    }
    select.appendChild(option);
  }

  if(groups.length > 0){
    setTimeout(changeGroup,100);
  }
}

function changeGroup() {

  let selected = document.getElementById("group_select").value;
  let section = document.getElementById("data_table").style.display = "block";

}

function createNewGroup(){
  stitchClient.openInputDialog("Inserisci i seguenti campi per creare un gruppo.", [{"title": "Nome del gruppo", "placeholder": "Nome"}, {"title": "Descrizione del gruppo", "placeholder": "Descrizione"}], ["","processNewGroupDialogClick(this)"]);
}

function processNewGroupDialogClick() {
  let result = stitchClient.lastDialogOutput;

  for(let i = 0; i < result.length; i++){
    if(isVoidString(result[i])){
      stitchClient.openAlertDialog("Impossibile procedere. Tutti i campi devono essere riempiti.");
      return;
    }
  }

  let group = {
    "title": result[0],
    "description": result[1],
    "owner_id": stitchClient.getAuthenticatedId(),
    "id": uuidv4()
  };

  let current_groups = getUserGroups();
  current_groups.push(group);
  storageSetItem("groups",current_groups);

  stitchClient.pageNavigate();

  setTimeout(function(){
    stitchClient.openInfoDialog("Gruppo creato con successo: <strong>"+result[0]+"</strong>");
  }, 200);
}

function insertMyDatesForCurrentGroup() {
  let selected = document.getElementById("group_select").value;

}
function inviteOnCurrentGroup() {
  let selected = document.getElementById("group_select").value;

}
function deleteCurrentGroup() {
  stitchClient.openConfirmDialog("Vuoi davvero eliminare questo gruppo?" , ["","deleteCurrentGroupConfirmed()"]);
}
function deleteCurrentGroupConfirmed() {
  let selected = document.getElementById("group_select").value;
  let groups = getUserGroups();

  for(let i = 0; i < groups.length;i++){
    if(groups[i]["id"] == selected){
      let ereasing = groups[i]["title"];
      let updated = removeElementFromList(groups,groups[i]);

      storageSetItem("groups",updated);
      stitchClient.pageNavigate();
      stitchClient.openInfoDialog("Gruppo eliminato con successo: <strong>"+ereasing+"</strong>");
      return;
    }
  }
}

// credits: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
