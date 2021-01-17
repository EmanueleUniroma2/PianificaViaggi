var App_Pages = [{
    "name": "login",
    "requiresAuth": false,
    "content": [{
        "node_type": "div",
        "node_tags": [
            ["className", "form_page"]
        ],
        "node_afterinit": "loginSetup",
        "node_childs": [{
            "node_type": "img",
            "node_tags": [
                ["className", "travel_gif"],
                ["src", "./Assets/airplane.gif"]
            ],
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "title"],
                ["innerHTML", "Pianifica e Viaggia"]
            ],
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "subtitle"],
                ["innerHTML", "Vuoi organizzare un viaggio con varie persone, ma non conosci gli impegni di tutti? Usando <strong>Pianifica e Viaggia</strong> non dovrai più faticare a tener traccia di tutte le date scomode. Tu e i tuoi amici potete indicare quali sono le date del calendario che sono ottime, medie o pessime per viaggiare. Tutti gli amici di un gruppo vedono le date indicate dagli altri e dedurre così date perfette!"]
            ],
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "login_email"],
                ["type", "text"],
                ["className", "input_entry"],
                ["placeholder", "Email"]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "login_password"],
                ["type", "password"],
                ["className", "input_entry"],
                ["placeholder", "Password"]
            ]
        }, {
            "node_type": "label",
            "node_tags": [
                ["className", "checkbox_label_wrap"],
                ["onclick", "rememberMeToggle();"]
            ],
            "node_childs": [{
                "node_type": "input",
                "node_tags": [
                    ["type", "checkbox"],
                    ["id", "rememberme"]
                ]
            }, {
                "node_type": "div",
                "node_tags": [
                    ["className", "checkbox_label"],
                    ["innerHTML", "Ricordami su questo dispositivo"]
                ],
            }]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "performLogin();"],
                ["innerHTML", "ACCEDI"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "inline_with_link_text"],
                ["innerHTML", "Non hai un account?"]
            ],
            "node_childs": [{
                "node_type": "div",
                "node_tags": [
                    ["className", "inline_link_label"],
                    ["innerHTML", "registrati!"],
                    ["onclick", "navigate('register')"]
                ]
            }, ]
        }, {
            "node_type": "br",
            "node_tags": [],
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "inline_with_link_text"],
                ["innerHTML", "Non riesci ad accedere?"]
            ],
            "node_childs": [{
                "node_type": "div",
                "node_tags": [
                    ["className", "inline_link_label"],
                    ["innerHTML", "resetta la tua password!"],
                    ["onclick", "navigate('request_password_reset')"]
                ]
            }, ]
        }]
    }]
}, {
    "name": "home",
    "requiresAuth": true,
    "content": [{
        "node_type": "div",
        "node_tags": [
            ["className", "inner_page"]
        ],
        "node_childs": [{
            "node_type": "div",
            "node_tags": [
                ["className", "topbar_specification"]
            ],
            "node_childs": [{
                "node_type": "div",
                "node_tags": [
                    ["$responsive", "x<600:toolbar_label_small ;x<inf:toolbar_label"],
                    ["className", "toolbar_label"],
                    ["innerHTML", "Pianifica e Viaggia!"]
                ]
            }, {
                "node_type": "div",
                "node_tags": [
                    ["innerHTML", "$getLoggedEmail"],
                    ["className", "toolbar_button"],
                    ["onclick", "openToolbarMenu(this)"]
                ]
            }]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "generic_label page_title"]
            ],
            "node_childs": [
              {
                "node_type": "div",
                "node_tags": [
                    ["className", "home_page_label"],
                    ["innerHTML", "Su quale gruppo vuoi lavorare?"]
                ],
              },
              {
                "node_type": "div",
                "node_tags": [
                    ["className", "refresh_groups_icon"],
                    ["src", "./Assets/refresh_icon.png"],
                    ["onclick", "loadRemoteGroups()"]
                ],
                "node_childs": [
                  {
                    "node_type": "img",
                    "node_tags": [
                        ["className", "refresh_groups_icon_inner"],
                        ["src", "./Assets/refresh_icon.png"]
                      ]
                  }
                ]
              }
            ]
        }, {
            "node_type": "select",
            "node_tags": [
                ["id", "group_select"],
                ["onchange", "changeGroup()"],
                ["className", "generic_select new_group_select"],
                ["$responsive", "x<1050:new_group_select_small"]
            ],
            "node_afterinit": "initGroupSelect"
        }, {
            "node_type": "div",
            "node_tags": [
                ["innerHTML", "Crea un nuovo gruppo"],
                ["className", "generic_button new_group_button"],
                ["$responsive", "x<1050:new_group_button_small"],
                ["onclick", "createNewGroup()"]
            ]
        }, {
            "node_type": "div",
            "node_styles": [
                ["display", "none"]
            ],
            "node_tags": [
                ["id", "home_page_wrapper"]
            ],
            "node_childs": [{
                "node_type": "div",
                "node_tags": [
                    ["id", "home_group_title"],
                    ["className", "page_title"]
                ],
            }, {
                "node_type": "div",
                "node_tags": [
                    ["id", "home_group_description"],
                    ["className", "home_group_description"]
                ],
            }, {
                "node_type": "div",
                "node_tags": [
                    ["id", "invited_users"],
                    ["className", "invited_users_area"]
                ],
            }, {
                "node_type": "table",
                "node_tags": [
                    ["className", "home_squares_wrapper"]
                ],
                "node_childs": [{
                    "node_type": "tr",
                    "node_tags": [],
                    "node_childs": [{
                        "node_type": "td",
                        "node_tags": [
                            ["className", "home_left_square"],
                            ["$responsive", "x<1050:home_left_square_small"]
                        ],
                        "node_childs": [{
                            "node_type": "div",
                            "node_tags": [
                                ["innerHTML", "Calcola giorni ottimali"],
                                ["onclick", "computeGroupSolution()"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["innerHTML", "Imposta date selezionate: PESSIME"],
                                ["onclick", "setSelectedDates(1)"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["innerHTML", "Imposta date selezionate: FORSE"],
                                ["onclick", "setSelectedDates(2)"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["innerHTML", "Imposta date selezionate: OTTIME"],
                                ["onclick", "setSelectedDates(3)"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["innerHTML", "Imposta date selezionate: CANCELLA"],
                                ["onclick", "setSelectedDates(4)"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["id", "invite_group_button"],
                                ["innerHTML", "Invita su questo gruppo"],
                                ["onclick", "inviteOnCurrentGroup()"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["id", "edit_group_button"],
                                ["innerHTML", "Modifica questo gruppo"],
                                ["onclick", "editCurrentGroup()"],
                                ["className", "generic_button"]
                            ]
                        }, {
                            "node_type": "div",
                            "node_tags": [
                                ["id", "delete_group_button"],
                                ["innerHTML", "Cancella questo gruppo"],
                                ["onclick", "deleteCurrentGroup()"],
                                ["className", "generic_button"]
                            ]
                        }]
                    }, {
                        "node_type": "td",
                        "node_tags": [
                            ["className", "home_right_square"],
                            ["$responsive", "x<1050:home_right_square_small"]
                        ],
                        "node_childs": [{
                            "node_type": "functionResult-calendarView",
                            "node_tags": [["id", "calendar_grid_view"]]
                        }]
                    }]
                }]
            }]
        }]
    }]
}, {
    "name": "profile",
    "requiresAuth": true,
    "content": [{
        "node_type": "div",
        "node_tags": [
            ["className", "inner_page"]
        ],
        "node_childs": [{
            "node_type": "div",
            "node_tags": [
                ["className", "topbar_specification"]
            ],
            "node_childs": [{
                "node_type": "div",
                "node_tags": [
                    ["$responsive", "x<600:toolbar_label_small ;x<inf:toolbar_label"],
                    ["className", "toolbar_label"],
                    ["innerHTML", "Pianifica e Viaggia!"]
                ]
            }, {
                "node_type": "div",
                "node_tags": [
                    ["innerHTML", "$getLoggedEmail"],
                    ["className", "toolbar_button"],
                    ["onclick", "openToolbarMenu(this)"]
                ]
            }]
        }]
    }, {
        "node_type": "div",
        "node_tags": [
            ["className", "page_title"],
            ["innerHTML", "Il mio profilo"]
        ]
    }, {
        "node_type": "div",
        "node_tags": [
            ["innerHTML", "Modifica profilo"],
            ["className", "generic_button edit_profile_button"],
            ["$responsive", "x<1050:edit_profile_button_small"],
            ["onclick", "editProfile()"]
        ]
    }, {
        "node_type": "div",
        "node_afterinit": "initUserProfileSection",
        "node_tags": [
            ["id", "user_profile_info_wrap"],
            ["className", "profile_page_info_wrap"]
        ]
    }]
}, {
    "name": "register",
    "requiresAuth": false,
    "content": [{
        "node_type": "div",
        "node_tags": [
            ["className", "form_page"]
        ],
        "node_childs": [{
            "node_type": "div",
            "node_tags": [
                ["className", "topbar_specification"],
                ["innerHTML", "Registrarsi è gratis e ti permette di pianificare i viaggi con i tuoi amici e tenere traccia degli impegni che hanno pubblicato."]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "register_email"],
                ["type", "text"],
                ["className", "input_entry"],
                ["placeholder", "Email"]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "register_password"],
                ["type", "password"],
                ["className", "input_entry"],
                ["placeholder", "Password"]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "register_password_2"],
                ["type", "password"],
                ["className", "input_entry"],
                ["placeholder", "Ripeti password"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "performRegister();"],
                ["innerHTML", "REGISTRATI"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "navigate('login')"],
                ["innerHTML", "INDIETRO"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "inline_with_link_text"],
                ["innerHTML", "Non hai ricevuto l'email?"]
            ],
            "node_childs": [{
                "node_type": "div",
                "node_tags": [
                    ["className", "inline_link_label"],
                    ["innerHTML", "Richiedi un altra email di conferma! *"],
                    ["onclick", "performEmailResend();"]
                ]
            }, ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "small_form_text"],
                ["innerHTML", "*Verrà utilizzato l'indirizzo email attualmente indicato nel form di questa pagina."]
            ]
        }, ]
    }]
}, {
    "name": "confirm_user",
    "requiresAuth": false,
    "content": [{
        "node_type": "div",
        "node_afterinit": "performUserConfirmation",
        "node_tags": [
            ["className", "form_page"]
        ],
        "node_childs": [{
            "node_type": "div",
            "node_tags": [
                ["className", "topbar_specification"],
                ["innerHTML", "Pagina di conferma dell'email. Se tutto va bene, dovresti vedere un messaggio di successo."]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "navigate('login')"],
                ["innerHTML", "VAI AL LOGIN"]
            ]
        }]
    }]
}, {
    "name": "request_password_reset",
    "requiresAuth": false,
    "content": [{
        "node_type": "div",
        "node_tags": [
            ["className", "form_page"]
        ],
        "node_childs": [{
            "node_type": "div",
            "node_tags": [
                ["className", "topbar_specification"],
                ["innerHTML", "Se non riesci ad accedere con il tuo account, inserisci la tua email. Se esiste un account registrato con quella email, ti invieremo una email con il link con cui potrai reimpostare la password."]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "reset_password_email"],
                ["type", "text"],
                ["className", "input_entry"],
                ["placeholder", "Email"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "performResetPasswordEmailRequest();"],
                ["innerHTML", "INVIA EMAIL"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "navigate('login')"],
                ["innerHTML", "ANNULLA"]
            ]
        }]
    }]
}, {
    "name": "reset_password",
    "requiresAuth": false,
    "content": [{
        "node_type": "div",
        "node_tags": [
            ["className", "form_page"]
        ],
        "node_childs": [{
            "node_type": "div",
            "node_tags": [
                ["className", "topbar_specification"],
                ["innerHTML", "Reimposta la tua password tramite il form sottostante."]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "reset_password"],
                ["type", "password"],
                ["className", "input_entry"],
                ["placeholder", "Password"]
            ]
        }, {
            "node_type": "input",
            "node_tags": [
                ["id", "reset_password_2"],
                ["type", "password"],
                ["className", "input_entry"],
                ["placeholder", "Ripeti password"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "performPasswordReset();"],
                ["innerHTML", "REIMPOSTA"]
            ]
        }, {
            "node_type": "div",
            "node_tags": [
                ["className", "button"],
                ["onclick", "navigate('login')"],
                ["innerHTML", "ANNULLA"]
            ]
        }]
    }]
}];

