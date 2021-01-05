

var lastInitedAppClient = null;
var IsDeveloper = false;
var singletonRegisteredEventListeners = [];

function singletonAddEventListener(target, eventName, callBack,flag){
  if(singletonRegisteredEventListeners.indexOf(eventName)){
    singletonRegisteredEventListeners.push(eventName);
    target.addEventListener(eventName, callBack,flag);
  }
}

function pageHasResized(){
  if(!isNullOrUndefined(lastInitedAppClient)){
    lastInitedAppClient.pageResizeHandle();
  }
}
function pageHasChanged(){
  if(!isNullOrUndefined(lastInitedAppClient)){
    lastInitedAppClient.pageNavigate();
  }
}
function storageRemoveItem(name){
  localStorage.removeItem(name);
}
function storageGetItem(name){
  let el = localStorage.getItem(name);
  if(!isNullOrUndefined(el)){
    return JSON.parse(el);
  }else{
    return "";
  }
}
function storageSetItem(name, value){
  let ready_to_save = JSON.stringify(value);
  localStorage.setItem(name, ready_to_save);
}
function clearStorage(){
  localStorage.clear();
}
function validateEmail(mail){
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}
function isNullOrUndefined(obj) {
    return (obj == undefined || obj == null || obj == "undefined");
}

function isVoidString(str){
  return isNullOrUndefined(str) || str == "";
}
function getInputValue(id){
  let el = document.getElementById(id);
  if(!isNullOrUndefined(el)){
    return el.value;
  }else{
    return null;
  }
}
function setInputValue(id, value) {
  let el = document.getElementById(id);
  if(!isNullOrUndefined(el)){
    el.value = value;
  }
}
function getCheckboxIsChecked(id){
  let el = document.getElementById(id);
  if(!isNullOrUndefined(el)){
    return el.checked;
  }else{
    return null;
  }
}
function setCheckboxIsChecked(id, setted){
  let el = document.getElementById(id);
  if(!isNullOrUndefined(el)){
    el.checked = setted;
  }else{
    return null;
  }
}
function showBreadCrumb(msg) {

    killBreadCrumb();

    let d = document.createElement("div");
    d.className = "stitch_bread_crumb";
    // adjust style for lower res screens
    if (window.innerWidth < 600) {
        d.style.fontSize = "0.9em";
        d.style.padding = "0.5em 1em";
    }
    d.innerHTML = msg;
    document.body.appendChild(d);

    setTimeout(function() {

      let animation_duration = 700; //ms
      d.style.transition = "opacity " + animation_duration + "ms linear";
      d.style.opacity = "0";
      setTimeout(function() {
          killBreadCrumb();
      }, animation_duration);

    }, 3000);
}
function killBreadCrumb() {
    let br_list = document.getElementsByClassName("stitch_bread_crumb");
    if (br_list.length == 0) {
        return;
    }
    let first = br_list[0];
    first.parentElement.removeChild(first);
}


/*
  Just some embedded styles for dialogs and loading spinners
*/
var Stitch_FrameWork_EmbeddedStyles = ""+
".stitch_modal_dialog_inkdrop{"+
"    position: fixed;"+
"    top: 0;"+
"    left: 0;"+
"    width: 100vw;"+
"    height: 100vh;"+
"    z-index: 50;"+
"    background-color: rgba(0,0,0,0.8);"+
"    opacity: 0;"+
"    transition: opacity 0.3s ease-out;"+
"}"+
".stitch_bread_crumb {"+
"    position: fixed;"+
"    z-index: 100;"+
"    bottom: 1em;"+
"    left: 0;"+
"    right: 0;"+
"    background-color: rgba(0, 0, 0, 0.9);"+
"    padding: 0.5em 1em;"+
"    color: white;"+
"    font-size: 1.1em;"+
"    text-align: center;"+
"    border-radius: 0.5em;"+
"    margin: 0 auto;"+
"    width: 1rem;"+
"    width: min-content;"+
"    max-width: 30em;"+
"    min-width: 20em;"+
"}"+
".stitch_modal_dialog{"+
"	border-radius: 1rem;"+
"	margin: 10em auto;"+
"	background-color: white;"+
"	width: 50vw;"+
"	padding: 1em;"+
"}"+
".stitch_modal_title{"+
"  font-weight: bold;"+
"  font-size: 1.3em;"+
"  color: black;"+
"}"+
".stitch_modal_button{"+
"	display: inline-block;"+
"  margin: 0 1em;"+
"  color: black;"+
"  font-weight: bold;"+
"  border: 1px solid;"+
"  padding: 0.1em 0.4em;"+
"  min-width: 5em;"+
"  text-align: center;"+
"  cursor: pointer;"+
"  user-select: none;"+
"}"+
".stitch_api_spinner_backdrop{"+
"    position: fixed;"+
"    top: 0em;"+
"    left: 0;"+
"    width: 100vw;"+
"    height: 100vh;"+
"    background-color: white;"+
"    opacity: 0.7;"+
"    z-index: 15;"+
"}"+
".stitch_api_spinner{"+
"    position: fixed;"+
"    margin: 0 auto;"+
"    top: 10em;"+
"    width: 7em;"+
"    left: 3em;"+
"    right: 0;"+
"    height: 7em;"+
"    border: 1em solid transparent;"+
"    border-radius: 50%;"+
"    border-bottom: 1em solid #3b3b9e;"+
"    animation: stitch_spinner_spin 0.5s linear infinite;"+
"    z-index: 15;"+
"}"+
"@keyframes stitch_spinner_spin {"+
"	from {"+
"		transform: rotate(0deg);"+
"	}"+
"	to {"+
"		transform: rotate(360deg);"+
"	}"+
"}"+
"@-moz-keyframes stitch_spinner_spin {"+
"	from {"+
"		-moz-transform: rotate(0deg);"+
"	}"+
"	to {"+
"		-moz-transform: rotate(360deg);"+
"	}"+
"}";


