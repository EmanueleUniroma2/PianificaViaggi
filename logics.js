
var App_Pages = [
  {
    "name" : "login",
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "img",
            "node_tags": [["className","travel_gif"], ["src","airplane.gif"]],
          },
          {
            "node_type": "div",
            "node_tags": [["className","title"], ["innerHTML","Pianifica e Viaggia"]],
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
          }
        ]
      }
    ]
  },
  {
    "name" : "register",
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "registration_specification"], ["innerHTML", "Registrarsi è gratis e ti permette di pianificare viaggi con i tuoi amici e tenere traccia degli impegni che hanno pubblicato."]]
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
    "content": [
      {
        "node_type":"div",
        "node_afterinit": "performUserConfirmation",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "registration_specification"], ["innerHTML", "Pagina di conferma dell'email. Se tutto va bene, dovresti vedere un messaggio di successo."]]
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
    "name": "reset_password",
    "content": [
      {
        "node_type":"div",
        "node_tags": [["className","form_page"]],
        "node_childs": [
          {
            "node_type": "div",
            "node_tags": [["className", "registration_specification"], ["innerHTML", "Reimposta la tua password tramite il form sottostante."]]
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


// init here db name and realm app name
const version_label = "Versione 0.3 (non aperto al pubblico)";
const app_name = "pianificaeviaggia-ljhog";
const db_name = "guitar_online_user_data";
const stitchClient = new StitchAppClient(app_name, db_name);

function navigate(page){
  stitchClient.setNavigation(page);
}

function boot(){
  stitchClient.registerAppTargetNodeId("page_content");
  stitchClient.registerAppPages(App_Pages);
  stitchClient.boot();
  setVersion();
}

function performLogin(){
  let email = getInputValue("login_email");
  let password = getInputValue("login_password");
  stitchClient.login(email, password);
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

function performPasswordReset(){
  let password = getInputValue("reset_password");
  let password_2 = getInputValue("reset_password_2");
  stitchClient.resetPassword(password,password_2);
}

function performUserConfirmation() {
  if(stitchClient.confirmUser() == null){
    navigate('login');
  }
}

function setVersion() {
  let node = document.createElement("div");
  node.innerHTML = version_label;
  node.className = "version";
  document.body.appendChild(node);
}
