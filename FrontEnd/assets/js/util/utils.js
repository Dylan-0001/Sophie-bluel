let galleryImages = [];
let imageSelected = null;
let categorieIdActive = null;

export class Utils 
{
    //Function for create gallery figure
    static createFigure(imageObj)
    {
        const figure = document.createElement("figure");
    
        const image = document.createElement("img");
        image.src = imageObj.imageUrl;
    
        const figCaption = document.createElement("figcaption");
        figCaption.textContent = imageObj.title;
    
        figure.appendChild(image);
        figure.appendChild(figCaption);
        
        return figure;
    }

    //Function for return error auth user not ok
    static userNotOK(response) 
    {
        const messages = {
            401: "Erreur dans l’identifiant ou le mot de passe !",
            404: "Erreur, aucun compte n'utilise cet email !"
        };
    
        return messages[response.status] || "Erreur inconnue: " + response.status;
    }

    //function for get if user is connected
    static isAuthenticated() 
    {
        return localStorage.getItem("token");
    }

    static getGalleryCache()
    {
        return galleryImages;
    }

    static getCategorieIdActive()
    {
      return categorieIdActive;
    }

    static createImageUploadButton({
        fileInput,
        errorMsg,
        container,
        allowedTypes = ['image/png', 'image/jpeg'],
        maxSizeMB = 2,
        buttonText = "Choisir une image"
      } = {}) {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.type = 'button';
      
        button.addEventListener('click', () => {
          fileInput.click();
        });
      
        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0];
          errorMsg.textContent = "";
      
          if (!file) {
            errorMsg.textContent = "Veuillez sélectionner un fichier.";
            return;
          }
      
          if (!allowedTypes.includes(file.type)) {
            errorMsg.textContent = "Format non autorisé. Seuls PNG et JPG sont acceptés.";
            return;
          }
      
          if (file.size > maxSizeMB * 1024 * 1024) {
            errorMsg.textContent = `Fichier trop grand. Maximum ${maxSizeMB} Mo.`;
            return;
          }
      
          const reader = new FileReader();
          reader.onload = function (e) {
            const dataUrl = e.target.result;
      
            if (container) {
              container.style.backgroundImage = `url(${dataUrl})`;
              container.style.backgroundSize = 'cover';
              container.style.backgroundPosition = 'center';
              while (container.firstChild) {
                container.removeChild(container.firstChild);
              }
              imageSelected = file;
            }
          };
          reader.readAsDataURL(file);
        });
      
        return button;
      }
      

      static createFileInput({ id = 'fileInput', accept = '.png, .jpg, .jpeg', hidden = false } = {}) {
        const input = document.createElement('input');
        input.name= "test";
        input.type = 'file';
        input.id = id;
        input.accept = accept;
      
        if (hidden) {
          input.style.display = 'none';
        }
      
        return input;
      }

      static getSelectedImage()
      {
          return imageSelected;
      }

      static drawWorkImages() 
      {
          const gallery = document.querySelector('.gallery');
          gallery.innerHTML = "";
      
          this.getGalleryCache.forEach((imageObj) => 
          {
              if (this.getCategorieIdActive === 0 || imageObj.categoryId === this.getCategorieIdActive)
              {
                gallery.appendChild(this.createFigure(imageObj)); 
              } 
          });
      }

}