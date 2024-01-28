<template>
  <div class="notes-app">
    <div class="top-bar">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
    </div>
    <div class="notes-list">
      <div class="note-content">
   <div class="note-preview" v-for="note in filteredNotes" :key="note.id">
        <h3>{{ note.title }}</h3>

  <p>{{ note.content }}</p>
  <small style="color: rgb(163, 163, 163);">{{ note.createdAt || note.created }}</small>

        <button @click="deleteNote(note.id)" class="delete-note-btn">Delete</button>
      </div>
    

      </div>
     
      
    </div>
    
    <button
  class="fixed bottom-20 right-14 text-white font-bold py-2 px-4 rounded-full "
  @click="showNoteForm = true" id="plusBtn">
      <svg class="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
  </svg>
    
    </button>


    <div v-if="showNoteForm" class="note-form-modal">
    <form class="note-form" @submit.prevent="submitNewNote">
      <input type="text" v-model="newNote.title" placeholder="Title" required />
      <textarea v-model="newNote.content" placeholder="Content" required></textarea>
      <button  type="submit" >Save Note</button>
      <button id="cancel" type="button" @click="showNoteForm = false">Cancel</button>
    </form>
  </div>
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue';

import { useNuxtApp } from '#app'; 

const { $api } = useNuxtApp();
const searchQuery = ref('');
const showNoteForm = ref(false);

const notes = ref([]);

const newNote = ref({
  title: '',
  content: '',
});


const fetchNotes = async () => {
  try {
    const response = await $api.get('collections/Notes/records');
    
    notes.value = response.data.items || []; 
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    notes.value = []; 
  }
};



const submitNewNote = async () => {
  if (newNote.value.title && newNote.value.content) {
     try {
    const response = await $api.post('collections/Notes/records', {
      title: newNote.value.title,
      content: newNote.value.content,
    });

    if (!Array.isArray(notes.value)) {
      notes.value = [];
    }
 console.log(response.data);
notes.value.push(response.data);

      newNote.value.title = '';
      newNote.value.content = '';
      showNoteForm.value = false;
    } catch (error) {
  const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message || 'An unknown error occurred';
  alert(`Failed to save note: ${errorMessage}`);
  console.error('Error details:', error.response || error);
}}

   else {
    alert('Please fill out all fields.');
  }
};


const deleteNote = async (id) => {
  try {
    await $api.delete(`collections/Notes/records/${id}`);
    notes.value = notes.value.filter((note) => note.id !== id);
  } catch (error) {
    console.error('Failed to delete note:', error);
  }
};



onMounted(() => {
  fetchNotes();
});


const filteredNotes = computed(() =>
  notes.value.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>


<style scoped>

#plusBtn{
  box-shadow: 0 0 7px rgb(0, 204, 255); 
}

#cancel{
  background-color: #dcdcdc;
  color: black
}

button {
  padding: 5px 5px;
  background-color: #0f0f0f; 
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

}
.notes-app {
  background-color: #111;
  min-height: 100vh;
  color: white;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}


.delete-note-btn {
    padding: 5px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .delete-note-btn:hover {
    background-color: #c0392b; 
  }

.top-bar {
  width: 100%;
  padding: 1rem;
  background-color: #222;
  margin-bottom: 1rem;
  box-shadow: 0 0 7px rgb(0, 204, 255); 
}

.top-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #4e4e4e;
  background-color: #282a2d;
  color: #ecf0f1;
}

.notes-list {
  width: 100%;
  max-width: 600px;
}

.note-preview {
  background-color: #333;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.note-preview h3 {
  margin: 0;
  font-size: 1.5rem;
}

.note-preview p {
  margin: 0;
}
.note-content {
   
    padding-bottom: 30px;
  }
.note-preview small {
  display: block;
  margin-top: 1rem;
}



.note-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.note-form {
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 7px rgb(0, 204, 255);
}

.note-form input,
.note-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #4e4e4e;
  background-color: #282a2d;
  color: #ecf0f1;
}

.note-form button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #3eabc3;
  color: white;
}

.note-form button:hover {
  background-color: #2980b9;
}

</style>
