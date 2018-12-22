$(document).ready(
    function () {        
        saveHelper.loadDate(); // завантажуємо тваринок з localStorage

        saveHelper.addPet(); // додаємо обробник на клік
    }
);

var saveHelper = {
    counterKey: "counter",
    storageKey: "item-",

    loadDate: function () {
        var counter = Number(window.localStorage.getItem(this.counterKey));

        console.log(counter); // F12
 
        if (counter > 0)
        {
            // проходимось по збережених тваринках
            for (var i=0 ; i <= counter; i++)
            {
                var key = saveHelper.storageKey+(i+1);
                var item = localStorage.getItem(key);

                console.log(item);

                if (item === undefined) {
                   return;
                }
         
                var template =  `<figure class="profile">
                    <img class="profile-img" src="{file}" alt="тварина">
                    <figcaption class="profile-caption">
                        <h5 class="profile-heading">{name} </h5>
                        <p class="profile-txt">
                            Порода- {breed}. 
                            Вік- {age} років. 
                            Контактна персона - {petOwnerName}. 
                            {description}
                        </p>
                    </figcaption>
                </figure>`;
         
                var parsed = item.split("&");
            
                for (var b = 0; b < parsed.length; b++)
                {
                    //name=Том
                    var splitted = parsed[b].split("="); // [name, Том]
                    
            
                    // {name} => Том
                    template = template.replace("{"+splitted[0].trim()+"}", splitted[1]);
            
                }        
            
                $("#container").append($(template));          
            }          
        }
    },

    addPet: function () {
        $(".btn-accent").click(function () {
            console.log("onClick");
            var formIsValid = $(".new-profile-form").valid();
            
            if (formIsValid)
            {
                var file = document
                    .querySelector('.new-profile-form input[type="file"]')
                    .files[0];

                saveHelper.getBase64(file);
            }
          });
    },

    getBase64: function (file) {
        var reader = new FileReader();
     
        reader.readAsDataURL(file);
        reader.onload = function () {
            saveHelper.saveData(reader.result);
        };
     
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    },
    
    saveData: function (file) {   
        debugger;
        var data = decodeURI($(".new-profile-form").serialize()); 
        // отримуємо дані з форми
        // в серіалізованому вигляді

        console.log(data);
        
        data += "&file = " + file; // додаємо значення картинки в коді base64       
    
        var counter =  Number(localStorage.getItem(this.counterKey));
        
        if(counter == 0) {
          localStorage.setItem(this.counterKey, 1); // записуємо к-сть тваринок
          localStorage.setItem(this.storageKey+"1", data); // записуємо дані про тваринку в localStorage
        } else {
          counter++;
          localStorage.setItem(this.counterKey, counter); 
          localStorage.setItem(this.storageKey+counter,data);
        }
        window.location.reload();
    
      },

}