// tell the framework how to prepeare the empty datas that
// will be later syncked
const SyncModelsPrototypes = ["user_profile"];

// init here db name and realm app name
const version_label = "Versione 0.4 (non aperto al pubblico)";
const app_name = "pianificaeviaggia-ljhog";
const db_name = "pianifica_viaggi_user_data";
const user_data_collection_name = "user_data";
const user_groups_collection_name = "user_groups";
const user_requests_collection_name = "user_requests";

const stitchClient = getStitchAppClient(app_name, db_name);

var userSynckedModel = null;

function navigate(page) {
    stitchClient.setNavigation(page);
}

function boot() {
    stitchClient.registerAppTargetNodeId("page_content");
    stitchClient.registerAppPages(App_Pages);
    stitchClient.setSyncModels(SyncModelsPrototypes);
    //stitchClient.setPageResizeHandle("handlePageResize");
    stitchClient.boot();

    setVersion();
    loginSetup();
}

/*function handlePageResize() {} */

function loginSetup() {
    if (stitchClient.getUrlSection(1) == "login") {
        rememberMeFeature();
    }
}

async function performLogin() {

    let email = getInputValue("login_email");
    let password = getInputValue("login_password");

    if (storageGetItem("rememberme", rememberme)) {
        storageSetItem("", "email", email);
        storageSetItem("", "password", password);
    }

    stitchClient.spinnerKeepUp = 2;

    if (await stitchClient.fullLoginFetchSequence(email, password, user_data_collection_name) == null) {

        await loadRemoteGroups();

        navigate('home');
    }
}

