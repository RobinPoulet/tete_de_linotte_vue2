<template>

    <div class="mb-4">
           
        <v-file-input
            v-model="images"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Upload your images"
            prepend-icon="mdi-paperclip"
            multiple
            @change="onUpload"
            @click:clear="clearUploadMultiple"
        ></v-file-input>

        <v-container v-if="images.length">
            <v-row no-gutters>
                <v-col v-for="(image, index) in images" :key="index">
                    <v-img
                        :src="pictures[index]"
                        :alt="image.name"
                        max-width="150"
                        max-height="150"
                    ></v-img>
                </v-col>
            </v-row>
        </v-container>
    
    </div>

</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const moment = require("moment");

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Upload',

    data() {
        return {
            images: [],
            pictures: [],
            imagesName: [],
        }
    },

    methods: {
        clearUploadMultiple() {
            this.$emit('clear-multiple', this.imagesName);
            this.imagesName = [];
        },

        uploadOneFile(file) {
            this.pictures.push(URL.createObjectURL(file));
            this.$emit('upload-multiple-started');
            const storage = getStorage();
            file.loading = true;
            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: file.type
            };
            const dateTime = moment().format('YYYYMMDDHHmmss');
            const fileName = `${dateTime}_${file.name}`;

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, `images/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    this.$toastr.i(`Upload is paused`);
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    this.$toastr.e(`${error.code} : User doesn't have permission to access the object`);
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    this.$toastr.e(`${error.code} : User canceled the upload`);
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    this.$toastr.e(`${error.code} : Unknown error occurred, inspect error.serverResponse`);
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    file.loading = false;
                    this.imagesName.push(fileName);
                    
                    this.$emit('add-image-to-gallerie', downloadURL, fileName);
                    console.log('File available at', downloadURL);
                    this.$toastr.s(`image a été upload avec succès`);
                });
            }
            );
        },

        onUpload() {
            this.loading = true;
            this.images.forEach(image => {
                    this.uploadOneFile(image);
                }
            );
            
        }
    },
}

</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
