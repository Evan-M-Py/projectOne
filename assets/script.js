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
    
    //Quote Generator function
    function quoteGen() {
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
    };
    
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
    
