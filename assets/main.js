(function(){
  "use strict";
  var views={home:"view-home",services:"view-services",contact:"view-contact"};
  var titles={
    home:"Year Round Cleaning Solutions | Commercial Cleaning Kelowna & the Okanagan",
    services:"Services | Commercial Cleaning Kelowna | Year Round Cleaning Solutions",
    contact:"Contact | Request a Walkthrough | Year Round Cleaning Solutions"
  };
  function show(name){
    if(!views[name]) name="home";
    Object.keys(views).forEach(function(k){
      var el=document.getElementById(views[k]);
      if(el) el.classList.toggle("active",k===name);
    });
    document.querySelectorAll('nav.links a[data-nav]').forEach(function(a){
      var on=a.getAttribute("data-nav")===name;
      a.classList.toggle("active",on);
      if(on){a.setAttribute("aria-current","page");}else{a.removeAttribute("aria-current");}
    });
    document.title=titles[name]||titles.home;
    window.scrollTo(0,0);
    closeMenu();
  }
  function route(){
    var h=(location.hash||"#home").replace("#","").toLowerCase();
    if(h==="privacy"||h==="accessibility"){ show("home"); return; }
    show(h);
  }
  window.addEventListener("hashchange",route);
  var toggle=document.getElementById("menuToggle");
  var nav=document.getElementById("navlinks");
  function closeMenu(){ if(nav){nav.classList.remove("open");} if(toggle){toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");} }
  if(toggle){
    toggle.addEventListener("click",function(){
      var open=nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded",open?"true":"false");
      toggle.setAttribute("aria-label",open?"Close menu":"Open menu");
    });
  }
  var y=document.getElementById("year"); if(y){y.textContent=new Date().getFullYear();}
  var form=document.getElementById("quoteForm");
  if(form){
    var reqFields=["fullName","company","email","phone"];
    function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
    function setErr(id,on){
      var f=document.getElementById(id), e=document.getElementById("err-"+id);
      if(f){f.setAttribute("aria-invalid",on?"true":"false");}
      if(e){e.classList.toggle("show",on);}
    }
    form.addEventListener("submit",function(ev){
      ev.preventDefault();
      var ok=true,firstBad=null;
      reqFields.forEach(function(id){
        var f=document.getElementById(id);
        var bad=!f.value.trim()||(id==="email"&&!validEmail(f.value.trim()));
        setErr(id,bad);
        if(bad){ok=false; if(!firstBad)firstBad=f;}
      });
      if(!ok){ if(firstBad)firstBad.focus(); return; }
      var get=function(id){var el=document.getElementById(id);return el?el.value:"";};
      var sel=document.getElementById("services");
      var chosen=[];
      if(sel){for(var i=0;i<sel.options.length;i++){if(sel.options[i].selected)chosen.push(sel.options[i].text);}}
      var body=
        "Full name: "+get("fullName")+"\n"+
        "Company: "+get("company")+"\n"+
        "Email: "+get("email")+"\n"+
        "Phone: "+get("phone")+"\n"+
        "Facility address/city: "+get("facility")+"\n"+
        "Facility type: "+get("facilityType")+"\n"+
        "Services required: "+chosen.join(", ")+"\n"+
        "Preferred frequency: "+get("frequency")+"\n\n"+
        "Details:\n"+get("details")+"\n";
      var subject="Walkthrough request — "+(get("company")||get("fullName"));
      var mailto="mailto:info@yearroundcleaning.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
      document.getElementById("formSuccess").classList.add("show");
      document.getElementById("formSuccess").scrollIntoView({behavior:"smooth",block:"center"});
      window.location.href=mailto;
    });
  }
  route();
})();