/* stitch client for the backend */
class StitchServerClient{

  // sync models
  // this list must contain the list of items' keys from "localStorage" that will be syncked
  // between each device and on the backend
  // e.g:
  // localStorage contains { "field_1": "value_1", "field_2": "value_2", "field_3": "value_3"}
  //
  // if you want to sync only field_1 and field_3 you can set this list as ["field_1","field_3"]
  //
  // this will automagically make the sync happen
  //
  // remember that only elements that are stored in the localStorage can be syncked
  sync_models = [];

  // drivers
  db_name = "";
  app_name = "";

  // clients
  stitch_actual_client = null;
  reference_to_mongo_db = null;
  profileProvider = null;

  // stored credentials
  email = "";
  password = "";

  // used to avoid multiple calls in parallel
  serving_request = false;
  promise_timed_out_flag = "__promise_did_timeout__";
  promise_time_out_duration = 10000;
  already_serving_flag = "already serving a request";

  // init clients
  constructor(app_name, db_name){
    this.app_name = app_name;
    this.db_name = db_name;
    this.stitch_actual_client = stitch.Stitch.initializeDefaultAppClient(this.app_name);
    this.reference_to_mongo_db = this.stitch_actual_client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db(this.db_name);
    this.profileProvider = this.stitch_actual_client.auth.getProviderClient(stitch.UserPasswordAuthProviderClient.factory, "local-userpass");
  }

