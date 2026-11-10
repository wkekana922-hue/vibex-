const pages=[...document.querySelectorAll('.page')];
function go(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
const msgBox=document.querySelector('#messages');
const saved=JSON.parse(localStorage.getItem('vibex_messages')||'[]');
function drawMessages(){msgBox.innerHTML='';saved.forEach(m=>{const d=document.createElement('div');d.className='msg';d.textContent=m;msgBox.append(d)});}
drawMessages();
document.querySelector('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#messageInput');const v=input.value.trim();if(!v)return;saved.push(v);localStorage.setItem('vibex_messages',JSON.stringify(saved));drawMessages();input.value='';});
let likes=0;document.querySelector('#likeBtn').addEventListener('click',()=>{likes++;document.querySelector('#likes').textContent=likes;});
const songs=['Demo track one','Demo track two','Demo track three'];let current=0,playing=false;
function setTrack(){document.querySelector('#trackName').textContent=songs[current];document.querySelector('#playBtn').textContent=playing?'Ⅱ Pause':'▶ Play';}
songs.forEach((s,i)=>{const b=document.createElement('button');b.textContent='♫  '+s;b.addEventListener('click',()=>{current=i;playing=true;setTrack()});document.querySelector('#tracks').append(b)});
document.querySelector('#playBtn').addEventListener('click',()=>{playing=!playing;setTrack()});
document.querySelector('#next').addEventListener('click',()=>{current=(current+1)%songs.length;setTrack()});
document.querySelector('#prev').addEventListener('click',()=>{current=(current+songs.length-1)%songs.length;setTrack()});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
