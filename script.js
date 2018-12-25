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
        var key = window.localStorage.getItem(this.counterKey);
        var countOfPets = Number(key);
 
        if (countOfPets > 0)
        {
            // проходимось по збережених тваринках
            for (var i=0 ; i <= countOfPets; i++)
            {
                var key = saveHelper.storageKey+(i+1);
                var pet = localStorage.getItem(key);

                if (!pet) {
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
            
                // заповнюємо інформацію про тваринку

                if (pet.name) {                    
                    template = template.replace("{name}", pet.name);
                }

                if (pet.file) {                    
                    template = template.replace("{file}", pet.file);
                }                

                if (pet.breed) {                    
                    template = template.replace("{breed}", pet.breed);
                }                
            
                $("#container").append($(template));          
            }          
        }
    },

    addPet: function () {
        $(".btn-accent").click(function () {
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
        // отримуємо дані з форми
        // в серіалізованому вигляді
        var propertiesArray = $(".new-profile-form").serializeArray();
        var newPet = null;

        for (var i = 0; i < propertiesArray.length; i++)
        {
            var property = propertiesArray[0];

            if (property.value) {                
                pet[property.name] = property.value;
            }
        }

        debugger;
        console.log(newPet);
        
        newPet.file = file; // додаємо значення картинки в коді base64       
    
        var key = localStorage.getItem(this.counterKey);
        var countOfPets = Number(key);
        
        if (countOfPets == 0) {
          // якщо це перше додана тваринка
          localStorage.setItem(this.counterKey, 1); // записуємо к-сть тваринок
          localStorage.setItem(this.storageKey+"1", newPet); // записуємо дані про тваринку в localStorage
        } else {
          // збільшуємо кількість тваринок
          countOfPets++;
          // оновлюємо кількість тваринок
          localStorage.setItem(this.counterKey, countOfPets); 
          // зберігаємо нову тваринку 
          localStorage.setItem(this.storageKey+countOfPets, newPet);
        }

        window.location.reload();    
      },

}