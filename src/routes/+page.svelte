<script lang="ts">
  import font from "$lib/font";
  import { carsList, maxRowsCount } from "$lib/store";
  import { months, week } from "$lib/translate";
  import jsPDF from "jspdf";

  let date: string | undefined = new Date().toISOString().slice(0, 7);
  let month: number | undefined, year: number | undefined;

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  function generate() {
    if (!month || !year) return;
    const dayCount = getDaysInMonth(year, month);
    const pdf = new jsPDF("l", "mm", "a4");
    pdf.addFileToVFS("Roboto.ttf", font);
    pdf.addFont("Roboto.ttf", "Roboto", "normal");

    const tableWidth = pdf.internal.pageSize.getWidth() - 6;
    const tableHeight = pdf.internal.pageSize.getHeight() - 8;
    const colCount = 2 + dayCount;
    const rowCount = $maxRowsCount;
    const cellWidth = tableWidth / colCount;
    const cellHeight = tableHeight / rowCount;
    const padding = 3;

    // Draw the table border
    pdf.rect(padding, padding, colCount * cellWidth, rowCount * cellHeight);

    for (let i = 2; i < colCount; i++) {
      if (i == 2) {
        pdf.setDrawColor(0, 0, 0);
      } else {
        pdf.setDrawColor(211, 211, 211);
      }
      const x = padding + i * cellWidth;
      pdf.line(x, padding, x, padding + rowCount * cellHeight);
    }

    for (let i = 1; i < rowCount; i++) {
      if (i == 1) {
        pdf.setDrawColor(0, 0, 0);
      } else {
        pdf.setDrawColor(211, 211, 211);
      }
      const y = padding + i * cellHeight;
      pdf.line(padding, y, padding + colCount * cellWidth, y);
    }

    pdf.setFontSize(10);
    for (let i = 0; i < dayCount; i++) {
      const xDayNum = 2 * cellWidth + padding + i * cellWidth + cellWidth / 2;
      const yDayNum = padding + cellHeight / 2;

      pdf.text((i + 1).toString(), xDayNum, yDayNum, {
        align: "center",
        baseline: "middle",
      });
    }

    pdf.setFontSize(10);
    for (let i = 0; i < rowCount - 1; i++) {
      const x = cellWidth / 2.5;
      const y = padding + (i + 1) * cellHeight + cellHeight / 2;
      if (i < $carsList.length) {
        pdf.text($carsList[i], x, y, {
          maxWidth: cellWidth * 2,
          baseline: "middle",
        });
      }
    }

    pdf.setFont("Roboto");
    pdf.text(months[month - 1], cellWidth / 2, padding + cellHeight / 2, {
      baseline: "middle",
    });
    for (let i = 0; i < dayCount; i++) {
      const xDay = 2 * cellWidth + padding + i * cellWidth + cellWidth / 2;
      const yDay = padding / 3 + cellHeight;
      const dayI = new Date(`${year}-${month}-${i + 1}`).getDay();

      pdf.setFontSize(8);
      pdf.text(week[dayI], xDay, yDay, {
        baseline: "middle",
        align: "center",
      });
    }

    iframesrc = pdf.output("bloburi").toString();
    filename = `Schedule${month - 1}.${year}.pdf`;
  }

  let iframesrc: string;
  let filename: string;

  function splitDate(date: string | undefined) {
    if (date) {
      const [year, month] = date.split("-");
      return { year: parseInt(year), month: parseInt(month) };
    }
    return { year: undefined, month: undefined };
  }

  $: ({ year, month } = splitDate(date));
</script>

<div class="container my-5">
  <div class="mb-3">
    <label for="selectmonth" class="form-label">Select Month</label>
    <input
      type="month"
      class="form-control"
      id="selectmonth"
      bind:value={date}
      placeholder="Select Month" />
  </div>
  {#if iframesrc}
    <iframe src={iframesrc} frameborder="0" title="Schedule PDF" />
    <a href={iframesrc} download={filename}>Download</a>
  {/if}
  <div class="d-flex justify-content-end">
    <button class="btn btn-primary mt-3" on:click={generate}>Generate</button>
  </div>
</div>

<style>
  iframe {
    width: 100%;
    height: 50vh;
  }
</style>
