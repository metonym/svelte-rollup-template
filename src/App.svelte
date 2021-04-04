<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>The count is {count}</button>

<style>
  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
