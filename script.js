// kAI Automation Industries shared behaviour
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var phoneBody = document.getElementById('heroPhoneBody');
  if (phoneBody) {
    var messages = [
      {side:'in', text:'Hi! Do you have any openings for a fade this Saturday?'},
      {side:'out', text:'Yes, we have 10:30am and 2pm open on Saturday. Which works better?'},
      {side:'in', text:'2pm please'},
      {side:'out', text:'Booked ✓ 2pm Saturday with Xclusive Barber. You will get a reminder 1 hour before.'}
    ];
    var i = 0;
    function renderNext() {
      if (i === 0) phoneBody.innerHTML = '';
      if (i >= messages.length) {
        setTimeout(function(){ i = 0; renderNext(); }, 2400);
        return;
      }
      var typing = document.createElement('div');
      typing.className = 'typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      phoneBody.appendChild(typing);
      phoneBody.scrollTop = phoneBody.scrollHeight;
      setTimeout(function(){
        typing.remove();
        var msg = messages[i];
        var bubble = document.createElement('div');
        bubble.className = 'bubble ' + msg.side;
        bubble.textContent = msg.text;
        phoneBody.appendChild(bubble);
        phoneBody.scrollTop = phoneBody.scrollHeight;
        i++;
        setTimeout(renderNext, 1000);
      }, 700);
    }
    renderNext();
  }

  var widget = document.getElementById('kaiWidget');
  if (widget) {
    var btn = widget.querySelector('.kai-widget-btn');
    var body = widget.querySelector('.kai-widget-body');
    var chips = widget.querySelectorAll('.kai-chip');
    btn.addEventListener('click', function(){ widget.classList.toggle('is-open'); });

    var answers = {
      pricing:'AI automation starts from R2,000 setup with a monthly retainer from R399. Website setup starts from R2,500 with a monthly retainer from R299.',
      channels:'We build automation for WhatsApp, DMs, comments, story mentions, websites, bookings and ordering flows.',
      demo:'You can start by using the Get Started page and sending us your business details and what you want automated.',
      human:'You can use the Get Started page to send an enquiry to the kAI team.'
    };

    function addBubble(text, side){
      var b=document.createElement('div');
      b.className='bubble '+side;
      b.textContent=text;
      body.appendChild(b);
      body.scrollTop=body.scrollHeight;
    }

    function botReply(key,userText){
      addBubble(userText,'out');
      var typing=document.createElement('div');
      typing.className='typing';
      typing.innerHTML='<span></span><span></span><span></span>';
      body.appendChild(typing);
      body.scrollTop=body.scrollHeight;
      setTimeout(function(){
        typing.remove();
        addBubble(answers[key],'in');
      },650);
    }

    chips.forEach(function(chip){
      chip.addEventListener('click',function(){
        botReply(chip.dataset.key,chip.textContent);
      });
    });
  }
});