import { useState } from 'react';
import './App.css'
    


var numRecordings;
var page = 1;
var index = 0;

function GetExternal(){
    const [exlink, setExLink] = useState("");
    const [exText, setExText] = useState([]);   
    const[loaded,setLoaded] = useState(false);
    const url = "https://xeno-canto.org/api/2/recordings?query=cnt:canada+grp:1&page=";
    var tempLink;
    if(numRecordings == null){
        firstLoad();
    }
    function firstLoad(){
        fetch((url+page), {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(json => {
            numRecordings = json.numRecordings;    
            var recording = json.recordings[index];
            var tempText = JSON.stringify(recording.cnt);
                var tempArray = ["Country: " + tempText.substring(1,tempText.length-1)];
            tempText = JSON.stringify(recording.sex);
                tempArray.push("Sex: " + tempText.substring(1,tempText.length-1));
            tempText = JSON.stringify(recording.stage);
                tempArray.push("Maturity: " + tempText.substring(1,tempText.length-1));
            tempText = JSON.stringify(recording.lat);
                tempText = "(" + tempText.substring(1,tempText.length-1) + ", ";
                tempText +=JSON.stringify(recording.lng).substring(1);
                tempText = tempText.substring(0,tempText.length-1) + ")"
                tempArray.push("Coordinates: " + tempText);
            tempLink = JSON.stringify(recording.url);
            tempLink = tempLink.substring(1,tempLink.length-1);
                tempArray.push("https:" + tempLink);
            setExLink(tempLink + "/embed?simple=1");
            setExText(tempArray);
            setLoaded(true);   
        })
        .catch((error) => {
            console.log(error)
        });
    }

    function Previous(){
        if(page <=1 && index <=0){
            console.log("You are on the first item");
        }
        if (index > 0) {
            index-=1;
            CallAPI();
        } else if(page > 1){
            index=499;
            page-=1;
            CallAPI();
        }
    }

    function Next(){
        if((index+1+((page-1)*500)) >= numRecordings){ /*Makes sure it doesn't exceed number of recordings available*/
            console.log("You are on the last item");
            return;
        } 
        if(index < 499){ 
            index+=1;
            CallAPI();
        } else {
            index=0;
            page+=1;
            CallAPI();
        }
    }

    function CallAPI(){
        setLoaded(false);
        var newUrl = url+page;
        fetch(newUrl, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }})
        .then(response => response.json())
        .then(json => {
            var recording = json.recordings[index];
            var tempText = JSON.stringify(recording.cnt);
                var tempArray = ["Country: " + tempText.substring(1,tempText.length-1)];
            tempText = JSON.stringify(recording.sex);
                tempArray.push("Sex: " + tempText.substring(1,tempText.length-1));
            tempText = JSON.stringify(recording.stage);
                tempArray.push("Maturity: " + tempText.substring(1,tempText.length-1));
            tempText = JSON.stringify(recording.lat);
                tempText = "(" + tempText.substring(1,tempText.length-1) + ", ";
                tempText +=JSON.stringify(recording.lng).substring(1);
                tempText = tempText.substring(0,tempText.length-1) + ")"
                tempArray.push("Coordinates: " + tempText);
            tempLink = JSON.stringify(recording.url);
            tempLink = tempLink.substring(1,tempLink.length-1);
                tempArray.push("https:" + tempLink);
            setExLink(tempLink + "/embed?simple=1");
            setExText(tempArray);
            setLoaded(true);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(loaded)
        return <>
        <script>0</script>
        <div class="external">
            <div class="exInternal">
            <p class="sound"><iframe width="50%" src={exlink}></iframe></p>
            <p>{exText[0]}</p>
            <p>{exText[1]}</p>
            <p>{exText[2]}</p>
            <p>{exText[3]}</p>
            <p>More info: <a href={exText[4]} target="_blank">{exText[4]}</a></p>
            </div>
            
            <div id="button">
            <button onClick={Previous}>Previous</button>
            <button onClick={Next}>Next</button>
            </div>

        </div>
        </>
    else {
        return <>
        <div class="external">
            <div class="exInternal">
                <p>Loading.....</p>
            </div>
            <div id="button">
                <button id="prev">Previous</button>
                <button id="next">Next</button>
            </div>
        </div>
        </>
    }
}

export default GetExternal