import { defineStore } from "pinia";

export const useStore = defineStore('store', {

    state:()=>({

        data:''

    }),
    actions:{
        async dumyFunction(){
            this.data = await $fetch('https://fakestoreapi.com/products');

           // this.data = fakedata.data;

            console.log(this.data);

        }

    }
})