<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/22/19 12:12 AM
  -
  -->

<template>
    <div class="page" style="height: 100%;">
        <div class="page-header">
            <slot name="header">{{$attrs.title}}</slot>
        </div>
        <div class="page-body">
            <slot></slot>
        </div>
    </div>
</template>

<style lang='scss'>
    .page {
        display: flex;
        flex-direction: column;

        &-header {
            flex: 0 0 auto;
        }

        &-body {
            flex: 1 1 auto;
            overflow: auto;
        }
    }
</style>
