function read_display_Quote() {
    //console.log("inside the function")

    //get into the right collection
    db.collection("quotes").doc("tuesday")
        .onSnapshot(tuesdayDoc => {
            console.log(tuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote
        })
    //.onSnapshot.....이거는 realtime임. 항상 listening to data. continuously read from DB. immediately apply ur change
    // => callback?

    //tuesdayDoc data 갖고와서 quote 키를 보여주라
}
read_display_Quote();




function insertName() {
    //console.log("heyhey inside the insertname")   //testing용이라 끝나고 지우셈ㅋㅋ 나빌은 alert..

    
    firebase.auth().onAuthStateChanged(user => { //얘가 uid를 접근 하게 해줌.. function(user){}
        // check if the user is logged in
        if (user) {
            console.log(user.uid); //why uid working..? how can we access loign user? line24 firebase.auth()~~ 때문임
            //let me to know who is the user that logged in to get the ~~

             //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid) // will go to the firestore and go to the doc of the user

            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name) // Jquery 방식
                //document.getElementByID.("name-goes-here").innerText=user_Name
            })

        }
    })

}
insertName();




function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code: "BBY01",
        name: "Deer Lake Park Trail", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Jesper loved here"
    });
    hikesRef.add({
        code: "YVR01",
        name: "Stanley Park Trail", //replace with your own city?
        city: "Vancouver",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Jesper goes here regularly"
    });
    hikesRef.add({
        code: "NV01",
        name: "Mount Seymoure Trail", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Elmo goes here regularly"
    });
}



//-----------------------------------------------
// Create a "max" number of hike document objects. similar to above 1
//-----------------------------------------------
// function writeHikeData() {
//     max = 21;
//     //define a variable for the collection you want to create in Firestore to populate data
//     var hikesRef = db.collection("hikes");
//     for (i = 1; i <= max; i++) {
//         hikesRef.add({ //add to database, autogen ID
//             code: "id" + i,
//             name: "hike" + i,
//             details: "Elmo says this hike is amazing!  You will love going on hike" + i
//         })
//    }
// }


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");