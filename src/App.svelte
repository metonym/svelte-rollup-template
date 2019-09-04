<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<style>
  h1 {
    font-family: monospace;
  }
</style>

<h1 on:click={increment}>The count is {count}</h1>
