
<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/10/19 2:51 PM
  -
  -->

<template>
    <mu-flex justify-content="center" align-items="center">
        <mu-paper :z-depth="4"
                  class="profile">
            <mu-flex align-items="center" direction="column">
                <mu-button fab small
                           @click="editing = !editing; change_pass = false;"
                           class="profile-edit-button"
                           :color="editing ? 'gray' : 'blue'">
                    <mu-icon value="close" size="20" v-if="editing"></mu-icon>
                    <mu-icon value="edit" size="20" v-else></mu-icon>
                </mu-button>
                <mu-avatar icon :size="100"
                           class="profile-avatar"
                           color="gray">
                    <mu-icon value="account_circle" size="80"></mu-icon>
                </mu-avatar>
                <template v-if="!editing">
                    <h2>{{me.name}}</h2>
                    <div>
                        <a :href="`mailto:${me.email}`">{{me.email}}</a>
                    </div>
                </template>
                <template v-else>
                    <mu-form :model="editingMe" label-position="right" label-width="80">
                        <mu-form-item :label="$lang.USER.NAME"
                                      prop="input">
                            <mu-text-field v-model="editingMe.name"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item :label="$lang.USER.EMAIL"
                                      prop="input">
                            <mu-text-field v-model="editingMe.email"></mu-text-field>
                        </mu-form-item>

                        <mu-form-item v-if="!change_pass" >
                            <mu-button small @click="change_pass = true">
                                Change Password
                            </mu-button>
                        </mu-form-item>

                        <template v-if="change_pass">
                            <mu-form-item :label="$lang.USER.CUR_PASS" prop="password">
                                <mu-text-field v-model="current_pass"
                                               type="password"></mu-text-field>
                            </mu-form-item>
                            <mu-form-item :label="$lang.USER.NEW_PASS" prop="password">
                                <mu-text-field v-model="new_pass"
                                               type="password"></mu-text-field>
                            </mu-form-item>
                        </template>

                        <mu-form-item>
                            <mu-button typeof="submit" color="blue">
                                OK
                            </mu-button>
                        </mu-form-item>

                    </mu-form>
                </template>
            </mu-flex>
        </mu-paper>
    </mu-flex>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {User} from "@/types/User";

    export default Vue.extend({
        name: 'profile',
        data() {
            return {
                editing: false,
                change_pass: false,
                editingMe: this.$store.getters.me,

                current_pass: '',
                new_pass: '',
            };
        },
        computed: {
            me(): User {
                return this.$store.getters.me;
            }
        }
    });
</script>

<style lang='scss'>
    .profile {
        position: relative;
        width: 400px;
        min-height: 300px;
        padding: 1em;

        &-avatar {
            margin-top: -45px;
            margin-bottom: 20px;
            box-shadow: 0 10px 5px #0003;
        }
        &-edit-button {
            position: absolute;
            top: -10px;
            right: -10px;
        }
    }
</style>
