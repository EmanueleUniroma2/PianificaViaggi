// DB DRIVER
var DB_NAME = "guitar_online_user_data";
var COLLECTION = "user_data";
var COLLECTION_FOR_REQUESTS = "user_requests";

var APP_NAME = "pianificaeviaggia-ljhog";
var EMAIL = "";
var PASSWORD = "";

// used to avoid multiple calls in parallel
var SERVING_REQUEST = false;
var PROMISE_TIMED_OUT = "__promise_did_timeout__";
var PROMISE_TIMED_OUT_DURATION = 5000;
var ALREADY_SERVING = "already serving a request";
var DISABLE_FETCH = false;

const client = stitch.Stitch.initializeDefaultAppClient(APP_NAME);
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db(DB_NAME);
const emailPasswordClient = client.auth.getProviderClient(stitch.UserPasswordAuthProviderClient.factory, "local-userpass");

try{

  var promiseTimeout = function(promise){

    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        SERVING_REQUEST = false;

        let name = promise.name;
        if(name != undefined){
          console.log("Timed out: " + name);
        }
        resolve(PROMISE_TIMED_OUT);
      }, PROMISE_TIMED_OUT_DURATION);
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
      promise,
      timeout
    ]);
  };

  function getUrlParams(){

    //var my_url_var = window.location.href;
    let my_url_var = (window.location != window.parent.location)
                ? document.referrer
                : document.location.href;

    let params_list = my_url_var.split("?");

    let final = {};

    if(params_list.length > 0){

      let params_parsed = params_list[1].split("&");

      for(let i = 0; i < params_parsed.length; i++){
        let p_couple = params_parsed[i].split("=");
        final[p_couple[0]] = p_couple[1];
      }
    }

    return final;
  }

  async function confirmUser(){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let params = getUrlParams();
    let token = params["token"];
    let tokenId = params["tokenId"];

    let res = null;

    try{
      let res = await promiseTimeout(emailPasswordClient.confirmUser(token, tokenId));
    }
    catch(e){
      res = e;
      console.error("db.confirmUser", e);
    }

    SERVING_REQUEST = false;

    return res;
  }

  async function registerUser(email, password){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let res = null;

    try{
      let res = await promiseTimeout(emailPasswordClient.registerWithEmail(email.toLowerCase(), password));
    }
    catch(e){
      res = e;
      console.error("db.registerUser", e);
    }

    SERVING_REQUEST = false;

    return res;
  }

  async function sendResetPasswordEmail(email){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let res = null;

    try{
      let res = await promiseTimeout(emailPasswordClient.sendResetPasswordEmail(email.toLowerCase()));
    }
    catch(e){
      res = e;
      console.error("db.sendResetPasswordEmail", e);
    }

    SERVING_REQUEST = false;

    return res;
  }

  async function resendConfirmationEmail(email){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let res = null;

    try{
      let res = await promiseTimeout(emailPasswordClient.resendConfirmationEmail(email.toLowerCase()));
    }
    catch(e){
      res = e;
      console.error("db.resendConfirmationEmail", e);
    }

    SERVING_REQUEST = false;

    return res;
  }

  async function resetPassword(newPassword){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let params = getUrlParams();
    let token = params["token"];
    let tokenId = params["tokenId"];

    let res = null;

    try{
      res = await promiseTimeout(emailPasswordClient.resetPassword(token, tokenId, newPassword));
    }
    catch(e){
      res = e;
      console.error("db.resetPassword", e);
    }

    SERVING_REQUEST = false;

    return res;
  }

  function storeCredentials(email, password){
      localStorage.setItem("__stitch.creds", JSON.stringify({email: email.toLowerCase(), password: password}));
      EMAIL = email;
      PASSWORD = password;
  }

  function killCache(){

    client.auth.user = undefined;

    Object.keys(localStorage).forEach(function(key){
      if(key.substring(0,"__stitch".length) == "__stitch"){
        localStorage.removeItem(key);
      }
    });

    EMAIL = "";
    PASSWORD = "";
  }

  async function logout(){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let error = null;

    if(isAuthenticated()){
      try{
        await promiseTimeout(client.auth.logout());
      }
      catch(e){
        error = e;
        console.error("db.logout", e);
      }
    }

    killCache();

    SERVING_REQUEST = false;

    return error;
  }

  async function login(email, password){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    console.info("Login for : " + email);

    let res = null;

    try{
      await client.auth.loginWithCredential(new stitch.UserPasswordCredential(email.toLowerCase(), password));
      storeCredentials(email.toLowerCase(), password);
      console.info("Success.");
    }
    catch(e){
      res = e;
      console.error("db.login", e);
    }

    SERVING_REQUEST = false;

    return res;
  }

  async function setDeveloperFlag(mode){

      if(SERVING_REQUEST){return ALREADY_SERVING;}
      SERVING_REQUEST = true;

      let result = null;

      if(!isAuthenticated()){
        console.error("db.setDeveloper", "user is not authenticated.");
      }else{
        console.info("Setting developer flag to: " + mode);

        try{
          result = await promiseTimeout(db.collection(COLLECTION).updateOne({user_id: client.auth.user.id} , {$set:{is_developer: mode}}, {upsert:true}));
        }
        catch(e){
          result = e;
          console.error("db.setDeveloper", e);
        }
      }

      SERVING_REQUEST = false;

      return result;
  }

  async function listRegisteredUsers(){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    if(!isAuthenticated()){
      console.error("db.listRegisteredUsers", "user is not authenticated.");
    }else{
      try{
        result = await promiseTimeout(db.collection(COLLECTION).find({},{email:1, _id:0}).asArray());
      }
      catch(e){
        result = e;
        console.error("db.listRegisteredUsers", e);
      }
    }

    SERVING_REQUEST = false;

    return result;
  }

  async function updateUserRequestStatus(request_list){
    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    if(!isAuthenticated()){
      console.error("db.updateUserRequestStatus", "user is not authenticated.");
    }else{
      console.info("Tryng updateUserRequestStatus.");
      try{
        result = await promiseTimeout(db.collection(COLLECTION_FOR_REQUESTS).updateOne({user_id: client.auth.user.id} , {$set:{request: request_list}}, {upsert:true}));
        console.info("Done.");
      }
      catch(e){
        result = e;
        console.error("db.updateUserRequestStatus", e);
      }
    }

    SERVING_REQUEST = false;

    return result;
  }

  async function getAllRequests() {

    if(!IS_DEVELOPER){
      return [];
    }

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    if(!isAuthenticated()){
      console.error("db.getAllRequests", "user is not authenticated.");
    }else{
      console.info("Tryng getAllRequests.");
      try{
        result = await promiseTimeout(db.collection(COLLECTION_FOR_REQUESTS).find().asArray());
        console.info("Done.");
      }
      catch(e){
        result = e;
        console.error("db.getAllRequests", e);
      }
    }

    SERVING_REQUEST = false;

    return result;
  }

  async function publish(data, type){


    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    let object = {};
    object["data"] = data;
    object["type"] = type;
    object["status"] = "unresolved";

    if(!isAuthenticated()){
      console.error("db.publish", "user is not authenticated.");
    }else{
      console.info("Tryng publish.");
      try{
        result = await promiseTimeout(db.collection(COLLECTION_FOR_REQUESTS).find({user_id: client.auth.user.id}, { limit: 1}).asArray());

        // user has no data
        if(result.length == 0){
          console.info("Requests collection for user is not ready. Initing it.");
          result = await promiseTimeout(db.collection(COLLECTION_FOR_REQUESTS).updateOne({user_id: client.auth.user.id} , {$set:{user_id: client.auth.user.id, email: EMAIL, request: [object]}}, {upsert:true}));
        }else{
          let corrected_request = result[0]["request"];
          corrected_request.push(object);
          result = await promiseTimeout(db.collection(COLLECTION_FOR_REQUESTS).updateOne({user_id: client.auth.user.id} , {$set:{user_id: client.auth.user.id, email: EMAIL, request: corrected_request}}, {upsert:true}));
        }

        console.info("Done.");
      }
      catch(e){
        result = e;
        console.error("db.publish", e);
      }
    }

    SERVING_REQUEST = false;

    return result;
  }

  function getFirstTimeModel(){

    let model = getDataModel();
    model.push(["email", EMAIL]);
    model.push(["is_developer", false]);
    model.push(["user_id", client.auth.user.id]);

    return model;
  }

  async function fetch(){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    if(!isAuthenticated()){
      console.error("db.fetch", "user is not authenticated.");
    }else{
      console.info("Tryng fetch.");

      try{
        result = await promiseTimeout(db.collection(COLLECTION).find({user_id: client.auth.user.id}, { limit: 1}).asArray());
        console.info("Fetch done.");

        // user has no data
        if(result.length == 0){
          console.info("Fetch data is empty, filling first time user.");

          SERVING_REQUEST = false;
          await DB.patch(getFirstTimeModel());
          SERVING_REQUEST = true;

          showBreadCrumb("Il tuo account è stato inizializzato.");
          console.info("Done.");
        }
      }
      catch(e){
        result = e;
        console.error("db.fetch", e);
      }
    }

    SERVING_REQUEST = false;

    return result;
  }


    async function removeSingle(field){

      if(SERVING_REQUEST){return ALREADY_SERVING;}
      SERVING_REQUEST = true;

      let result = null;

      /*
        Should be something like
        {user_id: client.auth.user.id} ,
        {$set:{data:data}},
        {upsert:true}
      */
      let patch_arguments = { $unset:  field  };

      if(!isAuthenticated()){
        console.error("db.removeSingle", "user is not authenticated.");
      }else{
          console.info("Tryng removeSingle.", field);

          try{
            result = await promiseTimeout(db.collection(COLLECTION).updateOne({user_id: client.auth.user.id},patch_arguments,{upsert:true}));
            console.info("Done.");
          }
          catch(e){
            result = e;
            console.error("db.removeSingle", e);
          }
      }

      SERVING_REQUEST = false;

      return result;
    }


  async function remove(data_list){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    /*
      Should be something like
      {user_id: client.auth.user.id} ,
      {$set:{data:data}},
      {upsert:true}
    */
    let patch_arguments = { $unset: {} };

    for(let i = 0; i < data_list.length; i++){
      let el = data_list[i];
      patch_arguments["$unset"][el[0]] = el[1];
    }

    if(!isAuthenticated()){
      console.error("db.remove", "user is not authenticated.");
    }else{
        console.info("Tryng remove.", data_list);

        try{
          result = await promiseTimeout(db.collection(COLLECTION).updateOne({user_id: client.auth.user.id},patch_arguments,{upsert:true}));
          console.info("Done.");
        }
        catch(e){
          result = e;
          console.error("db.remove", e);
        }
    }

    SERVING_REQUEST = false;

    return result;
  }


    async function patchSingle(field){

      if(SERVING_REQUEST){return ALREADY_SERVING;}
      SERVING_REQUEST = true;

      let result = null;

      /*
        Should be something like
        {user_id: client.auth.user.id} ,
        {$set:{data:data}},
        {upsert:true}
      */
      let patch_arguments = { $set: field };

      if(!isAuthenticated()){
        console.error("db.patchSingle", "user is not authenticated.");
      }else{
          console.info("Tryng patchSingle.", field);

          try{
            result = await promiseTimeout(db.collection(COLLECTION).updateOne({user_id: client.auth.user.id},patch_arguments,{upsert:true}));
            console.info("Done.");
          }
          catch(e){
            result = e;
            console.error("db.patchSingle", e);
          }
      }


      SERVING_REQUEST = false;

      return result;
    }


  async function patch(data_list){

    if(SERVING_REQUEST){return ALREADY_SERVING;}
    SERVING_REQUEST = true;

    let result = null;

    /*
      Should be something like
      {user_id: client.auth.user.id} ,
      {$set:{data:data}},
      {upsert:true}
    */
    let patch_arguments = { $set: {} };

    for(let i = 0; i < data_list.length; i++){
      let el = data_list[i];
      patch_arguments["$set"][el[0]] = el[1];
    }

    if(!isAuthenticated()){
      console.error("db.patch", "user is not authenticated.");
    }else{
        console.info("Tryng patch.", data_list);

        try{
          result = await promiseTimeout(db.collection(COLLECTION).updateOne({user_id: client.auth.user.id},patch_arguments,{upsert:true}));
          console.info("Done.");
        }
        catch(e){
          result = e;
          console.error("db.patch", e);
        }
    }


    SERVING_REQUEST = false;

    return result;
  }

  function authenticatedId(){
    return client.auth.user.id;
  }

  function isAuthenticated(){
    try{
      return EMAIL.length > 0;
    }catch(e){
      return false;
    }
  }

  function getAuthenticatedEmail(){
    return EMAIL.toLowerCase();
  }

  function loadStoredCredentials(){

    let stored = localStorage.getItem("__stitch.creds");

    if(stored != null){
      let obj = JSON.parse(stored);
      EMAIL = obj.email;
      PASSWORD = obj.password;
      return true;
    }


    // be sure to have clean cache if __stitch.creds are missing
    killCache();

    return false;
  }


  async function fullLoginFetchSequence(){

    let obj = null;

    /* there are stored credentials */
    if(loadStoredCredentials()){

      set_loading_label_explicit("Accesso: " + EMAIL);
      let res = await promiseTimeout(DB.login(EMAIL, PASSWORD));

      if(res == null && !DISABLE_FETCH){
        set_loading_label_explicit("Sincronizzazione dati...");
        obj = await fetch();
      }else if(DISABLE_FETCH){
        console.info("Fetch is disabled.");
      }else{
        console.info("Login failed: " + (res.message || "unknown error"));
      }

      if(obj != null){
        obj = obj[0];
      }
    }else{
      console.info("There are no user creds stored. Cannot auto-login.");
    }

    return obj;
  }

  var DB = {
    setDeveloperFlag: setDeveloperFlag,
    isAuthenticated: isAuthenticated,
    sendResetPasswordEmail: sendResetPasswordEmail,
    resendConfirmationEmail: resendConfirmationEmail,
    fullLoginFetchSequence: fullLoginFetchSequence,
    registerUser: registerUser,
    confirmUser: confirmUser,
    resetPassword:resetPassword,
    getAuthenticatedEmail: getAuthenticatedEmail,
    getAllRequests: getAllRequests,
    login: login,
    logout: logout,
    fetch : fetch,
    patch : patch,
    listRegisteredUsers: listRegisteredUsers,
    publish: publish,
    updateUserRequestStatus: updateUserRequestStatus,
    remove: remove,
    removeSingle: removeSingle,
    patchSingle: patchSingle
  };

  function validateEmail(mail){
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
  }

  // ASYNC FUNCTIONS
  var updateRemoteModel = async function(){
    syncLabelNearToVersion();
    await DB.patch(getDataModel());
    syncLabelNearToVersion();
  }

  // ASYNC FUNCTIONS

  var deleteRemoteModel = async function(){
    syncLabelNearToVersion();
    await DB.remove(getDataModel());
    syncLabelNearToVersion();
  }


  var deleteRemoteSpecificField = async function(field){
    syncLabelNearToVersion();
    await DB.removeSingle(field);
    syncLabelNearToVersion();
  }


  var updateDeveloperFlag = async function(field){
    syncLabelNearToVersion();
    await DB.setDeveloperFlag(field);
    syncLabelNearToVersion();
  }

  var updateRemoteSpecificField = async function(field){
    syncLabelNearToVersion();
    await DB.patchSingle(field);
    syncLabelNearToVersion();
  }

  var updateRequestStatus= async function(request_list){
        toggleAPISpinner(true);

        let result = await promiseTimeout(DB.updateUserRequestStatus(request_list));

        toggleAPISpinner(false);

        showDeveloperUserRequestsHandlePage();

        /* error! */
        return handleApiResult(result, "La richiesta è stata segnata come risolta.");
  }

  var publishRequest = async function(request){

    toggleAPISpinner(true);

    let result = await promiseTimeout(DB.publish(request, "request"));

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Abbiamo inviato la tua segnalazione. Grazie per il tuo tempo.");
  }


  var initUserPage = async function(){

    let users = await promiseTimeout(DB.listRegisteredUsers());
    let result = await promiseTimeout(DB.getAllRequests());

    if(users == null || result == null){
      user = [];
      result = [];
    }

    try{
      loadRequests(users, result);
    }catch(e){

    }
  }

  var publishNewSong = async function(song){

    toggleAPISpinner(true);

    let result = await promiseTimeout(DB.publish(song, "song"));

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Lo spartito è stato inviato. Se supererà la revisione sarà aggiunto al sito.");
  }

  var fullSequenceLoadRemoteModel = async function(){

    console.info("Initial full fetching remote model.");
    let user_data = await DB.fullLoginFetchSequence();

    if(!isNullOrUndefined(user_data) && user_data != ALREADY_SERVING){
      bootRemoteModel(user_data);
    }else{
      user_data = user_data || "null";
      console.info("Initial full fetching failed. User data is: "+ (user_data.toString())+". (this is normal if user was not logged in)");
      killCache();
    }
  }

  var delayed_setup = async function(){

    if(!check_browsing_file_is_correct()){
      return;
    }

    /*inited async*/
    update_registry_keys();

    await promiseTimeout(fullSequenceLoadRemoteModel());

    set_loading_label_version();

    setTimeout(setup, SETUP_MOCK_DELAY);
  }

  var confirmEmail = async function(){

    toggleAPISpinner(true);

    let result = await DB.confirmUser();

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "La tua registrazione è stata completata con successo. Ora puoi eseguire il login.");
  }


  var resetPasswordEmail = async function(email){

    toggleAPISpinner(true);

    let result = await DB.sendResetPasswordEmail(email);

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Abbiamo inviato un email contenente il link per reimpostare la tua password.");

  }

  var performRegisterResend = async function(){

    let email = document.getElementById("email_resend").value;

    if(email.length == 0){
      openAlertDialog("Riempi tutti i campi prima di procedere.");
      return;
    }

    if(!validateEmail(email)){
      openAlertDialog("Inserisci un indirizzo email valido.");
      return;
    }

    toggleAPISpinner(true);

    let result = await DB.resendConfirmationEmail(email);

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Abbiamo inviato nuovamente un email per la verifica del tuo account.");

  }

  var performRegister = async function(){

    let email = document.getElementById("email_r").value;
    let password1 = document.getElementById("password_r_1").value;
    let password2 = document.getElementById("password_r_2").value;

    if(email.length == 0 || password1.length == 0 || password2.length == 0){
      openAlertDialog("Riempi tutti i campi prima di procedere.");
      return;
    }

    if(!validateEmail(email)){
      openAlertDialog("Inserisci un indirizzo email valido.");
      return;
    }

    if(password1 != password2){
      openAlertDialog("Le due password non coincidono.");
      return;
    }

    toggleAPISpinner(true);

    let result = await DB.registerUser(email, password1);

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Abbiamo inviato un email di conferma. Clicca sul link nell'email per completare la registrazione.");
  }


  var performLogout = async function(){

    toggleAPISpinner(true);

    let result = await DB.logout();

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Utente disconnesso.");
  }


  var performLogin = async function(){

    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;

    if(email.length == 0 || password.length == 0){
      openAlertDialog("Riempi tutti i campi prima di procedere.");
      return;
    }

    if(!validateEmail(email)){
      openAlertDialog("Inserisci un indirizzo email valido.");
      return;
    }

    toggleAPISpinner(true);

    let result = await promiseTimeout(DB.login(email, password));

    if(result == PROMISE_TIMED_OUT){
      showBreadCrumb("Il tentativo di login è scaduto.");
      result = { "message" : "silent" };
    }else{
      if(result == null){
        await loadRemoteModel();
      }
    }

    toggleAPISpinner(false);

    /* error! */
    return handleApiResult(result, "Login avvenuto con successo.");
  }

  var loadRemoteModel = async function(){

    if(DISABLE_FETCH){
      console.info("Fetch is disabled.");
      return;
    }

    console.info("Login fetching remote model.");
    let user_data = await DB.fetch();

    if(!isNullOrUndefined(user_data) && user_data != ALREADY_SERVING){
      user_data = user_data[0];
      bootRemoteModel(user_data);
      console.info("Booted remote model after login.");
    }else{
      console.info("Could not boot after login, user data was: " + user_data.toString());
    }
  }

  var grabRemoteModel = async function (){

    let user_data = await DB.fetch();
    if(!isNullOrUndefined(user_data) && user_data != ALREADY_SERVING){
      user_data = user_data[0];
      bootRemoteModel(user_data);
      console.info("Booted remote model.");
    }
  }

  var performResetPassword = async function(){

      let password1 = document.getElementById("password_reset_1").value;
      let password2 = document.getElementById("password_reset_2").value;

      if(password1.length == 0 || password2.length == 0){
        openAlertDialog("Riempi tutti i campi prima di procedere.");
        return;
      }

      if(password1 != password2){
        openAlertDialog("Le due password non coincidono.");
        return;
      }

      toggleAPISpinner(true);

      let result = await DB.resetPassword(password1);

      if(result == null){
        result = await DB.logout();
      }

      toggleAPISpinner(false);

      /* error! */
      return handleApiResult(result, "La tua password è stata reimpostata.");
  }
}
catch(e){
  /*no issues, on IE we don't use it*/
  INTERNET_EXPLORER_COULD_NOT_PARSE_THIS = true;
  console.error(e);
}
