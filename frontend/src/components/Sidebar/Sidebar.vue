<template>
    <div class="app-sidebar" :class="{'close': !open}">
        <mu-flex class="user-info" align-items="center" :direction="open ? 'row' : 'column'">
            <div>
                <mu-button icon @click="open = !open">
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
        <mu-flex fill>
            <mu-list id="menu" :toggle-nested="true" :toggle-nested-type="open ? 'expand' : 'popover'">
                <mu-tooltip v-for="(item, idx) in menu"
                            :tooltip-class="open ? 'hide' : ''"
                            :key="idx" :content="item.title" placement="right">
                    <mu-list-item avatar button
                                  v-if="$can(item.can[0], item.can[1])"
                                  v-tooltip.left="{content: item.shortKey.join('+'), show: showAllHotkey}"
                                  :to="item.to"
                                  :nested="!!item.nested">
                        <mu-list-item-action>
                            <mu-icon :value="item.icon"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>{{item.title}}</mu-list-item-title>

<!--                        // SUB MENU-->
                        <template v-if="item.nested">
                            <mu-list-item-action >
                                <mu-icon value="keyboard_arrow_down"></mu-icon>
                            </mu-list-item-action>
                            <mu-list-item button :to="nested.to" slot="nested"
                                          v-for="(nested, nidx) in item.nested"
                                          :key="nidx">
                                <mu-list-item-title>{{nested.title}}</mu-list-item-title>
                            </mu-list-item>
                        </template>
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
    .hide {
        display: none;
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
                'showAllHotkey',
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
                to: '/',
                can: [['read', 'write'], 'HoaDon'],
                shortKey: ['alt', '1'],
            },
            {
                icon: "receipt",
                title: "Lịch sử Hóa đơn",
                to: '/hoadon',
                can: [['read'], 'HoaDon'],
                shortKey: ['alt', '2'],
            },
            {
                icon: "list",
                title: "Danh sách thuốc",
                to: '/thuoc',
                can: [['read'], 'Thuoc'],
                shortKey: ['alt', '3'],
            },
            {
                icon: "archive",
                title: "Quản lý kho",
                can: [['manage'], 'Receipt'],
                shortKey: ['alt', '4'],
                nested: [
                    {
                        to: '/kho',
                        title: this.$lang.THUOC.TITLE,
                    },
                    {
                        to: '/kho/history',
                        title: this.$lang.INVENTORY.HISTORY,
                    },
                ],
            },
            {
                icon: "vertical_split",
                title: "Danh mục",
                can: [['manage'], ['Category', 'Provider']],
                shortKey: ['alt', '5'],
                nested: [
                    {
                        to: '/provider',
                        title: 'Nhà cung cấp',
                    },
                    {
                        to: '/category',
                        title: 'Phân loại thuốc',
                    }
                ]
            },
            {
                icon: "insert_chart",
                title: "Thống kê",
                to: '/report',
                can: ['read', 'Report'],
                shortKey: ['alt', '6'],
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