async function loadRemoteGroups(){

  storageRemoveAnyItemsStartingWith("group_");

  let pattern = {
      $or: [
        {user_id: stitchClient.getAuthenticatedId()},
        {invited_users_ids_only: stitchClient.getAuthenticatedId()}
      ]
  };

  let your_groups = await stitchClient.find(user_groups_collection_name, pattern);

  if (!isNullOrUndefined(your_groups)) {
      for (let i = 0; i < your_groups.length; i++) {
          delete your_groups[i]["_id"];
          localStorage.setItem(your_groups[i]["data_id"], JSON.stringify(your_groups[i]));
      }
  }

  stitchClient.pageNavigate();
}

function performRegister() {
    let email = getInputValue("register_email");
    let password = getInputValue("register_password");
    let password_2 = getInputValue("register_password_2");
    stitchClient.registerUser(email, password, password_2);
}

function performEmailResend() {
    let email = getInputValue("register_email");
    stitchClient.resendConfirmationEmail(email);
}

async function performPasswordReset() {
    let password = getInputValue("reset_password");
    let password_2 = getInputValue("reset_password_2");
    if (await stitchClient.resetPassword(password, password_2) == null) {
        navigate('login');
    }
}

async function performUserConfirmation() {
    if (await stitchClient.confirmUser() == null) {
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
    storageSetItem("", "rememberme", getCheckboxIsChecked("rememberme"));
}


function rememberMeFeature() {
    let checked = storageGetItem("rememberme", rememberme);

    setCheckboxIsChecked("rememberme", checked);

    if (checked) {
        setInputValue("login_email", storageGetItem("email"));
        setInputValue("login_password", storageGetItem("password"));
    } else {
        setInputValue("login_email", "");
        setInputValue("login_password", "");
        storageRemoveItem("", "email");
        storageRemoveItem("", "password");
    }
}

async function performLogout() {
    if (await stitchClient.logout() == null) {
        navigate('login');
    }
}

function getLoggedEmail() {
    return stitchClient.loggedEmail().split("@")[0];
}

function openToolbarMenu(targetNode) {

    // close it if open
    let menu = document.getElementById("toolbar_user_menu_id");
    if (!isNullOrUndefined(menu)) {
        while (menu.firstChild) {
            menu.removeChild(menu.firstChild);
        }
        menu.parentNode.removeChild(menu);
        return;
    }

    // create it if missing
    let voices = [
        ["Gestione gruppi", "navigate('home')"],
        ["Il mio profilo", "navigate('profile')"],
        ["Logout", "performLogout()"]
    ];
    menu = document.createElement("div");
    menu.className = "toolbar_user_menu";
    menu.id = "toolbar_user_menu_id";

    for (let i = 0; i < voices.length; i++) {
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
    if (await stitchClient.sendResetPasswordEmail(form_email) == null) {
        if (!isVoidString(form_email)) {
            navigate('login');
        }
    }
}

function getUserGroups() {
    return storageGetAnyItemStartingWith("group");
}

function initGroupSelect() {

    let select = document.getElementById("group_select");
    let groups = getUserGroups();

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        let option = document.createElement("option");
        option.className = "group_select_option";
        option.innerHTML = group["title"];
        option.value = group["data_id"];
        if (i == 0) {
            option.setAttribute("select", "true");
        }
        select.appendChild(option);
    }

    if (groups.length > 0) {
        setTimeout(changeGroup, 100);
    }
}

function changeGroup() {

    let selected = document.getElementById("group_select").value;
    let section = document.getElementById("home_page_wrapper").style.display = "block";

    let current_group = getSelectedGroup();

    let invited_users = current_group["invited_users"];

    document.getElementById("home_group_description").innerHTML = current_group["description"];

    let inv_users_area = document.getElementById("invited_users");
    while(inv_users_area.firstChild){
      inv_users_area.removeChild(inv_users_area.firstChild);
    }

    let you_are_admin_of_the_group = current_group["owner_email"] == getLoggedEmail();

    if(you_are_admin_of_the_group){

      document.getElementById("home_group_title").innerHTML = current_group["title"];

      document.getElementById("delete_group_button").style.display = "";
      document.getElementById("invite_group_button").style.display = "";
      document.getElementById("edit_group_button").style.display = "";

      if(!isNullOrUndefined(inv_users_area)){

        if(invited_users.length > 0){
          inv_users_area.style.display = "block";
          let invited_title = document.createElement("div");
          invited_title.className = "invited_title_label";
          invited_title.innerHTML = "Utenti che hai invitato";
          inv_users_area.appendChild(invited_title);
        }else{
          inv_users_area.style.display = "none";
        }

        for(let i = 0; i < invited_users.length;i++){

          let invit = document.createElement("div");
          invit.className = "invited_users_slot";
          invit.setAttribute("onclick", "askRemoveUserFromCurrentGroup(this)");
          let invit_name = document.createElement("div");
          invit_name.className = "invited_users_slot_name";
          invit_name.innerHTML = invited_users[i][0];
          let invit_id = document.createElement("div");
          invit_id.className = "invited_users_slot_id";
          invit_id.innerHTML = "ID: " + invited_users[i][1];

          invit.appendChild(invit_name);
          invit.appendChild(invit_id);

          inv_users_area.appendChild(invit);
        }
      }
    }
    else{
      document.getElementById("home_group_title").innerHTML = current_group["title"] + " - creato da: "+ current_group["owner_email"];

      document.getElementById("delete_group_button").style.display = "none";
      document.getElementById("invite_group_button").style.display = "none";
      document.getElementById("edit_group_button").style.display = "none";
    }

    redrawCalendar();
}


function askRemoveUserFromCurrentGroup(element) {
  let user_to_remove_id = element.children[1].innerHTML.replace("ID: ","");
  stitchClient.openConfirmDialog("Vuoi davvero eliminare questo utente dal gruppo?", ["", "removeUserFromCurrentGroup('"+user_to_remove_id+"')"]);
}

function removeUserFromCurrentGroup(user_to_remove_id) {

  let current_group = getSelectedGroup();

  let invited = current_group["invited_users"];
  let invited_ids = current_group["invited_users_ids_only"];

  let remove_index = -1;
  for(let i = 0; i < invited_ids.length; i++){
    if(invited_ids[i] == user_to_remove_id){
      remove_index = i;
      break;
    }
  }

  if(remove_index != -1){

    invited = removeElementFromListAtIndex(invited, remove_index);
    invited_ids = removeElementFromListAtIndex(invited_ids, remove_index);

    current_group["invited_users"] = invited;
    current_group["invited_users_ids_only"] = invited_ids;

    storageSetItem(user_groups_collection_name, current_group["data_id"], current_group);

    changeGroup();

    setTimeout(function() {
        stitchClient.openInfoDialog("Utente rimosso con successo");
    }, 200);
  }
}

function editCurrentGroup() {
    let current_group = getSelectedGroup();
    stitchClient.openInputDialog("Usa i seguenti campi per modificare il gruppo.", [{
        "title": "Nome del gruppo",
        "placeholder": "Nome",
        "start_value": current_group["title"]
    }, {
        "title": "Descrizione del gruppo",
        "placeholder": "Descrizione",
        "start_value": current_group["description"]
    }], ["", "processEditGroupDialogClick(this)"]);
}

function createNewGroup() {
    stitchClient.openInputDialog("Inserisci i seguenti campi per creare un gruppo.", [{
        "title": "Nome del gruppo",
        "placeholder": "Nome",
        "start_value": null
    }, {
        "title": "Descrizione del gruppo",
        "placeholder": "Descrizione",
        "start_value": null
    }], ["", "processNewGroupDialogClick(this)"]);
}

function editProfile() {
    let user_model = getUserModel();
    stitchClient.openInputDialog("Inserisci i seguenti campi per aggiornare il tuo profilo.", [{
        "title": "Nome utente",
        "placeholder": "Nome",
        "start_value": user_model["name"]
    }, {
        "title": "Cognome utente",
        "placeholder": "Cognome",
        "start_value": user_model["surname"]
    }], ["", "processEditUserProfileDialogClick(this)"]);
}

function processEditUserProfileDialogClick() {
    let result = stitchClient.lastDialogOutput;

    for (let i = 0; i < result.length; i++) {
        if (isVoidString(result[i])) {
            stitchClient.openAlertDialog("Impossibile procedere. Tutti i campi devono essere riempiti.");
            return;
        }
    }

    let user_model = {
        "name": result[0],
        "surname": result[1]
    };

    storageSetItem(user_data_collection_name, "user_profile", user_model);
    stitchClient.pageNavigate();

    setTimeout(function() {
        stitchClient.openInfoDialog("Profilo aggiornato con successo.");
    }, 200);
}

function processEditGroupDialogClick() {

    let result = stitchClient.lastDialogOutput;
    let new_edit = getSelectedGroup();

    for (let i = 0; i < result.length; i++) {
        if (isVoidString(result[i])) {
            stitchClient.openAlertDialog("Impossibile procedere. Tutti i campi devono essere riempiti.");
            return;
        }
    }

    //let old_id = new_edit["data_id"];
    //storageRemoveItem(user_groups_collection_name, old_id);


    new_edit["title"] = result[0];
    new_edit["description"] = result[1];
    //new_edit["data_id"] = "group_" + stitchClient.getGUIID();

    storageSetItem(user_groups_collection_name, new_edit["data_id"], new_edit);

    changeGroup();

    setTimeout(function() {
        stitchClient.openInfoDialog("Gruppo modificato con successo: <strong>" + result[0] + "</strong>");
    }, 200);
}

function processNewGroupDialogClick() {
    let result = stitchClient.lastDialogOutput;

    for (let i = 0; i < result.length; i++) {
        if (isVoidString(result[i])) {
            stitchClient.openAlertDialog("Impossibile procedere. Tutti i campi devono essere riempiti.");
            return;
        }
    }

    let group = {
        "title": result[0],
        "owner_email": getLoggedEmail(),
        "description": result[1],
        "invited_users": [],
        "invited_users_ids_only": [],
        "data_id": "group_" + stitchClient.getGUIID()
    };

    storageSetItem(user_groups_collection_name, group["data_id"], group);

    stitchClient.pageNavigate();

    document.getElementById("group_select").value = group["data_id"];

    changeGroup();

    setTimeout(function() {
        stitchClient.openInfoDialog("Gruppo creato con successo: <strong>" + result[0] + "</strong>");
    }, 200);
}

function computeGroupSolution() {
  stitchClient.openInfoDialog("Questa funzione non è ancora disponibile");
}

function inviteOnCurrentGroup() {
    stitchClient.openInputDialog("Inserisci l'ID dell'utente che vuoi invitare. L'ID deve esserti fornito dall'utente che vuoi invitare ed è visibile nella pagina del profilo.", [{
        "title": "Nominativo utente",
        "placeholder": "Nominativo",
        "start_value": null
    }, {
        "title": "ID utente",
        "placeholder": "Id",
        "start_value": null
    }], ["", "inviteOnCurrentGroupConclude(this)"]);
}

function inviteOnCurrentGroupConclude() {

    let result = stitchClient.lastDialogOutput;
    for (let i = 0; i < result.length; i++) {
        if (isVoidString(result[i])) {
            stitchClient.openAlertDialog("Impossibile procedere. Tutti i campi devono essere riempiti.");
            return;
        }
    }

    let current_group = getSelectedGroup();

    let invited = current_group["invited_users"];
    invited.push([result[0], result[1]]);
    current_group["invited_users"] = invited;

    let invited_ids = current_group["invited_users_ids_only"];
    invited_ids.push(result[1]);
    current_group["invited_users_ids_only"] = invited_ids;

    storageSetItem(user_groups_collection_name, current_group["data_id"], current_group);

    changeGroup();

    setTimeout(function() {
        stitchClient.openInfoDialog("Utente invitato con successo: <strong>" + result[0] + "</strong>");
    }, 200);

}

function deleteCurrentGroup() {
    stitchClient.openConfirmDialog("Vuoi davvero eliminare questo gruppo?", ["", "deleteCurrentGroupConfirmed()"]);
}

function deleteCurrentGroupConfirmed() {
    let selected = document.getElementById("group_select").value;
    let ereasing = getSelectedGroup();
    storageRemoveItem(user_groups_collection_name, selected);
    stitchClient.pageNavigate();
    stitchClient.openInfoDialog("Gruppo eliminato con successo: <strong>" + ereasing["title"] + "</strong>");
    return;
}

function getSelectedGroup() {
    let selected = document.getElementById("group_select").value;
    let groups = getUserGroups();
    for (let i = 0; i < groups.length; i++) {
        if (groups[i]["data_id"] == selected) {
            return groups[i];
        }
    }
    return null;
}

function initUserProfileSection() {

    let wrap = document.getElementById("user_profile_info_wrap");

    let user = getUserModel();

    let voices = [
        ["Nome", user["name"]],
        ["Cognome", user["surname"]],
        ["ID Utente", user["user_id"]]
    ];

    for (let i = 0; i < voices.length; i++) {

        let voice = voices[i];

        let name_i_lable = document.createElement("div");
        name_i_lable.className = "user_profile_entry_title";
        name_i_lable.innerHTML = voice[0];

        let name_i = document.createElement("div");
        name_i.className = "user_profile_entry";

        if (!isVoidString(voice[1])) {
            name_i.innerHTML = voice[1];
        } else {
            name_i.innerHTML = "Sconosciuto";
        }
        wrap.appendChild(name_i_lable);
        wrap.appendChild(name_i);
    }
}


function getUserModel() {

    let user = storageGetItem("user_profile");

    let model = {
        "name": null,
        "surname": null,
        "user_id": stitchClient.getAuthenticatedId()
    }

    if (!isNullOrUndefined(user)) {
        model = {
            "name": user["name"],
            "surname": user["surname"],
            "user_id": stitchClient.getAuthenticatedId()
        }
    }

    return model;
}


function dateBackOneDay(dateObj){
  dateObj.setDate(dateObj.getDate()-1);
  return dateObj;
}

function dateForwardOneDay(dateObj){
  dateObj.setDate(dateObj.getDate()+1);
  return dateObj;
}


function getMonthLabel(i) {
  if(i == 0){return "Gennaio";}
  if(i == 1){return "Febbraio";}
  if(i == 2){return "Marzo";}
  if(i == 3){return "Aprile";}
  if(i == 4){return "Maggio";}
  if(i == 5){return "Giugno";}
  if(i == 6){return "Luglio";}
  if(i == 7){return "Agosto";}
  if(i == 8){return "Settembre";}
  if(i == 9){return "Ottobre";}
  if(i == 10){return "Novembre";}
  if(i == 11){return "Dicembre";}
  return "";
}

function convertEnglToIt(i) {
  if(i == 0){ return "Dom";}
  if(i == 1){ return "Lun";}
  if(i == 2){ return "Mar";}
  if(i == 3){ return "Mer";}
  if(i == 4){ return "Gio";}
  if(i == 5){ return "Ven";}
  if(i == 6){ return "Sab";}
  return "";
}

function getDateMonthGrid(year,month){

  let date = new Date(year,month,1);
  date.setDate(date.getDate()-7);

  let grid = [];

  for(let i = 0; i < 50; i++){

    date = dateForwardOneDay(date);
    grid.push({
      "is_in_month": date.getMonth() == month,
      "year": date.getFullYear(),
      "month": getMonthLabel(date.getMonth()),
      "day": convertEnglToIt(date.getDay()),
      "number": date.getDate(),
    });
  }

  let shifted_grid = [];
  let foundDom = false;
  for(let i = 0; i < grid.length && shifted_grid.length < 42; i++){
    if(grid[i].day == "Dom"){
      foundDom = true;
    }
    if(foundDom){
      shifted_grid.push(grid[i]);
    }
  }


  return shifted_grid;
}


function getMonthNumberFromLabel(label) {
  let months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

  return months.indexOf(label.toLowerCase());
}

function calendarMonthForward() {

  let calendar = document.getElementById("calendar_grid_view");
  let current = document.getElementById("current_month_year_label").innerHTML;
  let spl = current.split(" ");
  let month = getMonthNumberFromLabel(spl[0]);
  let year = spl[1];

  while(calendar.firstChild){
    calendar.removeChild(calendar.firstChild);
  }

  let date = new Date(year, month, 1);
  date.setMonth(date.getMonth() + 1);

  calendar.appendChild(calendarViewBuildFromDate(date));
}

function calendarMonthBack() {

  let calendar = document.getElementById("calendar_grid_view");
  let current = document.getElementById("current_month_year_label").innerHTML;
  let spl = current.split(" ");
  let month = getMonthNumberFromLabel(spl[0]);
  let year = spl[1];

  while(calendar.firstChild){
    calendar.removeChild(calendar.firstChild);
  }

  let date = new Date(year, month, 1);
  date.setMonth(date.getMonth() - 1);

  calendar.appendChild(calendarViewBuildFromDate(date));
}

function calendarView() {
  let today = new Date();
  return calendarViewBuildFromDate(today);
}

function calendarViewBuildFromDate(today) {

  if(isNullOrUndefined(getSelectedGroup())){
    return document.createElement("div");
  }

  let fill_grid = getDateMonthGrid(today.getFullYear(), today.getMonth());

  let calendar_table_wrap = document.createElement("div");
  calendar_table_wrap.className = "calendar-table-wrap";

  let nav_buttons = document.createElement("div");
  nav_buttons.className = "calendar-table-nav-buttons-wrap";

  let prev_month = document.createElement("div");
  prev_month.innerHTML = "‹";
  prev_month.className = "calendar-table-prev-month";
  prev_month.onclick = calendarMonthBack;
  let month_year_label = document.createElement("div");
  month_year_label.id = "current_month_year_label";
  month_year_label.innerHTML = getMonthLabel(today.getMonth())+ " " + today.getFullYear().toString();
  month_year_label.className = "calendar-table-month-label";
  let next_month = document.createElement("div");
  next_month.innerHTML = "›";
  next_month.onclick = calendarMonthForward;
  next_month.className = "calendar-table-next-month";

  nav_buttons.appendChild(prev_month);
  nav_buttons.appendChild(month_year_label);
  nav_buttons.appendChild(next_month);

  calendar_table_wrap.appendChild(nav_buttons);

  let calendar_table = document.createElement("table");
  calendar_table.className = "calendar-table";

  let headers = document.createElement("tr");
  let days =  ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

  for(let i = 0; i < days.length; i++){
    let header_box = document.createElement("td");
    header_box.innerHTML = days[i];
    header_box.className = "calendar-box-header";
    headers.appendChild(header_box);
  }
  calendar_table.appendChild(headers);

  for(let i = 0; i < 6; i++){

    let calendar_row = document.createElement("tr");

    for(let j = 0; j < 7; j++){

      let correct_grid_element = fill_grid[i*7 + j];

      let calendar_box = document.createElement("td");

      let key_date = today.getFullYear().toString() + "_" + today.getMonth() + "_" + correct_grid_element["number"].toString();

      calendar_box.innerHTML = "<div>"+correct_grid_element["number"] + "</div><div class=\"other-voters-wrap\"></div>";

      if(!correct_grid_element["is_in_month"]){
        calendar_box.className = "calendar-box-not-in-month";
      }else{
        setupCalendarBoxBasedOnDayStatuses(calendar_box, key_date);
        calendar_box.setAttribute("onclick", "dateBoxSelected(this)");
        calendar_box.setAttribute("ondblclick", "dateBoxDoubleClick(this)");
      }

      calendar_row.appendChild(calendar_box);
    }

    calendar_table.appendChild(calendar_row);
  }


  calendar_table_wrap.appendChild(calendar_table);

  return calendar_table_wrap;

}

function getDatesValuesKeySet(group){
  let keymap = Object.keys(group);
  let dates_keys = [];
  for(let i = 0; i < keymap.length; i++){
    if(keymap[i].substr(0,"user_dates_".length) == "user_dates_"){
      dates_keys.push(keymap[i]);
    }
  }
  return dates_keys;
}

function setupCalendarBoxBasedOnDayStatuses(calendar_box, related_div_date)
{
  let group = getSelectedGroup();
  let keymap = getDatesValuesKeySet(group);

  calendar_box.className = "calendar-box";

  for(let i = 0; i < keymap.length; i++){

    let user_group_values = group[keymap[i]];
    let key_user = replaceAll(keymap[i].substr("user_dates_".length), "_",".");

    for(let j = 0; j < user_group_values.length; j++){

      let element = user_group_values[j];

      if(calendar_box.className == "none"){
        calendar_box.className = "calendar-box";
      }

      if(element["l"] == related_div_date && key_user != getLoggedEmail()){

        let other_voter_ball = document.createElement("div");
        if(element["s"] == 1){
          other_voter_ball.className = "other_voter_ball other_voter_ball_red";
          other_voter_ball.setAttribute("name",key_user);
        }
        if(element["s"] == 2){
          other_voter_ball.className = "other_voter_ball other_voter_ball_yellow";
          other_voter_ball.setAttribute("name",key_user);
        }
        if(element["s"] == 3){
          other_voter_ball.className = "other_voter_ball other_voter_ball_green";
          other_voter_ball.setAttribute("name",key_user);
        }

        calendar_box.children[1].appendChild(other_voter_ball);
      }

      if(element["l"] == related_div_date && key_user == getLoggedEmail()){
        if(element["s"] == 1){
          calendar_box.className = "calendar-box calendar-box-pessimo";
        }
        if(element["s"] == 2){
          calendar_box.className = "calendar-box calendar-box-non-so";
        }
        if(element["s"] == 3){
          calendar_box.className = "calendar-box calendar-box-ottimo";
        }
      }
    }

  }
}


function dateBoxDoubleClick(item) {

  let day = item.children[0].innerHTML;

  let balls = item.children[1].children;
  let stats = [];
  for(let i = 0; i < balls.length; i++){
    let value = "";
    if(balls[i].className.indexOf("red") != -1){
      value = "fast_resume_red";
    }
    if(balls[i].className.indexOf("yellow") != -1){
      value = "fast_resume_yellow";
    }
    if(balls[i].className.indexOf("green") != -1){
      value = "fast_resume_green";
    }
    stats.push({"user": balls[i].getAttribute("name"), "value": value});
  }


  let stat_node = document.createElement("div");
  stat_node.className = "node_info_wrap";
  for(let i = 0; i < stats.length; i++){
     let node_inf = document.createElement("div");
     node_inf.className = "node_info_main_line";
     let node_dot = document.createElement("div");
     node_dot.className = "node_info_main_dot " + stats[i]["value"];
     let node_usr = document.createElement("div");
     node_usr.className = "node_info_main_usr";
     node_usr.innerHTML = stats[i]["user"];
     node_inf.appendChild(node_dot);
     node_inf.appendChild(node_usr);
     stat_node.appendChild(node_inf);
  }

  let title = "Giorno: "+ day + " " + document.getElementById("current_month_year_label").innerHTML;

  stitchClient.openCustomNodeDialog(title,"Voti degli altri utenti per il giorno selezionato:",stat_node);
}

function dateBoxSelected(item) {
  item.classList.toggle("calendar-box-selected");
}

function setSelectedDates(level) {

  let boxes_l = document.getElementsByClassName("calendar-box-selected");
  let boxes = [];
  for(let i = 0; i < boxes_l.length; i++){
    boxes.push(boxes_l[i]);
  }

  for(let i = 0; i < boxes.length; i++){
    let clicked_datebox_full_label = getFullSlotDateLabel(boxes[i].children[0].innerHTML);

    setGroupDateStatus(clicked_datebox_full_label,level);
  }

  let group = getSelectedGroup();

  storageSetItem(user_groups_collection_name, group["data_id"], group);

  redrawCalendar();
}

function redrawCalendar() {
  let calendar = document.getElementById("calendar_grid_view");
  let current = document.getElementById("current_month_year_label").innerHTML;
  let spl = current.split(" ");
  let month = getMonthNumberFromLabel(spl[0]);
  let year = spl[1];

  while(calendar.firstChild){
    calendar.removeChild(calendar.firstChild);
  }
  let date = new Date(year, month, 1);
  calendar.appendChild(calendarViewBuildFromDate(date));
}


function getFullSlotDateLabel(dayNumber) {
  let current = document.getElementById("current_month_year_label").innerHTML;
  let spl = current.split(" ");
  let month = getMonthNumberFromLabel(spl[0]);
  let year = spl[1];
  return year.toString()+"_"+month.toString()+"_"+dayNumber.toString();
}

function replaceAll(str,old,new_) {
  while(str.indexOf(old) != -1){
    str = str.replace(old,new_);
  }
  return str;
}

function setGroupDateStatus(date_label, date_status){
  let group = getSelectedGroup();

  let user_key = "user_dates_"+getLoggedEmail();
  user_key = replaceAll(user_key,".","_");

  let target = {"l":date_label, "s":date_status};

  if(isNullOrUndefined(group[user_key])){
    group[user_key] = [];
  }

  let index = getGroupUserDateIndex(group[user_key], target);

  if(date_status == 4 && index != -1){
    group[user_key] = removeElementFromListAtIndex(group[user_key],index);
  }else{
    if(date_status != 4){
      if(index == -1){
        group[user_key].push(target);
      }else{
        group[user_key][index] = target;
      }
    }
  }


  storageSetItem("", group["data_id"], group);
}


function getGroupUserDateIndex(list, target) {

  let index = -1;

  for(let i = 0; i < list.length; i++){
    let el = list[i];
    if(el["l"] == target["l"]){
      return i;
    }
  }

  return index;
}
