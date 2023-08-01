<script lang="ts">
  import { base } from "$app/paths";
</script>

<header class="navbar navbar-expand navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="{base}/">Schedule genarator</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="{base}/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{base}/settings">Settings</a>
        </li>
      </ul>
    </div>
  </div>
</header>

<style>
  header {
    user-select: none;
  }
</style>