  /*
    The promise.race method is used to force a controlled timeout on
    any api call that may never return.
  */
  promiseTimeout(promise){

    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        this.serving_request = false;

        let name = promise.name;
        if(name != undefined){
          console.log("Timed out: " + name);
        }
        resolve(this.promise_timed_out_flag);
      }, this.promise_time_out_duration);
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
      promise,
      timeout
    ]);
  };

  // get parameters from url
  getUrlParams(){

    //var my_url_var = window.location.href;
    let my_url_var = (window.location != window.parent.location)
                ? document.referrer
                : document.location.href;

    let params_list = my_url_var.split("?");

    let final = {};

    if(params_list.length > 1){

      let params_parsed = params_list[1].split("&");

      for(let i = 0; i < params_parsed.length; i++){
        let p_couple = params_parsed[i].split("=");
        final[p_couple[0]] = p_couple[1];
      }
    }

    return final;
  }

  // routine to confirm a user registration
  async confirmUser(){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let params = this.getUrlParams();
    let token = params["token"];
    let tokenId = params["tokenId"];

    let res = null;

    try{
      let res = await this.promiseTimeout(this.profileProvider.confirmUser(token, tokenId));
    }
    catch(e){
      res = e;
      console.error("reference_to_mongo_db.confirmUser", e);
    }

    this.serving_request = false;

    return res;
  }

  // register an user by email and password
  async registerUser(email, password){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let res = null;

    try{
      let res = await this.promiseTimeout(this.profileProvider.registerWithEmail(email.toLowerCase(), password));
    }
    catch(e){
      res = e;
      console.error("reference_to_mongo_db.registerUser", e);
    }

    this.serving_request = false;

    return res;
  }

  // request send reset password email
  async sendResetPasswordEmail(email){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let res = null;

    try{
      let res = await this.promiseTimeout(this.profileProvider.sendResetPasswordEmail(email.toLowerCase()));
    }
    catch(e){
      res = e;
      console.error("reference_to_mongo_db.sendResetPasswordEmail", e);
    }

    this.serving_request = false;

    return res;
  }

  getDataModel(){
    let data_list = [];

    for(let i = 0; i < this.sync_models.length; i++){
      let name = this.sync_models[i];
      let el = localStorage.getItem(name);
      if(el != null){
        data_list.push([name, JSON.parse(el)]);
      }
    }
    return data_list;
  }

  // produce an empty model if is the first login
  getFirstTimeModel(){

    let model = this.getDataModel();
    model.push(["email", this.email]);
    model.push(["is_developer", false]);
    model.push(["user_id", this.stitch_actual_client.auth.user.id]);

    return model;
  }

  // request resend confirmation email
  async resendConfirmationEmail(email){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let res = null;

    try{
      let res = await this.promiseTimeout(this.profileProvider.resendConfirmationEmail(email.toLowerCase()));
    }
    catch(e){
      res = e;
      console.error("reference_to_mongo_db.resendConfirmationEmail", e);
    }

    this.serving_request = false;

    return res;
  }

  // reset user password
  async resetPassword(newPassword){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let params = this.getUrlParams();
    let token = params["token"];
    let tokenId = params["tokenId"];

    let res = null;

    try{
      res = await this.promiseTimeout(this.profileProvider.resetPassword(token, tokenId, newPassword));
    }
    catch(e){
      res = e;
      console.error("reference_to_mongo_db.resetPassword", e);
    }

    this.serving_request = false;

    return res;
  }

  // logout
  async logout(){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let error = null;

    if(!this.isAuthenticated()){
      console.error("reference_to_mongo_db.logout", "user is not authenticated.");
    }else{
      try{
        await this.promiseTimeout(this.stitch_actual_client.auth.logout());
      }
      catch(e){
        error = e;
        console.error("reference_to_mongo_db.logout", e);
      }
    }

    this.killCachedSessionAndCredentials();

    this.serving_request = false;

    return error;
  }

  async login(email, password){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    console.info("Login for : " + email);

    let res = null;

    try{
      await this.stitch_actual_client.auth.loginWithCredential(new stitch.UserPasswordCredential(email.toLowerCase(), password));
      this.storeCredentials(email.toLowerCase(), password);
      console.info("Success.");
    }
    catch(e){
      res = e;
      console.error("reference_to_mongo_db.login", e);
    }

    this.serving_request = false;

    return res;
  }

  // develop option to set a developer flag on the db (used to show developer content to developers)
  async setDeveloperFlag(collection, mode){

      if(this.serving_request){return this.already_serving_flag;}
      this.serving_request = true;

      let result = null;

      if(!this.isAuthenticated()){
        console.error("reference_to_mongo_db.setDeveloper", "user is not authenticated.");
      }else{
        console.info("Setting developer flag to: " + mode);

        try{
          result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).updateOne({user_id: this.stitch_actual_client.auth.user.id} , {$set:{is_developer: mode}}, {upsert:true}));
        }
        catch(e){
          result = e;
          console.error("reference_to_mongo_db.setDeveloper", e);
        }
      }

      this.serving_request = false;

      return result;
  }

  // remove a single element in a collection
  async remove(collection, data_list){

      if(this.serving_request){return this.already_serving_flag;}
      this.serving_request = true;

      let result = null;

      /*
        Should be something like
        {user_id: this.stitch_actual_client.auth.user.id} ,
        {$set:{data:data}},
        {upsert:true}
      */
      let patch_arguments = { $unset: {} };

      for(let i = 0; i < data_list.length; i++){
        let el = data_list[i];
        patch_arguments["$unset"][el[0]] = el[1];
      }

      if(!isAuthenticated()){
        console.error("reference_to_mongo_db.remove", "user is not authenticated.");
      }else{
          console.info("Tryng remove.", data_list);

          try{
            result = await promiseTimeout(reference_to_mongo_db.collection(collection).updateOne({user_id: this.stitch_actual_client.auth.user.id},patch_arguments,{upsert:true}));
            console.info("Done.");
          }
          catch(e){
            result = e;
            console.error("reference_to_mongo_db.remove", e);
          }
      }

      this.serving_request = false;

      return result;
    }



  // patch a single element in a collection
  async patchSingleInCollection(collection, field){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let result = null;

    /*
      Should be something like
      {user_id: this.stitch_actual_client.auth.user.id} ,
      {$set:{data:data}},
      {upsert:true}
    */
    let patch_arguments = { $set: field };

    if(!this.isAuthenticated()){
      console.error("reference_to_mongo_db.patchSingleInCollection", "user is not authenticated.");
    }else{
        console.info("Tryng patchSingleInCollection.", field);

        try{
          result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).updateOne({user_id: this.stitch_actual_client.auth.user.id},patch_arguments,{upsert:true}));
          console.info("Done.");
        }
        catch(e){
          result = e;
          console.error("reference_to_mongo_db.patchSingleInCollection", e);
        }
    }

    this.serving_request = false;

    return result;
  }

  async fetch(collection){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let result = null;

    if(!this.isAuthenticated()){
      console.error("reference_to_mongo_db.fetch", "user is not authenticated.");
    }else{
      console.info("Tryng fetch.");

      try{
        result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).find({user_id: this.stitch_actual_client.auth.user.id}, { limit: 1}).asArray());
        console.info("Fetch done.");
      }
      catch(e){
        result = e;
        console.error("reference_to_mongo_db.fetch", e);
      }
    }

    this.serving_request = false;

    return result;
  }


  async fetchAndInitModelIfMissing(collection){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let result = null;

    if(!this.isAuthenticated()){
      console.error("reference_to_mongo_db.fetchAndInitModelIfMissing", "user is not authenticated.");
    }else{
      console.info("Tryng fetch.");

      try{
        result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).find({user_id: this.stitch_actual_client.auth.user.id}, { limit: 1}).asArray());
        console.info("Fetch done.");

        // user has no data
        if(result.length == 0){
          console.info("Fetch data is empty, filling first time user.");

          this.serving_request = false;
          await this.promiseTimeout(this.patchInCollection(collection,this.getFirstTimeModel()));
          this.serving_request = true;

          showBreadCrumb("Il tuo account è stato inizializzato.");
          console.info("Done.");
        }
      }
      catch(e){
        result = e;
        console.error("reference_to_mongo_db.fetchAndInitModelIfMissing", e);
      }
    }

    this.serving_request = false;

    return result;
  }

  async patchInCollection(collection, data_list){

    if(this.serving_request){return this.already_serving_flag;}
    this.serving_request = true;

    let result = null;

    /*
      Should be something like
      {user_id: this.stitch_actual_client.auth.user.id} ,
      {$set:{data:data, data2:data2, etc...}},
      {upsert:true}
    */
    let patch_arguments = { $set: {} };

    for(let i = 0; i < data_list.length; i++){
      let el = data_list[i];
      patch_arguments["$set"][el[0]] = el[1];
    }

    if(!this.isAuthenticated()){
      console.error("reference_to_mongo_db.patchInCollection", "user is not authenticated.");
    }else{
        console.info("Tryng patchInCollection.", data_list);

        try{
          result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).updateOne({user_id: this.stitch_actual_client.auth.user.id},patch_arguments,{upsert:true}));
          console.info("Done.");
        }
        catch(e){
          result = e;
          console.error("reference_to_mongo_db.patchInCollection", e);
        }
    }

    this.serving_request = false;

    return result;
  }

  /*
    Used in applications that use autologin feature

    This call will try to login with stored store credentials
    if available and if the fetch is enabled it will also load any user data,
    else will handle the error and return null.

    App should check if null is returned and go to login page if happens.
  */
  async autoLoginFullSequence(collection){

    /* there are stored credentials */
    if(this.loadStoredCredentials()){

      showBreadCrumb("Accesso: " + this.email);
      let res = await this.promiseTimeout(this.login(this.email, this.password));

      if(isNullOrUndefined(res)){
        showBreadCrumb("Sincronizzazione dati...");
        let obj = await this.promiseTimeout(this.fetchAndInitModelIfMissing(collection));

        if(obj != null){
          this.bootRemoteModel(obj[0]);
        }

      }else{
        console.info("Login failed: " + (res.message || "unknown error"));
      }

    }else{
      console.info("There are no user creds stored. Cannot auto-login.");
    }

    return null;
}

