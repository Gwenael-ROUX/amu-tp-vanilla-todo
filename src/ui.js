// src/ui.js

/**
 * Permet d'ajouter visuellement une tâche dans l'interface
 * @param {{id: number, text: string, done: boolean}} item
 */
 const addTodo = (item) => {
    // Code d'ajout d'une tâche dans l'interface
  };
  
  /**
   * Permet d'ajouter visuellement la liste des tâches dans l'interface
   */
  export const displayTodoList = () => {
      // Nous injectons nous même le code HTML de base de la liste des tâches désormais
      // Ainsi que le formulaire, de telle sorte qu'on puisse afficher ces éléments via un simple appel de fonction
      document.querySelector("main").innerHTML = `
            <h2>La liste des tâches</h2>
            <ul></ul>
            <form>
              <input type="text" name="todo-text" placeholder="Ajouter une tâche" />
              <button>Ajouter</button>
            </form>
          `;
  
      // Une fois le code HTML introduit dans l'interface, on peut afficher les tâches dans le <ul>
      loadTodoItemsFromApi().then((items) => {
          items.forEach((item) => addTodo(item));
      });
  
      // Il faudra alors ajouter la gestion du submit du <form>
      document.querySelector("form").addEventListener("submit", onSubmitForm);
  };
  
  /**
   * Gestion du formulaire d'ajout d'une tâche
   * @param {Event} e
   */
  const onSubmitForm = (e) => {
    // Gestion de la soumission du formulaire
    document.querySelector("form").addEventListener("submit", (e) => {
        // On annule le comportement par défaut de la soumission 
        // (qui aurait pour effet de recharger la page, ce qu'on ne souhaite pas vu qu'on souhaite gérer nous-même le comportement)
        e.preventDefault();
    
        // On récupère l' <input /> du formulaire
        const input = document.querySelector('input[name="todo-text"]');
    
        // On créé une tâche avec la valeur de l'<input />
        const item = {
        text: input.value,
        done: false,
        };
        
        // On appelle l'API afin de sauver la nouvelle tâche
        saveTodoItemToApi(item).then((items) => {
        // La réponse de l'API est un tableau avec les tâches
        // touchées par le traitement, on prend la première (la seule en fait)
        // Et on l'affiche dans l'interface
        addTodo(items[0]);
    
        // On vide l'<input /> et on remet le curseur dessus
        input.value = "";
        input.focus();
        });
    });
  };
  
  /**
   * Gestion du click sur une Checkbox
   * @param {MouseEvent} e
   */
  const onClickCheckbox = (e) => {
    // On récupère l'identifiant de la tâche cliquée (todo-1 ou todo-12 par exemple)
    const inputId = e.target.id;
    // On ne garde que la partie numérique (1 ou 12 par exemple)
    const id = +inputId.split("-").pop();
    // On récupère le fait que la checkbox soit cochée ou pas lors du click
    const isDone = e.target.checked;
  
    // On annule le comportement par défaut de l'événement (cocher ou décocher la case)
    // Car on ne souhaite cocher / décocher que si le traitement va au bout
    e.preventDefault();
  
    // On appelle l'API afin de changer le statut de la tâche
    toggleComplete(id, isDone).then(() => {
      // Lorsque c'est terminé, on coche ou décoche la case
      e.target.checked = isDone;
    });
  };