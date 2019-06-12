<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/10/19 4:15 PM
  -
  -->

<template>
    <div id="not-found">
        <h1>404</h1>
        <h3>NOT FOUND</h3>
        <div>
            <mu-button to="/">
                <mu-icon value="home" left></mu-icon>
                Return
            </mu-button>
        </div>
    </div>
</template>

<style lang="scss">
    #not-found {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1 {
            font-size: 5em;
            text-shadow: 0 10px 10px #0003;
        }
    }
</style>