bootRemoteModel(user_data){

  /* there are stats to update here */
  if(!isNullOrUndefined(user_data)){

    IsDeveloper = user_data["is_developer"];

    for(let i = 0; i < this.sync_models.length; i++){
      let name = this.sync_models[i];
      let el = user_data[name];
      if(!isNullOrUndefined(el)){
        localStorage.setItem(name, JSON.stringify(el));
      }
    }

    showBreadCrumb("Dati sincronizzati.");
  }
}

async fullLoginFetchSequence(email, password, collection){

    showBreadCrumb("Accesso: " + email);
    let res = await this.promiseTimeout(this.login(email, password));

    if(isNullOrUndefined(res)){
      showBreadCrumb("Sincronizzazione dati...");
      let obj = await this.promiseTimeout(this.fetchAndInitModelIfMissing(collection));

      if(obj != null){
        this.bootRemoteModel(obj[0]);
      }else{
        showBreadCrumb("Impossibile caricare i dati...");
      }
    }else{
      console.info("Login failed: " + (res.message || "unknown error"));
    }

    return null;
}


  // get stitch client user id
  authenticatedId(){
    return this.client.auth.user.id;
  }

  // check user is autenticated
  isAuthenticated(){
    try{
      return this.email.length > 0;
    }catch(e){
      return false;
    }
  }

  // load cached session and credentials if any
  loadStoredCredentials(){

    let stored = localStorage.getItem("__stitch.creds");

    if(stored != null){
      let obj = JSON.parse(stored);
      this.email = obj.email;
      this.password = obj.password;
      return true;
    }

    // be sure to have clean cache if __stitch.creds are missing
    this.killCachedSessionAndCredentials();

    return false;
  }

  // store stitch credentials
  storeCredentials(email, password){
      localStorage.setItem("__stitch.creds", JSON.stringify({email: email.toLowerCase(), password: password}));
      this.email = email;
      this.password = password;
  }

  // remove stitch credentials and session tokens
  killCachedSessionAndCredentials(){

    Object.keys(localStorage).forEach(function(key){
      if(key.substring(0,"__stitch".length) == "__stitch"){
        localStorage.removeItem(key);
      }
    });

    this.email = "";
    this.password = "";
  }
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ///////// END OF STITCH SERVER CLIENT /////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ///////// START OF STITCH FRONTEND CLIENT /////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


/* stitch client for the frontend */
class StitchAppClient {

    server = null;

    // used to dynamically resize some elements
    elementsRegisteredForDynamicResize = [];

    // used to handle page navigation warings like (save before leave this page)
    confirm_navigation_level = 0;

    // the id of the element in wich the stitch framework will build the app
    targetPageElementId = null;

    // the registered app pages
    appPages = [];

    // page resize callback
    pageResizedCallbackName = null;

    constructor(app_name, db_name){

      if(isVoidString(app_name) || isVoidString(db_name)){
        return;
      }

      this.server = new StitchServerClient(app_name, db_name)
    }

    // set the page resized
    setPageResizeHandle(resizePageHandlerFunctionName){
      this.pageResizedCallbackName = resizePageHandlerFunctionName;
    }

    // call the callback for resized page if was defined
    pageResizeHandle(){

      // handle resize of elements
      for(let i = 0; i < this.elementsRegisteredForDynamicResize.length;i++){
        this.resizeDynamicElement(this.elementsRegisteredForDynamicResize[i]);
      }

      // if a page resize callback has been defined, call it
      if(!isVoidString(this.pageResizedCallbackName)){
        window[this.pageResizedCallbackName]();
      }
    }

