//Base URL
const staticUrl = "http://127.0.0.1:5678/api";

export class RequestUtils 
{
    //Static & Async Function To Return Works From API 
    static async getWorks() {
        try {
            const response = await fetch(staticUrl + "/works");
            if (!response.ok) throw new Error("Erreur " + response.status);
            return await response.json();
        } catch (err) {
            console.error("Erreur dans getWorks:", err);
            throw err;
        }
    }

    //Static & Async Function To Return Categories From API 
    static async getCategories() {
        try {
            const response = await fetch(staticUrl + "/categories");
            if (!response.ok) throw new Error("Erreur " + response.status);
            return await response.json();
        } catch (err) {
            console.error("Erreur dans getWorks:", err);
            throw err;
        }
    }

    //Static & async function to auth system
    static async sendAuth(mail, pass)
    {
        try {
            const response = await fetch(staticUrl + "/users/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: mail,
                    password: pass
                })
            });
            return response;
        } catch (err) {
            console.error("Erreur dans sendAuth:", err);
            throw err;
        }
    }

    static async addImage(imageFile, title, categoryId) 
    {
        try {
            const token = localStorage.getItem("token");
    
            const formData = new FormData();
            formData.append("image", imageFile);
            formData.append("title", title);
            formData.append("category", categoryId);
    
            const response = await fetch(staticUrl + "/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
    
            return response;
        } catch (err) {
            console.error("Erreur dans addImage:", err);
            throw err;
        }
    }

    static async deleteImage(id) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(staticUrl + `/works/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
      
          return response;
        } catch (err) {
          console.error("Erreur lors de la suppression :", err);
        }
      }
}
