const videoLinksRaw = document.querySelectorAll(".fave_video_item");
const videoLinks = [...videoLinksRaw];

const waitFor = condition => new Promise(resolve => {
  const wait = setInterval(() => {
    if (condition()) {
      clearInterval(wait);
      resolve();
    }
  }, 200);
});

const waitForElement = async (selector, waitForHide = false) => {
  await waitFor(() => {
    const element = document.querySelector(selector);
    return (element && !waitForHide) || (!element && waitForHide);
  });

  return document.querySelector(selector);
}

const click = async (selector, condition) => {
  const element = typeof selector === 'string' ? await waitForElement(selector) : selector;
  element.click();
  return waitFor(() => condition(element));
};

const dislike = async (selector) => {
  await click(selector, () => document.querySelector("#mv_layer_wrap").style.display == 'block');
  await click('.like.active', element => !element.classList.contains('active'));
  await waitForElement('.recaptcha', true);
  await click('.mv_top_close', () => document.querySelector("#mv_layer_wrap").style.display == 'none');
};

(async () => {
  for (let i = 0; i < videoLinks.length; i++) {
    await dislike(videoLinks[i]);
  }
})();