    // setters for above status variables
    registerAppTargetNodeId(nodeId){
      this.targetPageElementId = nodeId;
    }
    registerAppPages(pages){
      this.appPages = pages;
    }

    // inject embedded styles in the html
    injectStitchFrameworkCss(){

      let node_string = "<style type=\"text/css\">"+Stitch_FrameWork_EmbeddedStyles+"</style>";

      let style = document.createElement("style");
      style.type = 'text/css';

      if (style.styleSheet){
        style.styleSheet.cssText = node_string;
      }
      else{
        style.appendChild(document.createTextNode(Stitch_FrameWork_EmbeddedStyles));
      }

      document.getElementsByTagName("head")[0].appendChild(style);
    }

    // search for a page by name key and return the content key
    getPageDescByName(searched_name){

      for(let i = 0; i < this.appPages.length; i++){

        let page = this.appPages[i];
        let name = page["name"];
        let content = page["content"];
        let authRequired = page["requiresAuth"];

        // you can access a page if it does not require a login, or if you are logged in
        if(searched_name == name && (!authRequired || this.server.isAuthenticated())){
          return content;
        }
      }

      return null;
    }

    /* base open dialog class (this uses the embedded stitch styles) */
    openDialog(title, text, buttons, callbacks) {

        if (buttons == "alert") {
            buttons = ["Chiudi"];
        }
        if (buttons == "confirm") {
            buttons = ["Si", "No"];
        }
        if (buttons == "confirm_cancellable") {
            buttons = ["Si", "No"];
        }

        if (isNullOrUndefined(title)) {
            title = "Messaggio dal sito";
        }
        if (isNullOrUndefined(text)) {
            text = "";
        }
        if (isNullOrUndefined(buttons)) {
            buttons = ["Chiudi"];
        }
        if (isNullOrUndefined(callbacks)) {
            callbacks = [];
        }

        if (buttons.length == 0) {
            buttons = ["Chiudi"];
        }

        let inkdrop = document.createElement("div");
        inkdrop.className = "stitch_modal_dialog_inkdrop";
        inkdrop.id = "modal_ink_drop";

        let dialog = document.createElement("div");
        dialog.className = "stitch_modal_dialog";

        let inner_dialog = "<div class=\"stitch_modal_title\">" + title + "</div>" + "<div class=\"stitch_modal_text\">" + this.generateMultilineHTMLfromString(text) + "</div>\n";
        inner_dialog += "<div style=\"margin-top: 0.5rem; text-align: end;\">\n";

        for (let i = 0; i < buttons.length; i++) {

            let callback = callbacks.length > i ? callbacks[i] : "";

            let callback_inline = "(document.getElementsByClassName('stitch_modal_dialog_inkdrop')[0]).parentNode.removeChild((document.getElementsByClassName('stitch_modal_dialog_inkdrop')[0])); ";

            if(!isVoidString(callback)){
              callback_inline += callback+"();"
            }

            inner_dialog += "<div class=\"stitch_modal_button\" onclick="+callback_inline+">" + buttons[i] + "</div>\n";
        }
        inner_dialog += "</div>\n";

        dialog.innerHTML = inner_dialog;

        inkdrop.appendChild(dialog);

        document.body.appendChild(inkdrop);

        setTimeout(this.fadeInDialog, 50);
    }

    /* some dialog shortcuts*/
    openConfirmDialog(body, callbacks) {
        this.openDialog("Confermare azione", body, "confirm", callbacks);
    }
    openInfoDialog(body) {
        this.openDialog("", body, "alert", null);
    }
    openAlertDialog(body) {
        this.openDialog("Nota", body, "alert", null);
    }

    // used to print multiline html text without using stuff like "white-space:pre" (wich gives errors on IOS)
    generateMultilineHTMLfromString(text) {
        if (isNullOrUndefined(text)) {
            return "";
        }

        let spl = text.split("\n");
        if (spl.length == 1) {
            return text;
        } else {
            let output = "";
            for (let i = 0; i < spl.length; i++) {
                output += "<div>" + spl[i] + "</div>";
            }
            return output;
        }
    }

    // animation for dialog to fade in
    fadeInDialog() {
        let drop = document.getElementById("modal_ink_drop");
        drop.style.opacity = "1";
    }

    // turn api spinner on-off
    toggleAPISpinner(toggle) {

        if (toggle) {

            let spinner_backdrop = document.createElement("div");
            spinner_backdrop.className = "stitch_api_spinner_backdrop";
            document.body.appendChild(spinner_backdrop);

            let spinner = document.createElement("div");
            spinner.className = "stitch_api_spinner";
            document.body.appendChild(spinner);
        } else {
            let l = document.getElementsByClassName("stitch_api_spinner_backdrop");
            if (l.length != 0) {
                l[0].parentElement.removeChild(l[0]);
            }
            let r = document.getElementsByClassName("stitch_api_spinner");
            if (r.length != 0) {
                r[0].parentElement.removeChild(r[0]);
            }
        }
    }

