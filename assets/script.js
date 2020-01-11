//SUBMIT BUTTON FUNTIONALITY
    //needs to flip html pages
    //needs to save user info to local storage

    const subBtnEl = document.getElementById("submitBtn");

    $('#submitBtn').click(function(){
        let userNameEl = document.getElementById("userName").value;
        let userAstroEl = document.getElementById("userAstro").value;
        let musicChoiceEl = document.getElementById("musicChoice").value;
        let userWeatherEl = document.getElementById("userWeather").value;
        let userNYTPrefEl = document.getElementById("userNews").value;
    
        let userInput = [ userNameEl, userAstroEl, musicChoiceEl, userWeatherEl, userNYTPrefEl ];
        let keyVal = ['name:', 'astro:', 'artist choice:', 'Weather Op', 'NYT Pref' ];
        
        for (let i = 0; i < userInput.length; i++) {
        localStorage.setItem(keyVal[i], userInput[i]);
        }
    
        quoteGen();
        astroFunction()
    });
    
  //random quote function
$(document).ready(function(){
    var quote;
    var author;

    function getNewQuote(){
        $.ajax({
            url:'http://api.forismatic.com/api/1.0/',
            jsonp: 'jsonp',
            dataType: 'jsonp',
            data: {
                method: 'getQuote',
                lang: 'en',
                format:'jsonp'
            },
            success: function(response){
                quote = response.quoteText;
                author = response.quoteAuthor;
                $('#quote').text(quote);
                if (author){
                    $('#author').text('-' + author);
                }
                else{
                    $('#author').text('-Anonymous');
                }
            }
        });
    }
    getNewQuote();
    $(".get-quote").on("click", function(event){
        event.preventDefault();
        getNewQuote();
    });
});
    
    //Astrological Function
    function astroFunction (){ 
       var userAstro = document.getElementById('userAstro');
       var astroVal = userAstro.value;
       console.log(astroVal);
    
       var today = new Date();
       var dd = String(today.getDate()).padStart(2, '0');
       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
       var yyyy = today.getFullYear();
       today = dd + '/' + mm + '/' + yyyy;
    
        $.ajax({
            type:'POST',
            url:'https://aztro.sameerkumar.website?sign=' + astroVal + '&day=today',
            success:function(data){
            console.log(data);
            }
             })};
    
    //Song Finder
let term = ''
const SongContainer = document.getElementById('songs')


const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    if (!term || term === '') {
        alert('You entered nothing!');
    } else {
        while(SongContainer.firstChild){
            SongContainer.removeChild(SongContainer.firstChild);
        }
        const url = `https://itunes.apple.com/search?limit=1&media=music&term=${term}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.results);
                const artists = data.results;
                return artists.map(result => {

                    const article = document.createElement('article'),
                        artist = document.createElement('p'),
                        song = document.createElement('p'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        audioSource = document.createElement('source');
                        
                
                        

                    artist.innerHTML = result.artistName
                    song.innerHTML = result.trackName
                    img.src = result.artworkUrl100
                    audioSource.src = result.previewUrl
                    audio.setAttribute('controls', '')
                
                    

                    article.appendChild(img)
                    article.appendChild(artist)
                    article.appendChild(song)
                    article.appendChild(audio)
                    audio.appendChild(audioSource)
                    SongContainer.appendChild(article)
                    
                  
                })
            })
            .catch(error => console.log('Request Failed: ', error))
    }
}

const searchBtn = document.getElementById('songSearch');
searchBtn.addEventListener('click', updateTerm);
document.addEventListener('play', event=>{
    const audio = document.getElementsByTagName('audio');
    for(let i = 0; i<audio.length; i++){
        if(audio[i] != event.target){
            audio[i].pause();
            console.log(event);
        }
    }
}, true)