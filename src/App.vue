<template>
  <router-view />
</template>

<style lang="sass">
*
  padding: 0
  margin: 0
  box-sizing: border-box

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