    // handle stitch specific errors messages here (translate to italian in this case)
    textForApiErrorCode(message) {

        if (message == undefined) {
            return "Il sito era momentaneamente occupato e non ha potuto gestire la richiesta. Fare un altro tentativo dovrebbe risolvere il problema.";
        }

        if (message == "invalid username/password") {
            return "Sono state fornite credenziali errate, oppure non esiste un account associato a queste credenziali.";
        }
        if (message == "password must be between 6 and 128 characters") {
            return "La password deve essere lunga tra 6 e 128 caratteri.";
        }
        if (message == "name already in use") {
            return "Esiste già un utente registrato con questa email.";
        }
        if (message == "invalid token data") {
            return "Token non valido. Ripetere la procedura.";
        }
        if (message == "already confirmed") {
            return "Questa email è associata ad un account già correttamente registrato.";
        }
        if (message == "userpass token is expired or invalid") {
            return "Il token di accesso è scaduto o invalido.";
        }
        if (message == "user not found") {
            return "L'email indicata non è associata ad alcun utente registrato.";
        }

        return "Errore sconosciuto (" + message + ")";
    }

    // handler for stitch errors
    handleApiResult(result, success) {

        this.toggleAPISpinner(false);

        let error_result = false;

        try {
            error_result = (result.message != undefined);
        } catch (e) {

        }

        if (error_result) {

            if (result.message != "silent") {
                let text = this.textForApiErrorCode(result.message);
                this.openAlertDialog(text);
            }

        } else {
            if(!isVoidString(success)){
              this.openInfoDialog(success);
            }
        }

        let my_url_var = (window.location != window.parent.location) ?
            document.referrer :
            document.location.href;

        let params_list = my_url_var.split("?");

        return result;
    }

    // in case user clicked no for navigation action where a dialog was presented
    // to make sure user wants to leave the page
    abortPageNavigate() {

        this.confirm_navigation_level = 2;

        history.back();

        setTimeout(function() {
            this.confirm_navigation_level = 1;
        }, 300);
    }

    // same as above, but user clicked yes
    confirmPageNavigate() {
        this.confirm_navigation_level = 0;
        this.pageNavigate();
    }

    // inner callback for page navigation
    pageNavigateInner() {

        this.elementsRegisteredForDynamicResize = [];

        let page = this.getUrlSection(1);

        let page_no_args = page.split("?")[0];

        let pageContent = this.getPageDescByName(page_no_args);

        if(!isNullOrUndefined(pageContent)){
          this.buildPageBase(pageContent);
        }else{
          this.showLockedPage();
        }

        // handle resize specific logics once
        this.pageResizeHandle();
    }

    // refresh the current page based on url #-navigation
    pageNavigate() {

        if (this.confirm_navigation_level == 2) {
            return;
        }

        if (this.confirm_navigation_level == 1) {
            this.openConfirmDialog("Sei sicuro di voler cambiare pagina? Il lavoro non salvato andrà perduto.", ["confirmPageNavigate", "abortPageNavigate"]);
        } else {
            this.pageNavigateInner();
        }
    }

    // entry point for page buildup
    buildPageBase(content){
      let p = this.getCleanNavigationPanel();
      this.buildPage(p, content);
    }

    // recursive page builder
    buildPage(fatherNode, content){

      for(let i = 0; i < content.length; i++){

        let element = content[i];

        let nodeType = element["node_type"];
        let nodeTags = element["node_tags"];
        let childs = element["node_childs"];
        let afterInit = element["node_afterinit"];

        let last_created = this.betterAppendChild(fatherNode, this.betterCreateElement(nodeType, nodeTags));

        if(!isNullOrUndefined(childs)){
          this.buildPage(last_created, childs);
        }

        if(!isVoidString(afterInit)){
          window[afterInit]();
        }
      }
    }

    // set sync models
    setSyncModels(modelsList){
      if(!isNullOrUndefined(modelsList)){
        this.server.sync_models = modelsList;
      }
    }

    // default unknown page
    showLockedPage() {

        let p = this.getCleanNavigationPanel();
        let last;

        if(this.server.isAuthenticated()){
          last = this.betterAppendChild(p, this.betterCreateElement("div", [
              ["className", "locked_page_label"],
              ["innerHTML", "La pagina a cui vuoi accedere non esiste."]
          ]));
        }else{
          last = this.betterAppendChild(p, this.betterCreateElement("div", [
              ["className", "locked_page_label"],
              ["innerHTML", "La pagina a cui vuoi accedere è riservata agli utenti registrati, oppure non esiste."]
          ]));
          last = this.betterAppendChild(p, this.betterCreateElement("div", [
              ["className", "go_to_login_help"],
              ["innerHTML", "Se possiedi un account registrato, puoi accedere tramite la"]
          ]));
          last = this.betterAppendChild(last, this.betterCreateElement("div", [
              ["className", "go_to_login_link"],
              ["innerHTML", "pagina di login."],
              ["onclick","navigate('login')"]
          ]));
        }
    }

    // read a section of the url
    // 0: before the #
    // 1: after the #
    getUrlSection(segment) {

        if (segment != 0 && segment != 1) {
            return;
        }

        // default page is the first one in the list
        let default_page = "";

        if(this.appPages.length > 0){
          default_page = this.appPages[0]["name"];
        }

        let curr_url = decodeURI(window.location.href);

        // has page defined
        if (curr_url.split("#").length > 1) {
            return curr_url.split("#")[segment];
        } else {
            window.location.href = encodeURI(window.location.href + "#" + default_page);
            return default_page;
        }
    }

