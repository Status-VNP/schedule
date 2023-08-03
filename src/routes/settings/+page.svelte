<script lang="ts">
  import { carsList, maxRowsCount } from "$lib/store";

  let carName: string;
  let fileInput: HTMLInputElement;
  function addCar() {
    carName = carName.toUpperCase().trim();
    if (!carName) return;
    carsList.update(cars => {
      if ($maxRowsCount < cars.length + 1) {
        $maxRowsCount++;
      }
      return [...cars, carName];
    });
    carName = "";
  }

  function removeCar(index: number) {
    carsList.update(cars => {
      cars.splice(index, 1);
      return cars;
    });
  }

  function goDown(index: number) {
    carsList.update(cars => {
      if (index === cars.length - 1) return cars;
      const temp = cars[index];
      cars[index] = cars[index + 1];
      cars[index + 1] = temp;
      return cars;
    });
  }

  function goUp(i: number) {
    carsList.update(cars => {
      if (i === 0) return cars;
      const temp = cars[i];
      cars[i] = cars[i - 1];
      cars[i - 1] = temp;
      return cars;
    });
  }

  function exportSettings() {
    const data = JSON.stringify({
      maxRowsCount: $maxRowsCount,
      carsList: $carsList,
    });
    const a = document.createElement("a");
    a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
    a.setAttribute("download", "settings.json");
    a.click();
  }

  function importSettings() {
    const file = fileInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = JSON.parse(e.target?.result as string);
      $maxRowsCount = data.maxRowsCount;
      carsList.set(data.carsList);
      fileInput.value = "";
    };
    reader.readAsText(file);
  }
</script>

<div class="container my-5">
  <div class="mb-3">
    <label for="maxrows" class="form-label">Max rows count</label>
    <input
      type="number"
      class="form-control"
      id="maxrows"
      min="1"
      placeholder="Max rows count"
      bind:value={$maxRowsCount} />
  </div>

  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-8 d-flex align-items-center">
          <span>Cars</span>
        </div>
        <div class="col-4 text-end">
          <input
            type="file"
            class="d-none"
            bind:this={fileInput}
            accept=".json"
            on:change={importSettings} />
          <button class="btn btn-outline-primary mt-2 me-2" on:click={() => fileInput.click()}
            >Import</button>
          <button class="btn btn-outline-dark mt-2 me-2" on:click={exportSettings}>Export</button>
        </div>
      </div>
    </div>
    <ol class="list-group list-group-flush" class:list-group-numbered={$carsList.length}>
      {#each $carsList as car, i}
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">{car}</div>
          <button class="btn badge bg-success rounded-pill ms-1" on:click={() => goUp(i)}
            >Up</button>
          <button class="btn badge bg-success rounded-pill ms-1" on:click={() => goDown(i)}
            >Down</button>
          <button class="btn badge bg-danger rounded-pill ms-1" on:click={() => removeCar(i)}
            >Del</button>
        </li>
      {:else}
        <li class="list-group-item">
          <span class="fw-bold">No cars</span>
        </li>
      {/each}
    </ol>
    <div class="card-footer">
      <div class="row">
        <div class="col-8">
          <input
            type="text"
            class="form-control"
            placeholder="Car name"
            bind:value={carName}
            aria-label="Car name" />
        </div>
        <div class="col-4 text-end">
          <button class="btn btn-secondary" on:click={addCar}>Add car</button>
        </div>
      </div>
    </div>
  </div>
</div>
