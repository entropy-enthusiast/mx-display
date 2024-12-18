function createGrid() {
  let cloneBtn = (r, c) => {
    return `<button class="cell" data-row="${r}" data-col="${c}"></button>`;
  }
  
  $(".grid").empty();

  for (let row=0; row<32; row++) {
    for (let col=0; col<32; col++) {
      $(".grid").append(cloneBtn(row, col));
    }
  }
}

$(document).ready(() => {

  $(".tab-link").on("click", ({target}) => {
    let active = "tab-link--active";
    let isActive = $(target).hasClass(active);

    if (!isActive) {
      $(`.${active}`).removeClass(active);
      $(target).addClass(active);
    }

    // someFunction()
  });

  $(".grid").on("click", ({target}) => {
    let active = "cell--active";
    let isActive = $(target).hasClass(active);

    if (isActive) {
      $(target).removeClass(active);
    } else {
      $(target).addClass(active);
    }
  });

  createGrid();

});
