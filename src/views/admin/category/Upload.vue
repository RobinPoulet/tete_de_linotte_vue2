<template>
    <div>
        <div>
            <p>Upload an image to Firebase:</p>
            <input type="file" @change="previewImage" accept="image:*">
        </div>
        <div>
            <p>Progress: {{ uploadValue.toFixed()+"%"  }}
                <progress :value="uploadValue" max="100"></progress>
            </p>
        </div>
        <div>
            <img class="preview" :src="picture">
            <br>
            <v-btn @click="onUpload">Upload</v-btn>
        </div>
    </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Upload',

    data() {
        return {
            imageData: null,
            picture: null,
            uploadValue: 0
        }
    },

    methods: {
        previewImage(event) {
            this.uploadValue = 0;
            this.picture = URL.createObjectURL(event.target.files[0]);
            this.imageData = event.target.files[0];
            console.log(event.target.files)
        },

        onUpload() {

            console.log(this.imageData)
            const storage = getStorage();

            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: this.imageData.type
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/' + this.imageData.name);
            const uploadTask = uploadBytesResumable(storageRef, this.imageData, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + this.uploadValue + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
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
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                this.uploadValue = 100;
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
            );

        }
    },
}

</script>
