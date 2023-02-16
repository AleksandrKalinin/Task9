<template>
  <router-view />
</template>

<style lang="sass">
@import "@/assets/styles/colorScheme.sass"
@import "@/assets/styles/button.sass"

*
  padding: 0
  margin: 0
  box-sizing: border-box
  font-family: 'Open Sans', sans-serif

.main-container
  display: flex
  padding: 30px
  min-height: calc(100vh - 80px)

.canvas-wrapper
  display: flex
  justify-content: space-between
  align-items: flex-start
  height: 100%
  width: 100%
  min-height: calc(100vh - 140px)

.canvas-inner
  display: flex
  justify-content: center
</style>