    // remove all content from the page target node element, and return a reference
    // to the node
    getCleanNavigationPanel() {

        let panel;
        if(!isNullOrUndefined(this.targetPageElementId)){
          panel = document.getElementById(this.targetPageElementId);
        }
        else{
          panel = document.body;
        }


        if (isNullOrUndefined(document.body)) {
            return null;
        }

        while (panel.firstChild) {
            panel.removeChild(panel.firstChild);
        }
        return panel;
    }

    // append child and return reference to the son node
    betterAppendChild(father, son) {
        father.appendChild(son);
        return son;
    }

    // create an alement and init tags based on the "moreFlags" array contenente
    // moreFlags must be a key-value list
    betterCreateElement(type, moreFlags) {

        let el = document.createElement(type);

        if (!isNullOrUndefined(moreFlags)) {

            for (let i = 0; i < moreFlags.length; i++) {

                let keyname = moreFlags[i][0];
                let content = moreFlags[i][1];

                // special flag used to register an element to dynamic resizyng
                if(keyname == "$responsive"){
                  this.elementsRegisteredForDynamicResize.push(el);
                  el.setAttribute('responsive', content);
                }
                // standard flags
                else
                {
                  // you can init a flag with a '$call_' to call a function named as
                  // the rest of the string e.g: $call_foo will call foo() and init content with the
                  // returned value
                  if(content.substring(0,"$call_".length) == "$call_"){
                    try{
                      content = window[content.substring("$call_".length)]();
                    }catch(e){
                      content = "";
                    }
                  }

                  if (keyname != "onclick") {
                      el[keyname] = content;
                  } else {
                      el.setAttribute("onclick",content);
                  }
                }
            }
        }

        return el;
    }

    // resize an element
    resizeDynamicElement(target_element){

      let responsive_directive = target_element.getAttribute("responsive");
      let splitted_directions = responsive_directive.split(";");
      let processed_directions = [];

      for(let i = 0; i < splitted_directions.length;i++){

        // example of directive string:  x<700:toolbar_label_small  (variable<bound:class_name)

        let dir = splitted_directions[i].trim();

        let directive_splittes = dir.split(":");
        let boundary_section = directive_splittes[0];
        let boundary_class = directive_splittes[1];

        let boundary_section_elements = boundary_section.split("<");

        let bound = boundary_section_elements[1].toLowerCase();
        if(bound == "inf" || bound == "any"){
          bound = "100000";
        }

        try{
          let bound_as_int = +bound;
          let direction = {
            "variable" : boundary_section_elements[0].toLowerCase(),
            "bound": bound,
            "class": boundary_class
          };
          processed_directions.push(direction);
        }catch(e){
          console.error("Bad boundary set for element: " + dir);
        }
      }

      let width = window.innerWidth;
      let height = window.innerHeight;

      processed_directions.sort((a, b) => {
          return a["bound"] - b["bound"];
      });

      let x_was_set = false;
      let y_was_set = false;

      for(let i = 0; i < processed_directions.length;i++){

        let fresh_cycle = true;
        let processed_dir = processed_directions[i];

        let boundary_limit = processed_dir["bound"];
        let className = processed_dir["class"];

        // x not set and classname can fit
        if(fresh_cycle && !x_was_set && processed_dir["variable"] == "x" && width < boundary_limit){
          this.classNameSmartToggle(target_element, className, true);
          x_was_set = true;
          fresh_cycle = false;
        }
        // x is set already, all other x rules must be unset
        if(fresh_cycle && (x_was_set || width >= boundary_limit) && processed_dir["variable"] == "x"){
          this.classNameSmartToggle(target_element, className, false);
          fresh_cycle = false;
        }
        // y not set and classname can fit
        if(fresh_cycle && !y_was_set && processed_dir["variable"] == "y" && height < boundary_limit){
          this.classNameSmartToggle(target_element, className, true);
          y_was_set = true;
          fresh_cycle = false;
        }
        // y is set already, all other y rules must be unset
        if(fresh_cycle && (y_was_set || height >= boundary_limit) && processed_dir["variable"] == "y"){
          this.classNameSmartToggle(target_element, className, false);
          fresh_cycle = false;
        }
      }
    }


    // toggler for class name with explicit toggle setter flag
    classNameSmartToggle(element, class_label, toggle){

      let class_name_fullstring = element.className;
      let class_name_fulllist = class_name_fullstring.split(" ");

      // add it
      if(toggle){

        // (do noting if already present)
        if(class_name_fulllist.indexOf(class_label) != -1){
          return;
        }

        class_name_fulllist.push(class_label);
      }
      // remove it
      else{

        // (do nothing if already missing)
        if(class_name_fulllist.indexOf(class_label) == -1){
          return;
        }

        for(let i = 0; i < class_name_fulllist.length; i++){
          if(class_name_fulllist[i] == class_label){
            class_name_fulllist[i] = "";
          }
        }
      }

      let filtered = class_name_fulllist.filter(function (el) {
        return el != "";
      });

      element.className = filtered.join(" ");
    }


