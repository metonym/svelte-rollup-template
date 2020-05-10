<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<style>
  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>

<h1 on:click={increment}>The count is {count}</h1>
