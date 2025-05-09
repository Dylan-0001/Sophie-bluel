import { ModalComponent } from "../util/modal.js";
import { AddModal } from "./addModal.js";
import { RequestUtils } from "../util/requestUtils.js";
import { Utils } from "../util/utils.js";

export class EditModal extends ModalComponent 
{
    constructor(galleryList) 
    {
        super("Galerie Photo", "Ajouter une photo", false);
        this.images = galleryList;
    }

    static initialize(galleryImages) 
    {
        const instance = new EditModal(galleryImages);
        instance.drawOverlay();

    }

    drawContent() 
    {
        const contentContainer = document.createElement("div");
        contentContainer.classList.add("overlay-gallery");

        this.images.forEach(imageObj => 
        {
            const imageContainer = document.createElement("div");
            const img = document.createElement("img");
            img.src = imageObj.imageUrl;
            img.alt = imageObj.title;

            const trashButton = document.createElement("button");
            trashButton.className = "fa-solid fa-trash";

            trashButton.addEventListener("click", ()=>
            {
            RequestUtils.deleteImage(imageObj.id)
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
                    console.error("Erreur: ", err);
                });
            });

            imageContainer.appendChild(trashButton);
            imageContainer.appendChild(img);
            contentContainer.appendChild(imageContainer);
        });

        this.overlayContainer.appendChild(contentContainer);
    }

    createButton()
    {
        const button = document.createElement("button");
        button.textContent = this.overlayButtonTitle;
        button.classList.add("add-picture");
        button.addEventListener("click", () => 
        {
            this.destroy();
            this.onButtonAction();
        });
        return button;
    }

    onButtonAction()
    {
        AddModal.initialize();
    }
}
