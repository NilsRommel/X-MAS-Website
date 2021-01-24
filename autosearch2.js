var minutes = 4,sekundes = 39;
function autocomplete(inp){
  inp.addEventListener("input", function(e){
    var input = this.value;
    console.log(input);
    var maxResult = 5;
    var key = #GoogleAPI;

    var arr = new Array();
    var duration = new Array();
    var ids = new Array();
    var a, b, i;
  //https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDCjKDf52rdWYMXjkUHKmgAJRGM3k4j_pk&type=video&q=
    $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&key="+ key +"&type=video&q="+ input + "&maxResults=" + maxResult,function(data){
      data.items.forEach(item => {
        arr.push(item.snippet.title);
        ids.push(item.id.videoId);
      });
      closeAllLists();
      if(!input){return false;}
      a = document.createElement("DIV");
      a.setAttribute("id", document.getElementById("myInput").id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      document.getElementById("myInput").parentNode.appendChild(a);
      for(var i=0;i < arr.length;i++){
          b = document.createElement("DIV");
          b.innerHTML = "<strong>"+arr[i]+"</strong>";
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.innerHTML += "<input type='hidden' value='" + ids[i] + "'>";

          b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                var Videoid = this.getElementsByTagName("input")[1].value;
                console.log(Videoid);
                $.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key="+key + "&type=video&id=" + Videoid,function(data){
                  data.items.forEach(item => {
                    duration.push(item.contentDetails.duration);
                    //var video = '<iframe width="500" height="315" src="https://www.youtube.com/watch?v=yXQViqx6GMY&list=PL1CF738CC894DBE27&index=2" frameborder="0" allowfullscreen></iframe>';
                    //document.getElementById("video").innerHTML = "<iframe src='https://www.youtube.com/watch?v=EAyo3_zJj5c'></iframe>";
                    if(duration[0][3] == "M"){
                      minutes = parseInt(duration[0].substring(2,3));
                      sekundes = parseInt(duration[0].substring(4,6));
                    }else {
                      minutes = parseInt(duration[0].substring(2,4));
                      sekundes = parseInt(duration[0].substring(5,7));
                    }

                  });

                });
                closeAllLists();
            });
          a.appendChild(b);
      }
    });
  });
}

function closeAllLists(){
  var x = document.getElementsByClassName("autocomplete-items");
  for(var i=0;i<x.length;i++){
    x[i].parentNode.removeChild(x[i]);
  }
}
autocomplete(document.getElementById("myInput"));
document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });


function myFunction() {
  setInterval(function(){
    //console.log(minutes);
    //console.log(sekundes);
    a = new Date();
    naechsteWeinachten = new Date(Jahr,11,24,0,0,0,0);
    const diffTime = Math.abs(a - naechsteWeinachten);
    const diffSekunden = Math.floor(diffTime/(1000));
    const diffMusik = Math.floor(diffSekunden/ (minutes*60+sekundes))
    const restlicheZeit = diffSekunden-diffMusik*(minutes*60+sekundes);
    b = a.getHours();
    c = a.getMinutes();
    d = a.getSeconds();
    if(d > 9 && c > 9){
      zeit = b+':'+c+':'+d;
    }else if(d > 9 && c > 9){
      zeit = b+':'+c+':0'+d;
    }else if (d <= 9 && c < 9) {
      zeit = b+':0'+c+':0'+d;
    }else if (d <= 9 && c > 9) {
      zeit = b+':0'+c+':'+d;
    }
    var myHeading = document.querySelector('h1');
    const minuten = Math.floor(restlicheZeit/60);
    const sekunden = restlicheZeit-minuten*60;
    if(sekunden > 9){
      myHeading.textContent = diffMusik + ' ' + minuten + ':' + sekunden;
    }else if(sekunden < 10){
      myHeading.textContent = diffMusik + ' ' + minuten + ':0' + sekunden;
    }

  }, 1000);
  }
  var myHeading = document.querySelector('h1');
  var AktuelleJahr = new Date();

  Jahr = AktuelleJahr.getFullYear();
  Monat = AktuelleJahr.getMonth()+1;
  Tag = AktuelleJahr.getDate();
  Stunden = AktuelleJahr.getHours();
  Minuten = AktuelleJahr.getMinutes();
  Sekunden = AktuelleJahr.getSeconds();

  if(Monat == 12 && Tag > 24){
    var jahr = Jahr+1;
  }else {
    var jahr = Jahr;
  }
  myFunction();
