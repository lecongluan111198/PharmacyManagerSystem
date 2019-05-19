// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue';
import {VueConstructor} from "vue";
import lang from './lang/vi';

declare module 'vue/types/vue' {
    interface Vue {
        $lang: typeof lang;
    }
    interface VueConstructor {
        $lang: typeof lang;
    }
}
