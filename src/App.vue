<template>
  <router-view />
</template>

<style lang="sass">
@import "@/assets/styles/colorScheme.sass"
@import "@/assets/styles/icon.sass"
@import "@/assets/styles/button.sass"

*
  padding: 0
  margin: 0
  box-sizing: border-box
  font-family: 'Open Sans', sans-serif

.main-container
  display: block
  padding: 30px
  min-height: calc(100vh - 80px)

.canvas-wrapper
  display: flex
  justify-content: center
  align-items: center
  height: 100%
</style>
