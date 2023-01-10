<template>

    <div class="mb-4">
           
        <v-file-input
            v-model="image"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            @change="onUpload"
            @click:clear="clearUpload"
        ></v-file-input>

        <v-container v-if="picture">
            <v-row no-gutters>
                <v-col cols="3">
                    <v-img
                        :src="picture"
                        :alt="image.name"
                        max-width="150"
                        max-height="150"
                    ></v-img>
                </v-col>

                <v-col cols="2"></v-col>

                <v-col cols="3">
                    <v-progress-circular
                        v-show="loading"
                        :width="3"
                        color="green"
                        indeterminate
                    ></v-progress-circular>
                </v-col>

            </v-row>
        </v-container>
    
    </div>

</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Upload',

    data() {
        return {
            loading: false,
            image: null,
            picture: null,
            uploadValue: 0,
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
        }
    },

    methods: {
        clearUpload() {
            this.picture = null;
            this.$emit('clear');
        },

        onUpload() {
            this.loading = true;
            console.log(this.image)
            this.picture = URL.createObjectURL(this.image);
            this.$emit('upload-started');
            const storage = getStorage();

            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: this.image.type
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/' + this.image.name);
            const uploadTask = uploadBytesResumable(storageRef, this.image, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + this.uploadValue + '% done');
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
                this.uploadValue = 100;
                this.loading = false;
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    this.$emit('upload-done', downloadURL, this.image.name);
                    console.log('File available at', downloadURL);
                    this.$toastr.s(`image a été upload avec succès`);
                });
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
