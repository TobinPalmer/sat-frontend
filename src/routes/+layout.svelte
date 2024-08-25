<slot></slot>
<style lang="scss">
  //:global(mjx-container){
  //  display: inline-block;
  //}
  //
  //:global(mjx-assistive-mml){
  //  right: 0;
  //  bottom: 0;
  //}

  :global(svg:has(+math)) {
    display: none;
    //border: 1px solid red;
  }
</style>