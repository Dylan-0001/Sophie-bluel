import { EditModal } from "../modal/editModal.js";
import { Utils } from "./utils.js";

export class ModalComponent 
{
    constructor(overlayTitle, overlayButtonTitle, hasUndo) 
    {
        this.overlayTitle = overlayTitle;
        this.overlayButtonTitle = overlayButtonTitle;
        this.hasUndo = hasUndo;
        this.overlay = null;
        this.overlayContainer = null;
        this.closeNaviation = null;
        this.undoNaviation = null;
        this._overlayClickListener = null; 
    }

    drawOverlay() 
    {
        this.overlay = document.createElement("div");
        this.overlay.classList.add("overlay");

        this.overlayContainer = document.createElement("div");
        this.overlayContainer.classList.add("overlay-container");
        
        const overlayNavigation = document.createElement("div");
        overlayNavigation.classList.add("overlay-navigation");
        
        this.undoNaviation = document.createElement("button");
        this.undoNaviation.className = "fa-solid fa-arrow-left";
        this.undoNaviation.style.fontSize = "20px";
        this.closeNaviation = document.createElement("button");
        this.closeNaviation.className = "fa-solid fa-xmark";

        this.overlay.style.display = "flex";

        const title = document.createElement("h2");
        title.textContent = this.overlayTitle;

        const underline = document.createElement("div");
        underline.classList.add("underline");

        const button = this.createButton();

        this.overlay.appendChild(this.overlayContainer);
        
        if(!this.hasUndo)
        {
            this.undoNaviation.style.visibility = "hidden";
        }

        overlayNavigation.appendChild(this.undoNaviation);
        overlayNavigation.appendChild(this.closeNaviation);
        this.overlayContainer.appendChild(overlayNavigation);
        this.overlayContainer.appendChild(title);
        this.drawContent();
        this.overlayContainer.appendChild(underline);
        this.overlayContainer.appendChild(button);

        document.body.appendChild(this.overlay);

        this.initializeListener();
    }

    initializeListener() 
    {
        this._overlayClickListener = (event) => 
        {
            if (
                event.target.tagName !== 'BUTTON' &&
                !this.overlayContainer.contains(event.target)
            ) {
                this.destroy();
            }
        };

        this.overlay.addEventListener("click", this._overlayClickListener);

        this.closeNaviation.addEventListener("click", () =>{
            this.destroy();
        });

        this.undoNaviation.addEventListener("click", () =>{
            this.destroy();
            EditModal.initialize(Utils.getGalleryCache);
        });
    }

    destroy() 
    {
        if (this.overlay && this.overlay.parentNode) 
        {
            this.overlay.parentNode.removeChild(this.overlay);
        }

        this.overlay = null;
        this.overlayContainer = null;
        this.closeNaviation = null;
        this.undoNaviation = null;
        this._overlayClickListener = null;
    }

    createButton() 
    {
        const button = document.createElement("button");
        button.textContent = this.overlayButtonTitle;
        button.classList.add("add-picture");
        button.addEventListener("click", (event) => {
            this.onButtonAction();
        });
        return button;
    }

    onButtonAction() {}
    drawContent() {}
}
