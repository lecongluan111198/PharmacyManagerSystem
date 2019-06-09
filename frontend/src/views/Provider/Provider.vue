<template>
    <mu-flex direction="column" align-items="stretch">
        <div>
            <h1>{{$lang.PROVIDER.TITLE}}</h1>
        </div>
        <div style="flex: 1 1 auto;">
            <paginate-table
                style="height: 100%"
                :data="listProvider"
                :columns="tableColumns"></paginate-table>
        </div>
    </mu-flex>
</template>


<script lang="ts">
    import Vue from 'vue';


    export default Vue.extend({
        name: 'kho-view',
        components: {
            PaginateTable: ()=>import('@/components/PaginateTable/index.vue'),
        },

        data() {
            return {
                tableColumns: [
                    {title: this.$lang.THUOC.ID, name: 'id'},
                    {title: this.$lang.PROVIDER.NAME, name: 'name'},
                    {title: this.$lang.ADDRESS, name: 'address'},
                    {title: this.$lang.PHONE, name: 'phoneContact'},
                ],
            }
        },

        computed: {
            listProvider() {
                return this.$store.getters['provider/list'];
            },
            page: {
                get(): number {
                    // @ts-ignore
                    return this.$store.getters['provider/page'];
                },
                set(page: number) {
                    // @ts-ignore
                    this.$store.dispatch('provider/load', {
                        page,
                    });
                }
            },
            total() {
                return this.$store.getters['provider/total'];
            },
        },

        methods: {
            showProvider(idx: number, row: any) {
                const id = row.id;
                this.$router.push(`/provider/${id}`);
            },
        },

        created(): void {
            this.$store.dispatch('provider/load', {
                page: 1,
            });
        }
    });

</script>
