  

    var Pages_Details=[];
    var API_KEY_Value='';
    var API_SECRET='';
    var APP_NAME='';
    var Token_var='';
    var name='';

var Analyzer = function(API_Secret,API_KEY,Appname,Token){
        var files=[];
       if(Token != null){
         Token_var=Token;
       }
        name=Appname;

      var isChrome = !!window.chrome && !!window.chrome.webstore;
      if(isChrome){
        var data_resources=window.performance.getEntriesByType("resource");  
      }
      else{
       var data_resources=performance.getEntriesByType("resource"); 
      }
      
       for (var i = 0; i < data_resources.length; i++)
           {


              if (data_resources[i].initiatorType == "img" || data_resources[i].initiatorType == "css")
              {
                var valueTime=data_resources[i].responseEnd - data_resources[i].responseStart;
                 var tempobj={
                  componentName:data_resources[i].name.split("/").pop(),
                  loadTime:valueTime
                 };
                 files.push(tempobj);
                 
                 
              }
             if (data_resources[i].initiatorType == "script")
              {
                var valueTime=data_resources[i].responseEnd - data_resources[i].responseStart;
                 var tempobj={
                  componentName:data_resources[i].name.split("/").pop(),
                  loadTime:valueTime
                 };
                 files.push(tempobj);
                 
              }
             if (data_resources[i].initiatorType == "link")
              {
                 var valueTime=data_resources[i].responseEnd - data_resources[i].responseStart;
                 var tempobj={
                  componentName:data_resources[i].name.split("/").pop(),
                  loadTime:valueTime
                 };
                 files.push(tempobj);
                 
                 
              }
           }
          API_KEY_Value = API_KEY;
          API_SECRET_Value = API_Secret;
          APP_NAME = Appname;
         this.files=files;


}

























var DecoratedDetails = function(app,EachPage) {

 
    
    console.log(app);
    if(EachPage){
            var pageData={};
            var perfData = window.performance.timing;
            pageData.pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            pageData.connectTime = perfData.responseEnd - perfData.requestStart;
            pageData.renderTime = perfData.domComplete - perfData.domLoading;
            var pageName=window.location.pathname.split("/").pop();
            if(pageName == ''){
              pageName='/';
            }
            var Tempobj={
              "pageName" : pageName,
              "pageLoadTime": pageData.pageLoadTime,
              "pageConnectTime":pageData.connectTime,
              "pageRenderTime":pageData.renderTime,
              "timeStamp":Date.now()
            };
            

               $.ajax({
                  url: "https://cryptic-garden-92681.herokuapp.com/component-load-time", 
                  type: "POST",
                  headers: { 
                  "API_SECRET" : API_SECRET_Value,
                  "API_KEY" : API_KEY_Value,
                  "appName" : APP_NAME,
                  'X-Content-Type-Options': 'nosniff'
                  },
                  contentType: "application/json",
                  data: JSON.stringify(app.files),
                  success: function( data ) { 
                      console.log("success");
                  },
                  error: function(err){
                    console.log(err);
                  }
              });     

               $.ajax({
                  url: "https://cryptic-garden-92681.herokuapp.com/page-details", 
                  type: "POST",
                  headers: { 
                  "API_SECRET" : API_SECRET_Value,
                  "API_KEY" : API_KEY_Value,
                  "appName" : APP_NAME,
                  'X-Content-Type-Options': 'nosniff'
                  },
                  contentType: "application/json",
                  data: JSON.stringify(Tempobj),
                  success: function( data ) { 
                      console.log("success");
                  },
                  error: function(err){
                    console.log(err);
                  }
              });  

   
    }


}

  $(".Analyzer").click(function() {

    var event_Data="";
    if($(this).val()){
        event_Data=$(this).val();
    
    }
    else if($(this).text()){
        event_Data=$(this).text();
    }

    BTN_eventSender(event_Data);
});




var BTN_eventSender=function(name){
  var event_Data='';
  event_Data=name;
       $.ajax({
        url: "https://cryptic-garden-92681.herokuapp.com/button-clicks", 
        type: "POST",
        headers: { 
        "API_SECRET" : API_SECRET_Value,
        "API_KEY" : API_KEY_Value,
        "appName" : APP_NAME,
        'X-Content-Type-Options': 'nosniff',
        },
        contentType: "application/json",          
        data: JSON.stringify({"event" : event_Data,"timeStamp" : Date.now()}),
        success: function( data ) { 
            console.log(data);
        },
        error: function(err){
          console.log(err);
        }
    }); 
}



