(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- NAV scroll state ---------- */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function(){
    if(window.scrollY > 20) nav.classList.add("scrolled"); else nav.classList.remove("scrolled");
  }, {passive:true});

  /* ---------- duplicate marquee for seamless loop ---------- */
  var marq = document.getElementById("marq");
  if(marq){ marq.innerHTML += marq.innerHTML; }

  /* ---------- Floating background particles ---------- */
  (function(){
    var host = document.getElementById("fxParticles");
    if(!host || reduce) return;
    var n = window.innerWidth < 680 ? 10 : 18;
    for(var i=0;i<n;i++){
      var p = document.createElement("i");
      var size = 4 + Math.random()*9;
      p.style.width = size+"px"; p.style.height = size+"px";
      p.style.left = (Math.random()*100)+"%";
      p.style.setProperty("--drift",(Math.random()*120-60)+"px");
      p.style.animationDuration = (14 + Math.random()*16)+"s";
      p.style.animationDelay = (-Math.random()*22)+"s";
      p.style.opacity = .4 + Math.random()*.5;
      host.appendChild(p);
    }
  })();

  /* ---------- Parallax (scroll + mouse) ---------- */
  (function(){
    if(reduce) return;
    var bg = document.getElementById("bgMesh");
    var items = [].slice.call(document.querySelectorAll("[data-parallax]"));
    var sy = 0, mx = 0, my = 0, tmx = 0, tmy = 0, ticking = false;

    function apply(){
      if(bg) bg.style.transform = "translate3d("+(tmx*22)+"px,"+(sy*0.14 + tmy*16)+"px,0)";
      items.forEach(function(el){
        var sp = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.transform = "translate3d(0,"+(sy*sp*-1)+"px,0)";
      });
      ticking = false;
    }
    function request(){ if(!ticking){ ticking = true; requestAnimationFrame(apply); } }

    window.addEventListener("scroll", function(){ sy = window.pageYOffset; request(); }, {passive:true});
    window.addEventListener("mousemove", function(e){
      mx = e.clientX/window.innerWidth - .5;
      my = e.clientY/window.innerHeight - .5;
    }, {passive:true});

    // smooth mouse easing loop
    (function ease(){
      tmx += (mx - tmx)*0.06; tmy += (my - tmy)*0.06;
      if(bg) bg.style.transform = "translate3d("+(tmx*22)+"px,"+(sy*0.14 + tmy*16)+"px,0)";
      requestAnimationFrame(ease);
    })();
    request();
  })();

  /* ---------- Reveal on scroll ---------- */
  var revs = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
    }, {threshold:.12});
    revs.forEach(function(r){ io.observe(r); });
  } else { revs.forEach(function(r){ r.classList.add("in"); }); }

  /* ---------- Animated counters ---------- */
  function animateCount(el){
    var target = parseInt(el.getAttribute("data-count"),10);
    var dur = 1600, start = null;
    function step(t){
      if(!start) start = t;
      var p = Math.min((t-start)/dur,1);
      var eased = 1 - Math.pow(1-p,3);
      el.textContent = Math.floor(eased*target).toLocaleString("en-IN");
      if(p<1) requestAnimationFrame(step); else el.textContent = target.toLocaleString("en-IN");
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if("IntersectionObserver" in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ animateCount(e.target); cio.unobserve(e.target);} });
    }, {threshold:.5});
    counters.forEach(function(c){ cio.observe(c); });
  } else { counters.forEach(function(c){ c.textContent = parseInt(c.getAttribute("data-count"),10).toLocaleString("en-IN"); }); }

  /* ---------- Card tilt + dashboard parallax ---------- */
  var dash = document.getElementById("dash");
  if(dash && !reduce){
    var tilts = dash.querySelectorAll("[data-tilt]");
    dash.addEventListener("mousemove", function(ev){
      var r = dash.getBoundingClientRect();
      var px = (ev.clientX - r.left)/r.width - .5;
      var py = (ev.clientY - r.top)/r.height - .5;
      tilts.forEach(function(c){
        c.style.transform = "rotateY("+(px*8)+"deg) rotateX("+(-py*8)+"deg) translateZ(18px)";
      });
    });
    dash.addEventListener("mouseleave", function(){
      tilts.forEach(function(c){ c.style.transform=""; });
    });
  }

  /* ---------- Form: validation + Formspree submit ---------- */
  var form = document.getElementById("applyForm");
  var success = document.getElementById("formSuccess");
  var btn = document.getElementById("submitBtn");
  var ENDPOINT = "https://formspree.io/f/mrevbwbo";

  function setInvalid(field, bad){
    var wrap = field.closest(".field");
    if(!wrap) return;
    wrap.classList.toggle("invalid", bad);
  }
  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function validPhone(v){ return /^[0-9+ ]{10,15}$/.test(v.trim()); }

  if(form){
    form.querySelectorAll("input,select,textarea").forEach(function(el){
      el.addEventListener("input", function(){ setInvalid(el,false); });
      el.addEventListener("change", function(){ setInvalid(el,false); });
    });

    form.addEventListener("submit", function(e){
      e.preventDefault();
      var ok = true;
      var name = form.querySelector("#name");
      var mobile = form.querySelector("#mobile");
      var email = form.querySelector("#email");
      var city = form.querySelector("#city");
      var qual = form.querySelector("#qual");

      if(!name.value.trim()){ setInvalid(name,true); ok=false; }
      if(!validPhone(mobile.value)){ setInvalid(mobile,true); ok=false; }
      if(!validEmail(email.value)){ setInvalid(email,true); ok=false; }
      if(!city.value){ setInvalid(city,true); ok=false; }
      if(!qual.value.trim()){ setInvalid(qual,true); ok=false; }

      if(!ok){
        var firstBad = form.querySelector(".invalid input,.invalid select");
        if(firstBad) firstBad.focus();
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span class="spin"></span> Submitting...';

      var data = new FormData(form);
      data.append("_subject", "New Vetri 108 Scholarship Application");

      fetch(ENDPOINT, {
        method:"POST",
        body:data,
        headers:{ "Accept":"application/json" }
      }).then(function(res){
        if(res.ok){
          form.style.display="none";
          success.style.display="block";
          success.scrollIntoView({behavior:"smooth", block:"center"});
        } else {
          return res.json().then(function(d){ throw new Error((d && d.error) || "Submission failed"); });
        }
      }).catch(function(err){
        btn.disabled=false;
        btn.innerHTML="Submit Application →";
        alert("Sorry, something went wrong submitting your application. Please call us at +91 96550 79784 or try again.");
        console.error(err);
      });
    });
  }
})();
