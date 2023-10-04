// Add an event listener to hide the message when the page loads
window.addEventListener('load', function () {
    const phonenotfound = document.getElementById('phonenotfound');
    phonenotfound.classList.add('d-none');
});

const phoneloader = async(searchtext,datalimit) => {
   

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchtext}`;

    const res= await fetch(url);
    const data= await res.json();
    displayphone(data.data,datalimit);

}
const displayphone=(phone,datalimit) =>{
    const phonecontainer= document.getElementById('phonecontainer');
    phonecontainer.innerText='';
    // this to show how muc object  want to display 
    // phone=phone.slice(0,15);
    const showall=document.getElementById('showall');

    if(datalimit && phone.length >10){
        phone=phone.slice(0,10);
        showall.classList.remove('d-none');
    }
    else{
        showall.classList.add('d-none');
    }

    const phonenotfound=document.getElementById('phonenotfound');
    if(phone.length === 0)
    {
        
        phonenotfound.classList.remove('d-none');
    }
    else{
       
        phonenotfound.classList.add('d-none')
    }

    
    phone.forEach(phonesingle => {
        console.log(phonesingle);
        const phonediv=document.createElement('div');
        phonediv.classList.add('col');
        phonediv.innerHTML=`
        
       
        <div class="card p-5">
        <img src="${phonesingle.image}" class="card-img-top img-fluid" alt="..." style="width:60%;>
        <div class="card-body">
            <h5 class="card-title">${phonesingle.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button type="button" onclick="loadphonedetails('${phonesingle.slug}')" href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phonemodal" >show details</button>
        </div>
    </div>

     



        `;
        phonecontainer.appendChild(phonediv);        
    });
    // adding the d-none option
    spniloader(false);
    

}

const loadprocess =(datalimit) => {

      // removing the display none option
      spniloader(true);
      const searchField= document.getElementById('search-field');
      const searchtext=searchField.value;
      // phoneloader(searchtext);
      if (searchtext !== '') {
          phoneloader(searchtext,datalimit);
      }
  
}


document.getElementById('search-button').addEventListener('click',function(){
   
    loadprocess(10);

      
})

document.getElementById('search-field').addEventListener('keydown', event => {
    console.log(event.key);
    if (event.key === 'Enter') {
        loadprocess(10);
      
    }
  });
  

document.getElementById('button-show-all').addEventListener('click',function(){
    loadprocess();
})
const loadphonedetails=async id =>{
   const  url=`https://openapi.programming-hero.com/api/phone/${id}`;
   const res = await fetch(url);
   const data = await res.json();
   displayPhoneDetails(data.data);
    

}
const displayPhoneDetails= phone =>{
    console.log(phone);
    const modaltitle= document.getElementById('phonemodalLabel');
    modaltitle.innerText=phone.name;
    const modalbody=document.getElementById('phone-details');
    const sensorsList = phone.mainFeatures.sensors.map(sensor => `<li>${sensor}</li>`).join('');
    modalbody.innerHTML=`
    <img src="${phone.image}" alt="">
    <p>ReleaseDate : ${phone.releaseDate}</p>
    <p>chipset : ${phone.mainFeatures.chipSet}</p>
    <p>Displaysize : ${phone.mainFeatures.displaySize}</p>
    <p>Chipset : ${phone.mainFeatures.memory}</p>
   
    <p>Sensors:</p>
        <ul>${sensorsList}</ul>
    
    `;
   
}

// mainFeatures
// : 
// chipSet
// : 
// "Kirin 9000 (5 nm)"
// displaySize
// : 
// "6.76 inches, 115.7 cm2 (~94.1% screen-to-body ratio)"
// memory
// : 
// "128GB 8GB RAM, 256GB 8GB RAM, 512GB 8GB RAM"
// sensors
// : 
// Array(9)
// 0
// : 
// "Face ID"
// 1
// : 
// "fingerprint (under display"
// 2
// : 
// "optical)"
// 3
// : 
// "accelerometer"
// 4
// : 
// "gyro"
// 5
// : 
// "proximity"
// 6
// : 
// "barometer"
// 7
// : 
// "compass"
// 8
// : 
// "color spectrum"


const spniloader = loader =>{
    const loadersection=document.getElementById('spninnerloader');
    if(loader)
    {
        loadersection.classList.remove('d-none');

    }
    else{
        loadersection.classList.add('d-none');

    }
}

// phoneloader();