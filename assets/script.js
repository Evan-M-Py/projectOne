
$('#startButton').click(function(){
    $('#userWelcomeDiv').remove();
    $(userInputDiv).removeClass('invisible').addClass('visible').addClass('fade-in')
});



    const subBtnEl = document.getElementById("submitBtn");
    $('#submitBtn').click(function(){
        let userNameEl = document.getElementById("userName").value;
        let userAstroEl = document.getElementById("userAstro").value;
        let musicChoiceEl = document.getElementById("musicChoice").value;
        let userInput = [ userNameEl, userAstroEl, musicChoiceEl];
        let keyVal = ['name:', 'astro:', 'artistChoice:' ];
        
        for (let i = 0; i < userInput.length; i++) {
        localStorage.setItem(keyVal[i], userInput[i]);
        }
        $("#userInputDiv").hide();
        $('.hideFirst').removeClass('invisible').addClass('fade-in');
        $('#goodMornName').append(userNameEl)
    
        astroFunction()
        updateTerm();
        newYorkTimes()
        
    });
    
  //random quote function
  $(document).ready(function(){
    var quote;
    var author;

    function getNewQuote(){
        $.ajax({
            url:'https://api.forismatic.com/api/1.0/',
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
            url:'https://aztro.sameerkumar.website?sign=' + astroVal + '&day=today'}).then(function(text){
            console.log(text);
            let userMood = text.mood           
            $('#mood').append(userMood) 
           
            let userLuckyNum = text.lucky_number
            $('#luckyNumber').append(userLuckyNum)
            let userColor = text.color
            $('#color').append(userColor)
            let userCompat = text.compatibility
            $('#compatibility').append(userCompat)
          
            let userDescription = text.description
            $('#description').append(userDescription)
            }
             );}
//Song Finder
let term = ''

const SongContainer = document.getElementById('songs');


const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    if (!term || term === '') {
        songFinderTwo();
        
    } else {
        while(SongContainer.firstChild){
            SongContainer.removeChild(SongContainer.firstChild);
        }
        const url = `https://itunes.apple.com/search?limit=1&media=music&term=${term}`
        fetch(url,{
            mode:'no-cors'
        })
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

function songFinderTwo() {
    let termTwo = localStorage.getItem('artistChoice:');
    while(SongContainer.firstChild){
        SongContainer.removeChild(SongContainer.firstChild);
    }
    const url = `https://itunes.apple.com/search?limit=1&media=music&term=${termTwo}`
    fetch(url,{
        mode:'no-cors'
    }
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
})}

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

//New York Times Function

function newYorkTimes() {
    const queryURL = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M";

    // Creating an AJAX call for the specific city button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        let articleAbsOne = response.results[1].abstract;
        let articleAbsTwo = response.results[6].abstract;
        let articleAbsThree = response.results[12].abstract;
        let articleAbsFour = response.results[18].abstract;
        let articleAbsFive = response.results[24].abstract;
        let articleAbsSix = response.results[30].abstract;
        
        let articleTitleOne = response.results[1].title;
        let articleTitleTwo = response.results[6].title;
        let articleTitleThree = response.results[12].title;
        let articleTitleFour = response.results[18].title;
        let articleTitleFive = response.results[24].title;
        let articleTitleSix = response.results[30].title;
        
        let articleUrlOne = response.results[1].url;
        let articleUrlTwo = response.results[6].url;
        let articleUrlThree = response.results[12].url;
        let articleUrlFour = response.results[18].url;
        let articleUrlFive = response.results[24].url;
        let articleUrlSix = response.results[30].url;

        let articleTitleElOne = document.getElementById('dayOne');
        let articleTitleElTwo = document.getElementById('dayTwo');
        let articleTitleElThree = document.getElementById('dayThree');
        let articleTitleElFour = document.getElementById('dayFour');
        let articleTitleElFive = document.getElementById('dayFive');
        let articleTitleElSix = document.getElementById('daySix');
        
        let articleAbsElOne = document.getElementById('dayOneAbs');
        let articleAbsElTwo = document.getElementById('dayTwoAbs');
        let articleAbsElThree = document.getElementById('dayThreeAbs');
        let articleAbsElFour = document.getElementById('dayFourAbs');
        let articleAbsElFive = document.getElementById('dayFiveAbs');
        let articleAbsElSix = document.getElementById('daySixAbs');

        let articleButtonElOne = document.getElementById('dayOneButton')
        let articleButtonElTwo = document.getElementById('dayTwoButton')
        let articleButtonElThree = document.getElementById('dayThreeButton')
        let articleButtonElFour = document.getElementById('dayFourButton')
        let articleButtonElFive = document.getElementById('dayFiveButton')
        let articleButtonElSix = document.getElementById('daySixButton')
        

        let articleTitleArray = [articleTitleOne, articleTitleTwo, articleTitleThree, articleTitleFour, articleTitleFive, articleTitleSix]
        let articleTitleElArray = [articleTitleElOne, articleTitleElTwo, articleTitleElThree, articleTitleElFour, articleTitleElFive, articleTitleElSix]
        let articleAbsArray = [articleAbsOne, articleAbsTwo, articleAbsThree, articleAbsFour, articleAbsFive, articleAbsSix];
        let articleAbsElArray = [articleAbsElOne, articleAbsElTwo, articleAbsElThree, articleAbsElFour, articleAbsElFive, articleAbsElSix]
        let articleButtonArray = [articleButtonElOne, articleButtonElTwo, articleButtonElThree, articleButtonElFour, articleButtonElFive, articleButtonElSix]
        let articleUrlArray = [articleUrlOne, articleUrlTwo, articleUrlThree, articleUrlFour, articleUrlFive, articleUrlSix]

        for(let i = 0; i<articleAbsArray.length; i++){
            $(articleTitleElArray[i]).append(articleTitleArray[i]);
            $(articleAbsElArray[i]).append('"' + articleAbsArray[i] + '"');
            $(articleButtonArray[i]).attr('href', articleUrlArray[i]);
        }
    })}

$('#invisibleButton').click(function (){
    let musicOpVal = document.getElementById('musicOp').checked;
    let goalsOpVal = document.getElementById('goalsOp').checked;
    let newsOpVal = document.getElementById('newsOp').checked;
    let horoscopeOpVal = document.getElementById('horoscopeOp').checked;

    let musicCardEl = document.getElementById('musicCardContents')
    let goalCardEl = document.getElementById('goalCardContents')
    let newsCardEl = document.getElementById('nytCardContents')
    let horoscopeCardEl = document.getElementById('horoscopeCardContents')
    
    const checkboxValArray = [musicOpVal, goalsOpVal, newsOpVal, horoscopeOpVal]
    const cardContentsArray = [musicCardEl, goalCardEl, newsCardEl, horoscopeCardEl]
    
    for(let i = 0; i<cardContentsArray.length; i++){
        console.log(checkboxValArray[i], cardContentsArray[i])
    
        if (checkboxValArray[i] === true){
    $(cardContentsArray[i]).removeClass('visible').addClass('invisible')
    }
    if (checkboxValArray[i] === false){
        $(cardContentsArray[i]).removeClass('invisible').addClass('visible')    
    }
    
}});



