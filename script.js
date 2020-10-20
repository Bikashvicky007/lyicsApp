const musicContainer=document.getElementById("music-container"),playBtn=document.getElementById("play"),prevBtn=document.getElementById("prev"),nextBtn=document.getElementById("next"),audio=document.getElementById("audio"),progress=document.getElementById("progress"),progressContainer=document.getElementById("progress-container"),title=document.getElementById("title"),cover=document.getElementById("cover"),loading=document.querySelector(".loader"),songs=["Ed Sheeran - Perfect","Ed Sheeran - Shape of You","Ed Sheeran - Thinking Out Loud","Maroon 5 - Memories","Ed Sheeran - Photograph"];let songIndex=2;function loadSong(e){title.innerText=e,audio.src=`music/${e}.mp3`,cover.src=`images/${e}.jpg`}function playSong(){musicContainer.classList.add("play"),playBtn.querySelector("i.fas").classList.remove("fa-play"),playBtn.querySelector("i.fas").classList.add("fa-pause"),audio.play()}function pauseSong(){musicContainer.classList.remove("play"),playBtn.querySelector("i.fas").classList.add("fa-play"),playBtn.querySelector("i.fas").classList.remove("fa-pause"),audio.pause()}function prevSong(){--songIndex<0&&(songIndex=songs.length-1),loadSong(songs[songIndex]),playSong()}function nextSong(){++songIndex>songs.length-1&&(songIndex=0),loadSong(songs[songIndex]),playSong()}function updateProgress(e){const{duration:t,currentTime:n}=e.srcElement,a=n/t*100;progress.style.width=`${a}%`}function setProgress(e){const t=this.clientWidth,n=e.offsetX,a=audio.duration;audio.currentTime=n/t*a}loadSong(songs[songIndex]),playBtn.addEventListener("click",()=>{musicContainer.classList.contains("play")?pauseSong():playSong()}),prevBtn.addEventListener("click",prevSong),nextBtn.addEventListener("click",nextSong),audio.addEventListener("timeupdate",updateProgress),progressContainer.addEventListener("click",setProgress),audio.addEventListener("ended",nextSong);const cardsContainer=document.getElementById("cards-container"),prevBtnCard=document.getElementById("prevCard"),nextBtnCard=document.getElementById("nextCard"),currentEl=document.getElementById("current"),showBtn=document.getElementById("show"),hideBtn=document.getElementById("hide"),questionEl=document.getElementById("question"),answerEl=document.getElementById("answer"),addCardBtn=document.getElementById("add-card"),clearBtn=document.getElementById("clear"),addContainer=document.getElementById("add-container");let curreentActiveCard=0;const cardsEl=[],cardsData=getCardsData();function createCards(){cardsData.forEach((e,t)=>createCard(e,t))}function createCard(e,t){const n=document.createElement("div");n.classList.add("card"),console.log(t),0===t&&n.classList.add("active"),n.innerHTML=`\n        <div class="inner-card">\n          <div class="inner-card-front">\n            <p>\n              ${e.question}\n            </p>\n          </div>\n          <div class="inner-card-back">\n            <p>\n              ${e.answer}\n            </p>\n          </div>\n        </div>\n    `,n.addEventListener("click",()=>n.classList.toggle("show-answer")),cardsEl.push(n),cardsContainer.appendChild(n),updateCurrentText()}function updateCurrentText(){currentEl.innerText=`${curreentActiveCard+1} / ${cardsEl.length}`}function getCardsData(){const e=JSON.parse(localStorage.getItem("cards"));return null===e?[]:e}function setCardsData(e){localStorage.setItem("cards",JSON.stringify(e)),window.location.reload}createCards(),nextBtnCard.addEventListener("click",()=>{cardsEl[curreentActiveCard].className="card left",(curreentActiveCard+=1)>cardsEl.length-1&&(curreentActiveCard=cardsEl.length-1),cardsEl[curreentActiveCard].className="card active",updateCurrentText()}),prevBtnCard.addEventListener("click",()=>{cardsEl[curreentActiveCard].className="card right",(curreentActiveCard-=1)<0&&(curreentActiveCard=0),cardsEl[curreentActiveCard].className="card active",updateCurrentText()}),showBtn.addEventListener("click",()=>{addContainer.classList.add("show"),window.scrollTo(0,0)}),hideBtn.addEventListener("click",()=>addContainer.classList.remove("show")),addCardBtn.addEventListener("click",()=>{const e=questionEl.value.trim(),t=answerEl.value.trim();if(e&&t){const n={question:e,answer:t};0===cardsData.length?createCard(n,0):createCard(n),questionEl.value="",answerEl.value="",addContainer.classList.remove("show"),cardsData.push(n),setCardsData(cardsData)}}),clearBtn.addEventListener("click",()=>{localStorage.clear(),cardsContainer.innerHTML="",window.location.reload()}),console.log(cardsData.length);const SearchForm=document.getElementById("form"),search=document.getElementById("search"),result=document.getElementById("result"),more=document.getElementById("more"),apiURL="https://api.lyrics.ovh";async function searchSongs(e){const t=await fetch(`${apiURL}/suggest/${e}`);showData(await t.json())}function showData(e){result.innerHTML=`\n    <ul class="songs">\n      ${e.data.map(e=>`<li>\n      <span><strong>${e.artist.name}</strong> - ${e.title}</span>\n      <button class="btn" data-artist="${e.artist.name}" data-songtitle="${e.title}">Add Lyrics</button>\n    </li>`).join("")}\n    </ul>\n  `,e.prev||e.next?more.innerHTML=`\n      ${e.prev?`<button class="btn" onclick="getMoreSongs('${e.prev}')">Prev</button>`:""}\n      ${e.next?`<button class="btn" onclick="getMoreSongs('${e.next}')">Next</button>`:""}\n    `:more.innerHTML=""}async function getMoreSongs(e){const t=await fetch(`https://cors-anywhere.herokuapp.com/${e}`);showData(await t.json())}async function getLyrics(e,t){const n=await fetch(`${apiURL}/v1/${e}/${t}`),a=await n.json();if(a.error)result.innerHTML=a.error;else{const n=a.lyrics.replace(/(\r\n|\r|\n)/g,"<br>"),r=`<h2><stong>${e}</strong>- ${t}</h2>`,s=n;if(n){const e={question:r,answer:s};0===cardsData.length?createCard(e,0):createCard(e),questionEl.value="",answerEl.value="",addContainer.classList.remove("show"),cardsData.push(e),setCardsData(cardsData)}else result.innerHTML="<h2>Sorry we dont have lyrics for this song...</h2>"}more.innerHTML=""}function showLoading(e){console.log(loading),loading.classList.add("show"),setTimeout(()=>{loading.classList.remove("show"),setTimeout(()=>{searchSongs(e)},300)},1e3)}SearchForm.addEventListener("submit",e=>{document.querySelector(".song-lists").scrollIntoView(),e.preventDefault();const t=search.value.trim();t?showLoading(t):alert("Please type in a search term")}),result.addEventListener("click",e=>{const t=e.target;if("BUTTON"===t.tagName){getLyrics(t.getAttribute("data-artist"),t.getAttribute("data-songtitle"))}});