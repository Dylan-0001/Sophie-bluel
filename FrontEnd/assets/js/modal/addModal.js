import { ModalComponent } from "../util/modal.js";
import { RequestUtils } from "../util/requestUtils.js";
import { Utils } from "../util/utils.js";

let list = [];
RequestUtils.getCategories()
    .then(response => list = response)
    .catch((error) => console.error("Erreur de chargement :", error));

export class AddModal extends ModalComponent 
{
    constructor() 
    {
        super("Ajout Photo", "Valder", true);
        this.titleInput = null;
        this.categorieInput = null;
        this.errorMsg = null;
    }

    static initialize() 
    {
        const instance = new AddModal();
        instance.drawOverlay();

    }

    drawContent() {
        const contentContainer = document.createElement("div");
      
        this.errorMsg = document.createElement("p");
        this.errorMsg.id = "errorMsg";

        const formContainer = document.createElement("div");
        formContainer.classList.add("add-container");
      
        const imageSelector = document.createElement("div");
        imageSelector.classList.add("image-selector");
      
        const selector = document.createElement("div");
        selector.classList.add("selector");

      
        const iconSelector = document.createElement("i");
        iconSelector.className = "fa-regular fa-image";
      
        const fileInput = Utils.createFileInput({
            id: 'fileInput',
            accept: '.png, .jpg, .jpeg',
            hidden: true
        });
                              
        const buttonSelector = Utils.createImageUploadButton({
            fileInput: fileInput,
            errorMsg: this.errorMsg,
            container: selector,
            buttonText: '+ Ajouter photo'
          });
      
        const infoSelector = document.createElement("p");
        infoSelector.textContent = "jpg, png : 4mo max";
      
      
        selector.appendChild(iconSelector);
        selector.appendChild(fileInput);
        selector.appendChild(buttonSelector);
        selector.appendChild(infoSelector);
      
        imageSelector.appendChild(selector);
      
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");
      
        const titleGroup = document.createElement("div");
        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "titleInput");
        titleLabel.textContent = "Titre";
      
        this.titleInput = document.createElement("input");
        this.titleInput.id = "titleInput";
        this.titleInput.type = "text";
      
        titleGroup.appendChild(titleLabel);
        titleGroup.appendChild(this.titleInput);
      
        const categorieGroup = document.createElement("div");
        const categorieLabel = document.createElement("label");
        categorieLabel.setAttribute("for", "categorieInput");
        categorieLabel.textContent = "Catégorie";
      
        this.categorieInput = document.createElement("select");
        this.categorieInput.id = "categorieInput";
      
        list.forEach(optionText => {
          const option = document.createElement("option");
          option.value = optionText.id;
          option.textContent = optionText.name;
          this.categorieInput.appendChild(option);
        });
      
        categorieGroup.appendChild(categorieLabel);
        categorieGroup.appendChild(this.categorieInput);
      
        inputContainer.appendChild(titleGroup);
        inputContainer.appendChild(categorieGroup);
      
        formContainer.appendChild(imageSelector);
        formContainer.appendChild(inputContainer);

        contentContainer.appendChild(this.errorMsg);
        contentContainer.appendChild(formContainer);
        this.overlayContainer.appendChild(contentContainer);
      }
      
    

    createButton()
    {
        const button = document.createElement("button");
        button.textContent = this.overlayButtonTitle;
        button.classList.add("add-picture");
        button.addEventListener("click", () => 
        {
            this.onButtonAction();
        });
        return button;
    }

    onButtonAction()
    {
        if(!Utils.getSelectedImage() || this.titleInput.value === null)
        {
            this.errorMsg.textContent = "Merci de remplir tous les champs !";
            return;
        }

        RequestUtils.addImage(Utils.getSelectedImage(), this.titleInput.value, this.categorieInput.value)
            .then(response => {
                if (response.ok) 
                {
                    RequestUtils.getWorks()
                            .then(response => {
                                Utils.getGalleryCache = response;   
                                Utils.drawWorkImages();

                            }).catch((error) => console.error("Erreur de chargement :", error));
                        this.destroy();
                }else 
                {
                    console.log(response.json());                        
                }
            })
            .catch(err => {
                console.error("Erreur:", err);
            });
    }
}
