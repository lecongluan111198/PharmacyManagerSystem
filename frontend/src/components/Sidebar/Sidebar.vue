<template>
    <div class="app-sidebar" :class="{'close': !open}">
        <mu-flex class="user-info" align-items="center" :direction="open ? 'row' : 'column'">
            <div>
                <mu-button icon @click="open = !open">o
                    <mu-icon :size="32" :value="open ? 'chevron_left' : 'chevron_right'"></mu-icon>
                </mu-button>
            </div>
            <mu-flex fill v-if="me && open" direction="column">
                <strong>{{me.name}}</strong>
                <p>{{me.email}}</p>
            </mu-flex>
            <div>
                <SidebarSettings></SidebarSettings>
            </div>
        </mu-flex>
        <mu-flex fill direction="column">
            <mu-flex justify-content="center">
                <mu-icon value="search"></mu-icon>
                <mu-text-field type="search" label-float label="Tìm hóa đơn"></mu-text-field>
            </mu-flex>
            <mu-list id="menu">
                <mu-tooltip v-for="(item, idx) in menu" :key="idx" :content="item.title" placement="right">
                    <mu-list-item avatar button :to="item.to">
                        <mu-list-item-action>
                            <mu-icon :value="item.icon"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>{{item.title}}</mu-list-item-title>
                    </mu-list-item>
                </mu-tooltip>
            </mu-list>
        </mu-flex>
        <mu-flex>
            <mu-list color="light">
                <mu-tooltip :content="today" placement="right">
                    <mu-list-item button>
                        <mu-list-item-action>
                            <mu-icon value="calendar_today"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>{{today}}</mu-list-item-title>
                    </mu-list-item>
                </mu-tooltip>
                <mu-tooltip :content="timenow" placement="right">
                    <mu-list-item button >
                        <mu-list-item-action>
                            <mu-icon value="schedule"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>{{timenow}}</mu-list-item-title>
                    </mu-list-item>
                </mu-tooltip>
            </mu-list>
        </mu-flex>
    </div>
</template>

<style lang="scss">
    #menu .active {
        background-color: #000;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {mapGetters} from 'vuex';
    import SidebarSettings from "./SidebarSettings.vue";

    @Component({
        components: {
            SidebarSettings,
        },
        computed: {
            ...mapGetters([
                'me',
            ]),
        }
    })
    export default class Sidebar extends Vue {
        open: boolean = true;
        timenow: string = "";

        menu = [
            {
                icon: "add_shopping_cart",
                title: "Bán thuốc",
                to: '/'
            },
            {
                icon: "receipt",
                title: "Lịch sử Hóa đơn",
                to: '/prescription'
            },
            {
                icon: "list",
                title: "Danh sách thuốc",
                to: '/medicine'
            },
        ];

        get today(): string {
            return (new Date()).toLocaleDateString('vi-vn');
        }

        created() {
            setInterval(()=>{
                this.timenow = (new Date()).toLocaleTimeString('vi-vn');
            }, 1000);
        }
    }
</script>