    // navigate to the requested page on this website
    setNavigation(pagerequest) {

        if (pagerequest != this.getUrlSection(1)) {
            let new_url = encodeURI(this.getUrlSection(0) + "#" + pagerequest);
            history.pushState(null, null, new_url);

            this.pageNavigate();
        }

        return ''; // chrome requires return value
    }

    // get logged Email
    loggedEmail(){
      return this.server.email;
    }



    // needed for any action to begin
    boot(){

        this.server.loadStoredCredentials();

        singletonAddEventListener(window, 'resize', pageHasResized, false);
        singletonAddEventListener(window, 'hashchange', pageHasChanged, false);

        if(lastInitedAppClient == null){
          this.injectStitchFrameworkCss();
        }

        this.pageNavigate();
        lastInitedAppClient = this;
    }

    /* exported functions from inner class */
    async confirmUser(){
      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.confirmUser(), "Il tuo account è stato confermato con successo.");
    }
    async resetPassword(password, password_2){

      if(isVoidString(password)){
        this.openAlertDialog("Il campo Password non può essere vuoto");
        return "error";
      }

      if(password != password_2){
        this.openAlertDialog("Le due password non coincidono.");
        return "error";
      }

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.resetPassword(password), "Password reimpostata con successo.");
    }
    async registerUser(email, password, password_2){

      if(isVoidString(email)){
        this.openAlertDialog("Il campo Email non può essere vuoto");
        return "error";
      }

      if(!validateEmail(email)){
        this.openAlertDialog("Il campo Email deve contenere un indirizzo email valido");
        return "error";
      }

      if(isVoidString(password)){
        this.openAlertDialog("Il campo Password non può essere vuoto");
        return "error";
      }

      if(password != password_2){
        this.openAlertDialog("Le due password non coincidono.");
        return "error";
      }

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.registerUser(email.toLowerCase(), password), "Abbiamo inviato una email di conferma al tuo indirizzo. Clicca nel link dell'email per completare la registrazione.");
    }
    async sendResetPasswordEmail(email){

      if(!isVoidString(this.server.email)){
        email = this.server.email;
      }

      if(isVoidString(email)){
        this.openAlertDialog("Il campo Email non può essere vuoto");
        return "error";
      }

      if(!validateEmail(email)){
        this.openAlertDialog("Il campo Email deve contenere un indirizzo email valido");
        return "error";
      }

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.sendResetPasswordEmail(email), "Abbiamo inviato una email di reset password al tuo indirizzo. Clicca nel link dell'email per completare il reset della password.");
    }
    async resendConfirmationEmail(email){

      if(isVoidString(email)){
        this.openAlertDialog("Il campo Email non può essere vuoto");
        return "error";
      }

      if(!validateEmail(email)){
        this.openAlertDialog("Il campo Email deve contenere un indirizzo email valido");
        return "error";
      }

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.resendConfirmationEmail(email), "Abbiamo reinviato una email di conferma al tuo indirizzo. Clicca nel link dell'email per completare la registrazione.");
    }

    // override the deleteRemoteModel feature by forcing for some moment
    // the sync of a specific field
    async deleteRemoteSpecificField(collection, model_name){
      let was = this.server.sync_models;
      this.server.sync_models = [model_name];

      // this calls uses the global SYNC_MODELS to know which models should go on backend
      let result = await deleteRemoteModel(collection);

      this.server.sync_models = was;

      return result;
    }

    // override the updateRemoteModel feature by forcing for some moment
    // the sync of a specific field
    async updateSpecificModel(collection, model_name){

      let was = this.server.sync_models;
      this.server.sync_models = [model_name];

      // this calls uses the global SYNC_MODELS to know which models should go on backend
      let result = await updateRemoteModel(collection);

      this.server.sync_models = was;

      return result;
    }

    // update all the remote models marked for sinkyng
    async updateRemoteModel(collection){
      return await this.server.patchInCollection(collection,this.server.getDataModel());
    }

    // delete all the remote models marked for sinkyng
    async deleteRemoteModel(collection){
      return await this.server.remove(collection,this.server.getDataModel());
    }

    // classic login
    async login(email, password){

      if(isVoidString(email)){
        this.openAlertDialog("Il campo Email non può essere vuoto");
        return "error";
      }

      if(!validateEmail(email)){
        this.openAlertDialog("Il campo Email deve contenere un indirizzo email valido");
        return "error";
      }

      if(isVoidString(password)){
        this.openAlertDialog("Il campo Password non può essere vuoto");
        return "error";
      }

      if(isVoidString(password)){
        this.openAlertDialog("Il campo Password non può essere vuoto");
        return "error";
      }

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.login(email.toLowerCase(), password), null);
    }
    async logout(){
      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.logout(), null);
    }
    async setDeveloperFlag(collection, mode){

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.setDeveloperFlag(collection, mode), null);
    }
    async patchSingleInCollection(collection, field){

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.patchSingleInCollection(collection, field), null);
    }
    async fetch(collection){

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.fetch(collection), null);
    }
    async patchInCollection(collection, data_list){

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.patchInCollection(collection, data_list), null);
    }
    async fullLoginFetchSequence(email, password, collection){

      this.toggleAPISpinner(true);
      return this.handleApiResult(await this.server.fullLoginFetchSequence(email, password, collection), null);
    }
}
