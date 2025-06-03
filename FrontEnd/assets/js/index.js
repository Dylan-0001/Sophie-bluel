//Import class
import { RequestUtils } from './util/requestUtils.js';
import { Utils } from './util/utils.js';
import { EditModal } from './modal/editModal.js';

//Variables
const edit = document.getElementById("modifie-button");

//Call DrawFilters Function
RequestUtils.getCategories()
    .then(drawFilters)
    .catch((error) => console.error("Erreur de chargement :", error));

//Call DrawWorkImages Function
RequestUtils.getWorks()
    .then(response => {
        Utils.getGalleryCache = response;   
        Utils.getCategorieIdActive = 0;
        Utils.drawWorkImages();
    }).catch((error) => console.error("Erreur de chargement :", error));


//Function Draw Filters
function drawFilters(filters)
{

    if(Utils.isAuthenticated()) return;
    
    const filtersDiv = document.querySelector(".filters");
    filters.unshift({name: "Tous", id: 0})

    filters.forEach((filterObj) =>{
        const button = document.createElement("button");
        button.textContent = filterObj.name;
        button.classList.add("filter");

        filtersDiv.appendChild(button);
            
        initializeListener(button, filterObj);
    });
}

//Initialize Filter Listener
function initializeListener(button, filterObj)
{
    button.addEventListener("click", () => {
        Utils.getCategorieIdActive = filterObj.id;

        document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        Utils.drawWorkImages();
    });
}

//add admin edit button
edit.style.display = "none";
if(Utils.isAuthenticated())
{
    edit.style.display = "flex";
}

edit.addEventListener("click", () =>
{
    EditModal.initialize(Utils.getGalleryCache);
});
